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
import {All, CompoundDesignator, Designator, Nothing} from "../index.mjs";

describe("Designator tests", () => {
  describe("All", () => {
    it("Static instance", () => {
      expect(All.instance).to.be.an.instanceof(All);
    });

    it("toString", () => {
      expect(All.instance.toString()).to.equal("All");
    });
  });

  describe("Nothing", () => {
    it("Static instance", () => {
      expect(Nothing.instance).to.be.an.instanceof(Nothing);
    });

    it("toString", () => {
      expect(Nothing.instance.toString()).to.equal("Nothing");
    });
  });

	describe("Compound designator", () => {
    it("Size 0", () => {
			var d = new CompoundDesignator();
      expect(d.head()).to.be.an.instanceof(Nothing);
      expect(d.tail()).to.be.null;
      expect(d.size()).to.equal(0);
    });

		it("Size 1", () => {
			var d = new CompoundDesignator(All.instance);
      expect(d.head()).to.be.an.instanceof(All);
      expect(d.tail()).to.be.null;
      expect(d.size()).to.equal(1);
    });

    it("Size 2", () => {
			var d = new CompoundDesignator(All.instance, All.instance);
      expect(d.head()).to.be.an.instanceof(All);
      expect(d.tail()).to.be.an.instanceof(All);
      expect(d.size()).to.equal(2);
    });
    
    it("Size 3", () => {
			var d = new CompoundDesignator(All.instance, All.instance, All.instance);
      expect(d.head()).to.be.an.instanceof(All);
      var tail = d.tail();
      expect(tail).to.be.an.instanceof(CompoundDesignator);
      expect(d.size()).to.equal(3);
      expect(tail.size()).to.equal(2);
    });
    
    it("Add atomic", () => {
      var d = new CompoundDesignator();
      d.add(All.instance);
      expect(d.head()).to.be.an.instanceof(All);
      expect(d.tail()).to.be.null;
      expect(d.size()).to.equal(1);
    });

    it("Add compound", () => {
      var d = new CompoundDesignator();
      var d2 = new CompoundDesignator(All.instance);
      d.add(d2);
      expect(d.head()).to.be.an.instanceof(All);
      expect(d.tail()).to.be.null;
      expect(d.size()).to.equal(1);
    });

    it("Two identical designators of length 1", () => {
      var d1 = new CompoundDesignator(All.instance);
      var d2 = new CompoundDesignator(All.instance);
      expect(d1.equals(d2));
      expect(d2.equals(d1));
    });

    it("Two identical designators of length 2", () => {
      var d1 = new CompoundDesignator(All.instance, Nothing.instance);
      var d2 = new CompoundDesignator(All.instance, Nothing.instance);
      expect(d1.equals(d2));
      expect(d2.equals(d1));
    });

    it("Two different designators of length 1", () => {
      var d1 = new CompoundDesignator(All.instance);
      var d2 = new CompoundDesignator(Nothing.instance);
      expect(d1.equals(d2)).to.be.false;
      expect(d2.equals(d1)).to.be.false;
    });

    it("Two different designators of length 2", () => {
      var d1 = new CompoundDesignator(All.instance, All.instance);
      var d2 = new CompoundDesignator(Nothing.instance, All.instance);
      expect(d1.equals(d2)).to.be.false;
      expect(d2.equals(d1)).to.be.false;
    });

    it("Two different designators of different length", () => {
      var d1 = new CompoundDesignator(All.instance, All.instance);
      var d2 = new CompoundDesignator(Nothing.instance);
      expect(d1.equals(d2)).to.be.false;
      expect(d2.equals(d1)).to.be.false;
    });
	});
});

// :wrap=soft:tabSize=2:indentWidth=2: