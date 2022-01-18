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
import {AtomicFunctionReturnValue, CompoundDesignator, Enumerate, EnumeratedValue, InputArgument, NthItem, ObjectNode, ReturnValue, Tracer} from "../index.mjs";

describe("Enumerate tests", () => {

    /**
     * Checks lineage for an enumeration of items.
     */
    it("First list item", () => {
        var f = new Enumerate();
        var list = ["a", "b", "c"];
        var v = f.evaluate(list);
        expect(v).to.be.an.instanceof(AtomicFunctionReturnValue);
        var out_list = v.getValue();
        var t = new Tracer();
        var root = t.getUnknownNode();
        var leaves = v.query(null, CompoundDesignator.create(new NthItem(0), ReturnValue.instance), root, t);
        expect(leaves.length).to.equal(1);
        expect(root.getChildren().length).to.equal(1);
        var ch = root.getChildren()[0];
        expect(ch.getChildren().length).to.equal(1);
        var ch2 = ch.getChildren()[0];
        expect(ch2).to.be.an.instanceof(ObjectNode);
        var ch_d = ch2.getDesignatedObject().getDesignator();
        expect(ch_d).to.be.an.instanceof(CompoundDesignator);
        expect(ch_d.elements.length).to.equal(2);
        expect(ch_d.head()).to.be.an.instanceof(InputArgument);
        var tail = ch_d.tail();
        expect(tail).to.be.an.instanceof(NthItem);
        expect(tail.getIndex()).to.equal(0);
    });

    /**
     * Checks lineage for an enumeration of items.
     */
    it("Second list item", () => {
        var f = new Enumerate();
        var list = ["a", "b", "c"];
        var v = f.evaluate(list);
        expect(v).to.be.an.instanceof(AtomicFunctionReturnValue);
        var out_list = v.getValue();
        var t = new Tracer();
        var root = t.getUnknownNode();
        var leaves = v.query(null, CompoundDesignator.create(new NthItem(1), ReturnValue.instance), root, t);
        expect(leaves.length).to.equal(1);
        expect(root.getChildren().length).to.equal(1);
        var ch = root.getChildren()[0];
        expect(ch.getChildren().length).to.equal(1);
        var ch2 = ch.getChildren()[0];
        expect(ch2).to.be.an.instanceof(ObjectNode);
        var ch_d = ch2.getDesignatedObject().getDesignator();
        expect(ch_d).to.be.an.instanceof(CompoundDesignator);
        expect(ch_d.elements.length).to.equal(2);
        expect(ch_d.head()).to.be.an.instanceof(InputArgument);
        var tail = ch_d.tail();
        expect(tail).to.be.an.instanceof(NthItem);
        expect(tail.getIndex()).to.equal(1);
    });
});

// :wrap=soft:tabSize=2:indentWidth=2: