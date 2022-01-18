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

// Syntax
import { Find, ForAll, IsGreaterOrEqual, Minus, Plus, Width } from "../modules/syntax.mjs";

// Utilities
import { expect_to_throw } from "./test-util.mjs";

describe("Syntax tests", () => {

    it("Arithmetic expression 1", () => {
        var exp = Plus("@0", Minus(5, "@1"));
        var v = exp.evaluate(10, 3);
        expect(v.getValue()).to.equal(12);
    })

    it("Quantifier expression 1", () => {
        var exp = ForAll("$x", IsGreaterOrEqual("$x", 10));
        var v = exp.evaluate([11, 12, 3, 14]);
        expect(v.getValue()).to.be.false;
    })
  
    it("Quantifier expression 2", () => {
        var exp = ForAll("$x", Find("li"),
            IsGreaterOrEqual(Width("$x"), 100));
        expect(exp).not.to.be.null;
    })

	it("Quantifier expression 3", () => {
		var elements = [11, 12, 3, 14];
        var exp = ForAll("$x", elements,
            IsGreaterOrEqual("$x", 10));
        var v = exp.evaluate("foo");
		expect(v.getValue()).to.be.false;
    })
})