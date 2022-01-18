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

// Local imports
import {
    Addition,
    Division,
    GreaterThan,
    GreaterOrEqual,
    LesserThan,
    LesserOrEqual,
    Multiplication,
    Subtraction
} from "../index.mjs";
import { expect_to_throw } from "./test-util.mjs";

/**
 * Tests for arithmetic functions. Since none of these functions override
 * AtomicFunction#evaluate(), there is no need to check lineage. Only the
 * return values are necessary (barring a few exceptions which are listed
 * below).
 */
describe("Arithmetic function tests", () => {
    describe("Greater than", () => {
        it("First greater", () => {
            var f = new GreaterThan();
            var v = f.evaluate(3, 2);
            expect(v.getValue()).to.be.true;
        });

        it("Second greater", () => {
            var f = new GreaterThan();
            var v = f.evaluate(2, 3);
            expect(v.getValue()).to.be.false;
        });

        it("Both equal", () => {
            var f = new GreaterThan();
            var v = f.evaluate(3, 3);
            expect(v.getValue()).to.be.false;
        });

        it("Not a number", () => {
            var f = new GreaterThan();
            expect(expect_to_throw(f, "evaluate", 3)).to.be.true;
        });
    });
    describe("Lesser than", () => {
        it("First Lesser", () => {
            var f = new LesserThan();
            var v = f.evaluate(2, 3);
            expect(v.getValue()).to.be.true;
        });

        it("Second Lesser", () => {
            var f = new LesserThan();
            var v = f.evaluate(3, 2);
            expect(v.getValue()).to.be.false;
        });

        it("Both equal", () => {
            var f = new LesserThan();
            var v = f.evaluate(3, 3);
            expect(v.getValue()).to.be.false;
        });

        it("Not a number", () => {
            var f = new GreaterThan();
            expect(expect_to_throw(f, "evaluate", 3)).to.be.true;
        });
    });

    describe("Greater or equal", () => {
        it("First greater", () => {
            var f = new GreaterOrEqual();
            var v = f.evaluate(3, 2);
            expect(v.getValue()).to.be.true;
        });

        it("Second greater", () => {
            var f = new GreaterOrEqual();
            var v = f.evaluate(2, 3);
            expect(v.getValue()).to.be.false;
        });

        it("Both equal", () => {
            var f = new GreaterOrEqual();
            var v = f.evaluate(3, 3);
            expect(v.getValue()).to.be.true;
        });

        it("Not a number", () => {
            var f = new GreaterThan();
            expect(expect_to_throw(f, "evaluate", 3, "foo")).to.be.true;
        });
    });
    describe("Lesser or equal", () => {
        it("First Lesser", () => {
            var f = new LesserOrEqual();
            var v = f.evaluate(2, 3);
            expect(v.getValue()).to.be.true;
        });

        it("Second Lesser", () => {
            var f = new LesserOrEqual();
            var v = f.evaluate(3, 2);
            expect(v.getValue()).to.be.false;
        });

        it("Both equal", () => {
            var f = new LesserOrEqual();
            var v = f.evaluate(3, 3);
            expect(v.getValue()).to.be.true;
        });

        it("Not a number", () => {
            var f = new GreaterThan();
            expect(expect_to_throw(f, "evaluate", 3, "foo")).to.be.true;
        });
    });
    describe("Adding numbers", () => {
        it("Addition", () => {
            var f = new Addition();
            var v = f.evaluate(3, 3);
            expect(v.getValue()).to.be.equal(6);
        });
    });
    describe("Subtracting numbers", () => {
        it("Subtraction", () => {
            var f = new Subtraction();
            var v = f.evaluate(2, 0, 1);
            expect(v.getValue()).to.be.equal(1);
        });
    });
    describe("Multiplying numbers", () => {
        it("Multiplication", () => {
            var f = new Multiplication();
            var v = f.evaluate(1, 0);
            expect(v).to.be.equal(0);
        });
    });
    describe("Dividing numbers", () => {
        it("Division", () => {
            var f = new Division();
            var v = f.evaluate(60, 12);
            expect(v.getValue()).to.be.equal(5);
        });
    });
});

// :wrap=soft:tabSize=2:indentWidth=2: