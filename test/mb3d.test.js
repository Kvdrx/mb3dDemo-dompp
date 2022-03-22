/*
	A lineage library for DOM nodes
	MIT License
  
	Copyright (c) 2020-2021 Florent Dumoulin, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi
  
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
  
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
  
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Imports
 */
// Chai for assertions
import pkg_chai from "chai";
const { expect, timeout } = pkg_chai;

// JSDOM for DOM trees
import pkg_jsdom from "jsdom";
const { JSDOM } = pkg_jsdom;
import "jsdom-global";

// DataTree for tree management
import pkg_datatree from "data-tree";
const { dataTree } = pkg_datatree;

// Utilities
import { load_dom, load_file_in_puppeteer, terminate_puppeteer_browser } from "./test-util.mjs";

//  Get tree from witness
import {
	assertDomppCondition,
	getVerdict,
	evaluateDom,
	Addition,
	And,
    BackgroundColor,
    BooleanAnd,
	BooleanNot,
	BooleanOr,
    ClientOffsetTop,
    Color,
    ComposedFunction,
    ConstantFunction,
    Current,
    DimensionHeight,
    DimensionWidth,
    Display,
    Equals,
    Exists,
    ExistentialQuantifier,
    Find,
    FindBySelector,
    ForAll,
    GreaterOrEqual,
    GreaterThan,
    Height,
    IsEqualTo,
    IsGreaterOrEqual,
    IsGreaterThan,
    IsLessOrEqual,
    IsLessThan,
    LesserOrEqual,
    Not,
    NodeWrapper,
    Or,
    PageOffsetTop,
    Plus,
    RegisterBySelector,
    Serialization,
    TestCondition,
    UniversalQuantifier,
    Verdict,
    Width,
    Zindex
} from "../index.mjs";

// /////////// Extra imports for the reading of css files//////////////////////////////////
import * as fs from 'fs'
import * as path from 'path'
const __dirname = path.dirname(new URL(
    import.meta.url).pathname);
// /////////// End Extra ///////////////////

let mb3dPage;
mb3dPage = await load_file_in_puppeteer("./test/mb3d/index.html");
mb3dPage.setViewport({ width: 1920, height: 1080 })

describe.only("Checking for bugs on MB3D using DOM-PP", () => {

	const dom = fs.readFileSync('./test/mb3d/index.html', 'utf-8')
    const url = `file://${__dirname}/mb3d/index.html`
    const { window } = new JSDOM(dom, { resources: 'usable', url: url })
    const { document } = window

    function delay(time) {
    	return new Promise(function(resolve) {
    		setTimeout(resolve,time);
    	});
    }

    beforeEach(function() {
		mb3dPage.setViewport({ width: 1920, height: 1080 });
    });

	/*it("The text from .text-block should not be the same color as its background", async() => {

		let body = document.body;
		let f = ForAll(
			"$x",
			Find(".text-block"),
			Not(
				Equals(
					new ComposedFunction(new Color(), "$x"),
					new ComposedFunction(new BackgroundColor(), "$x")
				)
			)
		)


		let cond = new TestCondition(".text-block color != body backgroundColor", f);
		let tree = getVerdict(body, cond);
		expect(tree).to.equal(null);
	}); */

	it("The burger menu icon should not be the same color as its background after a scroll ", async() => {

		await mb3dPage.setViewport({ width: 768, height: 640 });

		await mb3dPage.evaluate(function() { window.scroll(0,300); });
		await delay(1000)

			let f = Exists(
				"$x",
				Find(".navbar-container"),
				Exists(
					"$y",
					Find(".w-icon-nav-menu"),
					Not(
						Equals(
							new ComposedFunction(new BackgroundColor(), "$x"),
							new ComposedFunction(new Color(), "$y")
						)
					)
				)
			)

			const func = new TestCondition(".navbar-container backgroundColor != w-icon-nav-menu color", f);
			await assertDomppCondition(func,mb3dPage,"body");
			//window.scroll(0,0);
	
	});

	it("The body width and scrollWidth should always be the same", async() => {

		await mb3dPage.setViewport({ width: 320, height: 640 })

			let body = document.querySelector(".body");
			let scrollwidth = body.scrollWidth;
			let f = Equals(
				Width("$x"),
			 	scrollwidth
			)

			const func = new TestCondition(".body width <= body scrollwidth", f);
			await assertDomppCondition(func,mb3dPage,"body");
			
				
	});

	it("The two versions of the logo in the navbar should not be visible at the same time", async() => {

		await mb3dPage.evaluate(function() { window.scroll(0,300); });
		await mb3dPage.evaluate(function() { window.scroll(0,0); });
		await delay(1000);
		
			let f = Exists(
				"$x",
				Find(".logo-img:first-child"),
				Exists(
					"$y",
					Find(".logo-img.scroll"),
					Not(
						And(
							Equals(
								new ComposedFunction(new Display(), "$x"),
								new ConstantFunction("block")
							),
							Equals(
								new ComposedFunction(new Display(), "$y"),
								new ConstantFunction("inline-block")
							)
						)
					)
				)
			)

			const func = new TestCondition("!(.logo-img display == block && .logo-img.scroll display == inline-block)", f);
			await assertDomppCondition(func,mb3dPage,"body");
	});

	it("Navigation logo should have a higher Zindex than the hero title", async() => {

		await mb3dPage.evaluate(function() { window.scroll(0,300); });
		await delay(500);

			let f = Exists(
				"$x",
				Find(".logo-img.scroll"),
				Exists(
					"$y",
					Find(".h2-hero"),
					IsGreaterOrEqual(
						new ComposedFunction(new Zindex(), "$x"),
						new ComposedFunction(new Zindex(), "$y")
					)
				)

			)

			const func = new TestCondition(".logo-img.scroll z-index > .h2-hero z-index", f);
			await assertDomppCondition(func,mb3dPage,"body");
			//window.scroll(0,0);
		});

	it("After using the arrow button to scroll to the next section, navbar should not be on top of the section", async() => {

		await mb3dPage.click(".hero-wrapper .fleche-container a");
		await delay(1200);

			//let navbar = document.querySelector(".section-courant");
			//let body = document.querySelector(".body");
			let f = Exists(
				"$x",
				Find(".navbar-container"),
				Exists(
					"$y",
					Find(".section-courant"),
					IsLessOrEqual(
						Plus(
							new ComposedFunction(new ClientOffsetTop(), "$x"),
							Height("$x")
						),
						new ComposedFunction(new ClientOffsetTop(), "$y")
					)
				)
			);

			const func = new TestCondition(".navbar-container clientOffsetTop + height <= .section-courant clientOffsetTop", f);
			await assertDomppCondition(func,mb3dPage,"body");
	});

	it("All navigation links should have the same top offset", async() => {

			let f = ForAll(
				"$x",
				Find(".nav-link"),
				ForAll(
					"$y",
					Find(".nav-link"),
					Equals(
						new ComposedFunction(new PageOffsetTop(), "$x"),
						new ComposedFunction(new PageOffsetTop(), "$y")
					)
				)
			);

			const func = new TestCondition("for all pairs (x,y) of .nav-link, x pageOffsetTop = y pageOffsetTop", f);
			await assertDomppCondition(func,mb3dPage,"body");
	});

	it("After scrolling, the navbar background should be white", async() => {

		await mb3dPage.evaluate(function() { window.scroll(0,300); });
		await delay(1000);

			
			let f = Exists(
				"$x",
				Find(".navbar-container"),
				Equals(
					new ComposedFunction(new BackgroundColor(), "$x"),
					new ConstantFunction("rgb(255, 255, 255)")
				)
			)

			const func = new TestCondition(".navbar-container background color = rgb(255, 255, 255)", f);
			await assertDomppCondition(func,mb3dPage,"body");
			window.scroll(0,0);
			
	});


	/*it("After scrolling, the navigation links should have the same width as before the scroll", async() => {

		await mb3dPage.evaluate(function() { window.scroll(0,0); });
		await delay(1000);

		var serElements = await mb3dPage.evaluate(function() {

			let body = document.querySelector(".body");
			let r = new dompp.RegisterBySelector(".navlink", new dompp.DimensionWidth());

			let elements = r.evaluate(body).getValue();
			return dompp.serializeArray(elements);
		});

		await mb3dPage.evaluate(function() { window.scroll(0,500); });
		await delay(1000);		

		var result = await mb3dPage.evaluate(function(serElements) {

			let body = document.querySelector(".body");
			let elements = dompp.deserializeArray(serElements);

			let f = dompp.ForAll(
				"$x",
				elements,
				dompp.Equals(
					dompp.Width("$x"),
					dompp.Width(dompp.Current("$x"))
				)
			)

			let cond = new dompp.TestCondition(".navlink width before scroll = .navlink current width after width", f);
			let result = cond.evaluate(body).getValue();
			window.scroll(0,0);
			return result;
		}, serElements);
		expect(result).to.equal(true);
	});*/

});