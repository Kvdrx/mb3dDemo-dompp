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
import {same_object} from "../modules/util.mjs";

/**
 * A dummy test object to be used in the tests of same_object.
 */
class TestObject1
{
    constructor(x)
    {
        this.x = x;
    }

    equals(o)
    {
        if (o.x == this.x)
        {
            return true;
        }
        return false;
    }
}

describe("Utility tests", () => {

    describe("same_object", () => {

        it("Two nulls", () => {
            var o1 = null;
            var o2 = null;
            expect(same_object(o1, o2)).to.be.true;
        });

        it("First null", () => {
            var o1 = null;
            var o2 = "foo";
            expect(same_object(o1, o2)).to.be.false;
        });

        it("Second null", () => {
            var o1 = "foo";
            var o2 = null;
            expect(same_object(o1, o2)).to.be.false;
        });

        it("Same strings", () => {
            var o1 = "foo";
            var o2 = "foo";
            expect(same_object(o1, o2)).to.be.true;
        });

        it("Different strings", () => {
            var o1 = "foo";
            var o2 = "bar";
            expect(same_object(o1, o2)).to.be.false;
        });

        it("Same numbers", () => {
            var o1 = 1;
            var o2 = 1.0;
            expect(same_object(o1, o2)).to.be.true;
        });

        it("Different numbers", () => {
            var o1 = 1;
            var o2 = 1.5;
            expect(same_object(o1, o2)).to.be.false;
        });

        it("Same objects implementing equals", () => {
            var o1 = new TestObject1(0);
            var o2 = new TestObject1(0);
            expect(same_object(o1, o2)).to.be.true;
        });

        it("Different objects implementing equals", () => {
            var o1 = new TestObject1(0);
            var o2 = new TestObject1(1);
            expect(same_object(o1, o2)).to.be.false;
        });

        it("First object implementing equals, not second", () => {
            var o1 = new TestObject1(0);
            var o2 = "foo";
            expect(same_object(o1, o2)).to.be.false;
        });

        it("Seccond object implementing equals, not first", () => {
            var o1 = "foo";
            var o2 = new TestObject1(0);
            expect(same_object(o1, o2)).to.be.false;
        });
    });
});

// :wrap=soft:tabSize=2:indentWidth=2: