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
import { InputArgument } from "../index.mjs";
const { expect } = pkg_chai;

// Local imports
import {
    AndNode,
    ComposedFunction,
    CompoundDesignator,
    ConstantDesignator,
    ExistentialQuantifier,
    Enumerate,
    Identity,
    NthItem,
    ObjectNode,
    QuantifierConjunctiveVerdict,
    QuantifierDisjunctiveVerdict,
    UniversalQuantifier,
    ReturnValue,
    Tracer,
} from "../index.mjs";

describe("Quantifier tests", () => {
    describe("Universal quantifier", () => {
        it("True evaluation", () => {
            var q = new UniversalQuantifier(
                "$x",
                new Enumerate(),
                new ComposedFunction(new Identity(), "$x")
            );
            var v = q.evaluate([true, true, true]);
            expect(v).to.be.an.instanceof(QuantifierConjunctiveVerdict);
            expect(v.getValue()).to.be.true;
            var t = new Tracer();
            var root = t.getUnknownNode();
            var leaves = v.query(null, ReturnValue.instance, root, t);
            expect(leaves.length).to.equal(3);
            expect(leaves[0].getChildren().length).to.equal(0);
            expect(leaves[1].getChildren().length).to.equal(0);
            expect(leaves[2].getChildren().length).to.equal(0);
            expect(root.getChildren().length).to.equal(1);
            var under = root.getChildren()[0].getChildren()[0];
            expect(under).to.be.an.instanceof(AndNode);
            expect(under.getChildren().length).to.equal(3);
            var leaf1 = leaves[0];
            expect(leaf1).to.be.an.instanceof(ObjectNode);
            var leaf1_d = leaf1.getDesignatedObject().getDesignator();
            expect(leaf1_d).to.be.an.instanceof(CompoundDesignator);
            expect(leaf1_d.tail()).to.be.an.instanceof(NthItem);
            expect(leaf1_d.head()).to.be.an.instanceof(ConstantDesignator);
        });
    });
});