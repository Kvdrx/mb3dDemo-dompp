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

import {expect_to_throw} from "./test-util.mjs";

// Local imports
import {Addition, All, AndNode, AtomicFunction, AtomicFunctionReturnValue,
  CompoundDesignator, InputArgument, Nothing, ObjectNode, OrNode, ReturnValue,
  Tracer, UnknownNode, Value} from "../index.mjs";


/**
 * A "dummy" function used to test traceability of all functions that do not
 * override {@link AtomicFunction}'s compute() method. This avoids the tedious
 * testing of traceability for each such function individually.
 */
class DummyAtomicFunction extends AtomicFunction
{
  constructor(arity)
  {
    super(arity);
  }

  get()
  {
    return 0;
  }
}

describe("Function tests", () => {

	describe("Atomic function", () => {
    it("Too few arguments", () => {
        var f = new AtomicFunction(2);
        expect(expect_to_throw(f, "evaluate", 0)).to.be.true;
    });

    it("Too many arguments", () => {
        var f = new AtomicFunction(2);
        expect(expect_to_throw(f, "evaluate", 0, 0, 0)).to.be.true;
    });

    it("Enough arguments", () => {
      var f = new AtomicFunction(2);
      var v = f.evaluate(0, 0);
      expect(v).not.to.be.null;
      expect(v).to.be.an.instanceof(Value);
    });

    /**
     * Tests lineage for a generic atomic function of one argument. Querying
     * for the lineage of the function's return value should produce a tree
     * of the following form:
     * <pre>
     * ReturnValue
     *  |
     *  +-- Input argument 1
     * </pre>
     */
    it("Lineage arity 1", () => {
      var f = new DummyAtomicFunction(1);
      var v = f.evaluate(1);
      var t = new Tracer();
      var root = t.getUnknownNode();
      var leaves = v.query(null, ReturnValue.instance, root, t);
      expect(leaves.length).to.equal(1);
      expect(root.getChildren().length).to.equal(1);
      var under = root.getChildren()[0];
      expect(under).to.be.an.instanceof(ObjectNode);
      var do0 = under.getDesignatedObject();
      expect(do0.getObject()).to.equal(f);
      expect(do0.getDesignator()).to.be.an.instanceof(ReturnValue);
      expect(under.getChildren().length).to.equal(1);
      var n1 = under.getChildren()[0];
      expect(n1).to.be.an.instanceof(ObjectNode);
      var do1 = n1.getDesignatedObject();
      expect(do1.getDesignator()).to.be.an.instanceof(InputArgument);
    });

    /**
     * Tests lineage for a generic atomic function of two arguments. Querying
     * for the lineage of the function's return value should produce a tree
     * of the following form:
     * <pre>
     * ReturnValue
     *  |
     *  +-- And
     *       |
     *       +-- Input argument 1
     * *     +-- Input argument 2
     * </pre>
     */
    it("Lineage arity 2", () => {
      var f = new DummyAtomicFunction(2);
      var v = f.evaluate(1, 2);
      var t = new Tracer();
      var root = t.getUnknownNode();
      var leaves = v.query(null, ReturnValue.instance, root, t);
      expect(leaves.length).to.equal(2);
      expect(root.getChildren().length).to.equal(1);
      var under = root.getChildren()[0];
      expect(under).to.be.an.instanceof(ObjectNode);
      var do0 = under.getDesignatedObject();
      expect(do0.getObject()).to.equal(f);
      expect(do0.getDesignator()).to.be.an.instanceof(ReturnValue);
      expect(under.getChildren().length).to.equal(1);
      var under2 = under.getChildren()[0];
      expect(under2).to.be.an.instanceof(AndNode);
      expect(under2.getChildren().length).to.equal(2);
      var n1 = under2.getChildren()[0];
      expect(n1).to.be.an.instanceof(ObjectNode);
      var do1 = n1.getDesignatedObject();
      expect(do1.getDesignator()).to.be.an.instanceof(InputArgument);
      var n2 = under2.getChildren()[0];
      expect(n2).to.be.an.instanceof(ObjectNode);
      var do2 = n1.getDesignatedObject();
      expect(do2.getDesignator()).to.be.an.instanceof(InputArgument);
    });

  });

  describe("Input argument", () => {

    it("Equal designators", () => {
        var d1 = new InputArgument(2);
        var d2 = new InputArgument(2);
        expect(d1.equals(d2)).to.be.true;
        expect(d2.equals(d1)).to.be.true;
    });

    it("Different designators", () => {
      var d1 = new InputArgument(2);
      var d2 = new InputArgument(3);
      expect(d1.equals(d2)).to.be.false;
      expect(d2.equals(d1)).to.be.false;
    });
  });

  describe("Return value", () => {

    it("Equal designators", () => {
        var d1 = new ReturnValue();
        var d2 = new ReturnValue();
        expect(d1.equals(d2)).to.be.true;
        expect(d2.equals(d1)).to.be.true;
    });
  });

  describe("Addition", () => {
    it("With numbers", () => {
        var f = new Addition(2);
        var v = f.evaluate(1, 2);
        expect(v).to.be.an.instanceof(AtomicFunctionReturnValue);
        var o = v.getValue();
        expect(o).to.equal(3);
    });

    it("With non-numbers", () => {
      var f = new Addition(2);
      expect(expect_to_throw(f, "evaluate", 1, "foo")).to.be.true;
    });

  });
});

// :wrap=soft:tabSize=2:indentWidth=2: