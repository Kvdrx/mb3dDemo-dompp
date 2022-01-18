/*
	A lineage library for DOM nodes
	MIT License
  
	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
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
const { expect } = pkg_chai;

// JSDOM for DOM trees
import pkg_jsdom from "jsdom";
const { JSDOM } = pkg_jsdom;
import "jsdom-global";

// DataTree for tree management
import pkg_datatree from "data-tree";
const { dataTree } = pkg_datatree;

// Local imports
import { evaluateDom, getVerdict } from "../index.mjs";

//  Get tree from witness
import {
    BackgroundColor,
    ComposedFunction,
    ConstantFunction,
    DimensionWidth,
    FindBySelector,
    IsEqualTo,
    GreaterThan,
    TestCondition,
    UniversalQuantifier,
} from "../index.mjs";

describe("Stub tests", () => {
    it("True condition on a page element", async() => {
        var dom = await load_dom("./test/pages/stub-1.html");
        var body = dom.window.document.body;
        var f = new UniversalQuantifier(
            "$x",
            new FindBySelector("#h2"),
            new ComposedFunction(
                new IsEqualTo(),
                new ComposedFunction(new BackgroundColor(), "$x"),
                new ConstantFunction("yellow")
            )
        );        var cond = new TestCondition("h2's width > 50", f);
        let tree = getVerdict(body, cond);
        expect(tree).to.equal(null);
    });
    it("False condition on a page element", async() => {
        var dom = await load_dom("./test/pages/stub-1.html");
        var body = dom.window.document.body;
        var f = new UniversalQuantifier(
            "$x",
            new FindBySelector("#h2"),
            new ComposedFunction(
                new IsEqualTo(),
                new ComposedFunction(new BackgroundColor(), "$x"),
                new ConstantFunction("red")
            )
        );
        var cond = new TestCondition("h2's width > 350", f);
        let tree = getVerdict(body, cond);
        expect(tree).to.not.equal(null);
    });
});

/**
 * Reads a DOM from a file. This function is only meant to avoid cluttering
 * the code with promises and anonymous functions in every test case.
 * @param {String} filename The name of the local file to read from
 * @param A promise which, when fulfilled, returns the DOM object.
 */
async function load_dom(filename) {
    return JSDOM.fromFile(filename).then((dom) => {
        return dom;
    });
}

// :wrap=soft:tabSize=2: