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
import {All, AndNode, AtomicFunction, CompoundDesignator, DesignatedObject,
    Nothing, ObjectNode, OrNode, Tracer, UnknownNode, Value} from "../index.mjs";

describe("Tracer tests", () => {

	describe("Nodes", () => {
        it("Get And node", () => {
            var tracer = new Tracer();
            var node1 = tracer.getAndNode();
            expect(node1).to.be.an.instanceof(AndNode);
            var node2 = tracer.getAndNode();
            expect(node2).to.be.an.instanceof(AndNode);
            expect(node1.getId()).not.to.equal(node2.getId());
        });

        it("Get Or node", () => {
            var tracer = new Tracer();
            var node1 = tracer.getOrNode();
            expect(node1).to.be.an.instanceof(OrNode);
            var node2 = tracer.getOrNode();
            expect(node2).to.be.an.instanceof(OrNode);
            expect(node1.getId()).not.to.equal(node2.getId());
        });

        it("Get Unknown node", () => {
            var tracer = new Tracer();
            var node1 = tracer.getUnknownNode();
            expect(node1).to.be.an.instanceof(UnknownNode);
            var node2 = tracer.getUnknownNode();
            expect(node2).to.be.an.instanceof(UnknownNode);
            expect(node1.getId()).not.to.equal(node2.getId());
        });

        it("Get same object node twice", () => {
            var tracer = new Tracer();
            var dob = new DesignatedObject(All.instance, Value.lift(0));
            var node1 = tracer.getObjectNode(dob);
            expect(node1).to.be.an.instanceof(ObjectNode);
            var node2 = tracer.getObjectNode(dob);
            expect(node2).to.be.an.instanceof(ObjectNode);
            expect(node1.getId()).to.equal(node2.getId());
        });

        it("Get object nodes that differ on designator", () => {
            var tracer = new Tracer();
            var dob1 = new DesignatedObject(All.instance, Value.lift(0));
            var node1 = tracer.getObjectNode(dob1);
            expect(node1).to.be.an.instanceof(ObjectNode);
            var dob2 = new DesignatedObject(Nothing.instance, Value.lift(0));
            var node2 = tracer.getObjectNode(dob2);
            expect(node2).to.be.an.instanceof(ObjectNode);
            expect(node1.getId()).not.to.equal(node2.getId());
        });

        it("Get object nodes that differ on object", () => {
            var tracer = new Tracer();
            var dob1 = new DesignatedObject(All.instance, Value.lift(0));
            var node1 = tracer.getObjectNode(dob1);
            expect(node1).to.be.an.instanceof(ObjectNode);
            var dob2 = new DesignatedObject(All.instance, Value.lift(1));
            var node2 = tracer.getObjectNode(dob2);
            expect(node2).to.be.an.instanceof(ObjectNode);
            expect(node1.getId()).not.to.equal(node2.getId());
        });

        it("Add children", () => {
            var tracer = new Tracer();
            var and = tracer.getAndNode();
            expect(and.getChildren().length).to.equal(0);
            var dob1 = new DesignatedObject(All.instance, Value.lift(0));
            var node1 = tracer.getObjectNode(dob1);
            and.addChild(node1);
            expect(and.getChildren().length).to.equal(1);
            and.addChild(node1);
            expect(and.getChildren().length).to.equal(2);
        });
    });
});


// :wrap=soft:tabSize=2:indentWidth=2: