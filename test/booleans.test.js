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

// Utilities
import { expect_to_throw } from "./test-util.mjs";

// Local imports
import { AndNode, BooleanAnd, BooleanNot, BooleanOr, InputArgument, NaryConjunctiveVerdict, NaryDisjunctiveVerdict, ObjectNode, OrNode, ReturnValue, Tracer } from "../index.mjs";

describe("Boolean tests", () => {

    describe("Conjunction", () => {

        // Not a crucial test, but ensures coverage of these lines of code
        it("toString", () => {
            var op = new BooleanAnd();
            expect(op.toString()).to.equal("And");
        });

        it("Non-Boolean argument", () => {
            var op = new BooleanAnd();
            expect(expect_to_throw(op, "evaluate", "foo", false)).to.be.true;
        });

        /**
         * Tests lineage for conjunction with two false arguments. Querying
         * for the lineage of the function's return value should produce a tree
         * of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Or
         *       |
         *       +-- Input argument 1
         *       +-- Input argument 2
         * </pre>
         */
        it("Two false arguments", () => {
            var op = new BooleanAnd();
            var v = op.evaluate(false, false);
            expect(v).to.be.an.instanceof(NaryDisjunctiveVerdict);
            expect(v.getValue()).to.be.false;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var or = children1[0];
            expect(or).to.be.an.instanceof(OrNode);
            var children2 = or.getChildren();
            expect(children2.length).to.equal(2);
            var ch1 = children2[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
            var ch2 = children2[1];
            expect(ch2).to.be.an.instanceof(ObjectNode);
            var d2 = ch2.getDesignatedObject().getDesignator();
            expect(d2).to.be.an.instanceof(InputArgument);
            expect(d2.getIndex()).to.equal(1);
        });

        /**
         * Tests lineage for conjunction with the first argument being true,
         * with a single argument. Querying for the lineage of the function's
         * return value should produce a tree of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Input argument 1
         * </pre>
         */
        it("First true argument (arity 1)", () => {
            var op = new BooleanAnd(1);
            var v = op.evaluate(true);
            expect(v).to.be.an.instanceof(NaryConjunctiveVerdict);
            expect(v.getValue()).to.be.true;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var ch1 = children1[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
        });

        /**
         * Tests lineage for conjunction with the first argument being false.
         * Querying for the lineage of the function's return value should produce
         * a tree of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Input argument 1
         * </pre>
         */
        it("First false argument", () => {
            var op = new BooleanAnd();
            var v = op.evaluate(false, true);
            expect(v).to.be.an.instanceof(NaryDisjunctiveVerdict);
            expect(v.getValue()).to.be.false;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var ch1 = children1[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
        });

        /**
         * Tests lineage for conjunction with the second argument being false.
         * Querying for the lineage of the function's return value should produce
         * a tree of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Input argument 2
         * </pre>
         */
        it("Second false argument", () => {
            var op = new BooleanAnd();
            var v = op.evaluate(true, false);
            expect(v).to.be.an.instanceof(NaryDisjunctiveVerdict);
            expect(v.getValue()).to.be.false;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var ch1 = children1[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(1);
        });

        /**
         * Tests lineage for conjunction with two false arguments. Querying
         * for the lineage of the function's return value should produce a tree
         * of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- And
         *       |
         *       +-- Input argument 1
         *       +-- Input argument 2
         * </pre>
         */
        it("Two true arguments", () => {
            var op = new BooleanAnd();
            var v = op.evaluate(true, true);
            expect(v).to.be.an.instanceof(NaryConjunctiveVerdict);
            expect(v.getValue()).to.be.true;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var or = children1[0];
            expect(or).to.be.an.instanceof(AndNode);
            var children2 = or.getChildren();
            expect(children2.length).to.equal(2);
            var ch1 = children2[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
            var ch2 = children2[1];
            expect(ch2).to.be.an.instanceof(ObjectNode);
            var d2 = ch2.getDesignatedObject().getDesignator();
            expect(d2).to.be.an.instanceof(InputArgument);
            expect(d2.getIndex()).to.equal(1);
        });

    });

    describe("Disjunction", () => {

        // Not a crucial test, but ensures coverage of these lines of code
        it("toString", () => {
            var op = new BooleanOr();
            expect(op.toString()).to.equal("Or");
        });

        it("Non-Boolean argument", () => {
            var op = new BooleanOr();
            expect(expect_to_throw(op, "evaluate", "foo", false)).to.be.true;
        });

        /**
         * Tests lineage for disjunction with two false arguments. Querying
         * for the lineage of the function's return value should produce a tree
         * of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- And
         *       |
         *       +-- Input argument 1
         *       +-- Input argument 2
         * </pre>
         */
        it("Two false arguments", () => {
            var op = new BooleanOr();
            var v = op.evaluate(false, false);
            expect(v).to.be.an.instanceof(NaryConjunctiveVerdict);
            expect(v.getValue()).to.be.false;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var or = children1[0];
            expect(or).to.be.an.instanceof(AndNode);
            var children2 = or.getChildren();
            expect(children2.length).to.equal(2);
            var ch1 = children2[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
            var ch2 = children2[1];
            expect(ch2).to.be.an.instanceof(ObjectNode);
            var d2 = ch2.getDesignatedObject().getDesignator();
            expect(d2).to.be.an.instanceof(InputArgument);
            expect(d2.getIndex()).to.equal(1);
        });

        /**
         * Tests lineage for disjunction with the first argument being false,
         * with a single argument. Querying for the lineage of the function's
         * return value should produce a tree of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Input argument 1
         * </pre>
         */
        it("First false argument (arity 1)", () => {
            var op = new BooleanOr(1);
            var v = op.evaluate(false);
            expect(v).to.be.an.instanceof(NaryConjunctiveVerdict);
            expect(v.getValue()).to.be.false;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var ch1 = children1[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
        });

        /**
         * Tests lineage for disjunction with the first argument being true.
         * Querying for the lineage of the function's return value should produce
         * a tree of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Input argument 1
         * </pre>
         */
        it("First true argument", () => {
            var op = new BooleanOr();
            var v = op.evaluate(true, false);
            expect(v).to.be.an.instanceof(NaryDisjunctiveVerdict);
            expect(v.getValue()).to.be.true;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var ch1 = children1[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
        });

        /**
         * Tests lineage for disjunction with the second argument being true.
         * Querying for the lineage of the function's return value should produce
         * a tree of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- Input argument 2
         * </pre>
         */
        it("Second true argument", () => {
            var op = new BooleanOr();
            var v = op.evaluate(false, true);
            expect(v).to.be.an.instanceof(NaryDisjunctiveVerdict);
            expect(v.getValue()).to.be.true;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var ch1 = children1[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(1);
        });

        /**
         * Tests lineage for disjunction with two false arguments. Querying
         * for the lineage of the function's return value should produce a tree
         * of the following form:
         * <pre>
         * ReturnValue
         *  |
         *  +-- And
         *       |
         *       +-- Input argument 1
         *       +-- Input argument 2
         * </pre>
         */
        it("Two true arguments", () => {
            var op = new BooleanOr();
            var v = op.evaluate(true, true);
            expect(v).to.be.an.instanceof(NaryDisjunctiveVerdict);
            expect(v.getValue()).to.be.true;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            var children1 = root.getChildren();
            expect(children1.length).to.equal(1);
            var or = children1[0];
            expect(or).to.be.an.instanceof(OrNode);
            var children2 = or.getChildren();
            expect(children2.length).to.equal(2);
            var ch1 = children2[0];
            expect(ch1).to.be.an.instanceof(ObjectNode);
            var d1 = ch1.getDesignatedObject().getDesignator();
            expect(d1).to.be.an.instanceof(InputArgument);
            expect(d1.getIndex()).to.equal(0);
            var ch2 = children2[1];
            expect(ch2).to.be.an.instanceof(ObjectNode);
            var d2 = ch2.getDesignatedObject().getDesignator();
            expect(d2).to.be.an.instanceof(InputArgument);
            expect(d2.getIndex()).to.equal(1);
        });

    });

    describe("Negation", () => {

        // Not a crucial test, but ensures coverage of these lines of code
        it("toString", () => {
            var op = new BooleanNot();
            expect(op.toString()).to.equal("Not");
        });

        it("Non-Boolean argument", () => {
            var op = new BooleanNot();
            expect(expect_to_throw(op, "evaluate", "foo")).to.be.true;
        });

        // No need to check lineage, as it does not override AtomicFunction#query
        it("One true argument", () => {
            var op = new BooleanNot();
            var v = op.evaluate(true);
            expect(v.getValue()).to.equal(false);
        });

        // No need to check lineage, as it does not override AtomicFunction#query
        it("One false argument", () => {
            var op = new BooleanNot();
            var v = op.evaluate(false);
            expect(v.getValue()).to.equal(true);
        });
    });
});

// :wrap=soft:tabSize=2:indentWidth=2: