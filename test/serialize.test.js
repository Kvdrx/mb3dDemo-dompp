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

// Local imports
import { ComposedFunctionValue, EnumeratedValue } from "../index.mjs";
import { Serialization } from "../index.mjs";


describe("Test Serialization", () => {
    const sampleserizalisation = new Serialization();
    const expectedJsonExample = {
        "name": "UniversalQuantifier",
        "contents": [
            "$x",
            {
                "name": "FindBySelector",
                "contents": [
                    "#h2"
                ]
            },
            {
                "name": "ComposedFunction",
                "contents": [
                    {
                        "name": "GreaterThan",
                        "contents": []
                    },
                    {
                        "name": "ComposedFunction",
                        "contents": [
                            {
                                "name": "Opacity",
                                "contents": []
                            },
                            "$x"
                        ]
                    },
                    {
                        "name": "ConstantFunction",
                        "contents": [0.9]
                    }
                ]
            }
        ]
    };
    let deserialized;

    it("should be return true when input json is object", function () {
        expect(expectedJsonExample).to.be.an("object")
    });

    it("should deserialize and serialize an object json ", function () {
        deserialized = sampleserizalisation.deserialize(expectedJsonExample)
        const serialized = sampleserizalisation.serialize(deserialized)
        expect(serialized).to.be.deep.equal(expectedJsonExample)
    });

    it("Test GreaterThan from json structure", function () {
        var j = {
            "name": "GreaterThan",
            "contents": []
        }
        deserialized = sampleserizalisation.deserialize(j);
        var gt = deserialized.evaluate(4, 3)
        expect(gt.getValue()).to.be.true;
    });

    it("Test FindbySelector from json structure", async () => {
        var j = {
            "name": "FindBySelector",
            "contents": [
                "#h2"
            ]
        }
        var dom = await load_dom("./test/pages/stub-1.html");
        var body = dom.window.document.body;
        deserialized = sampleserizalisation.deserialize(j);
        var v = deserialized.evaluate(body);
        var elems = v.getValue();
        
        expect(Array.isArray(elems)).to.be.true;
        expect(elems.length).to.equal(1);
        var e1 = elems[0];
        expect(e1).to.be.an.instanceof(EnumeratedValue);
        var v1 = e1.getValue();
        expect(v1.tagName).to.equal("H2");
    });

    it("Test Composed Function from json structure", function () {
        var j = {
            "name": "ComposedFunction",
            "contents": [{
                "name": "Addition",
                "contents": []
            },
                4,
                1
            ]
        }
        var deserialized = sampleserizalisation.deserialize(j);
        expect(deserialized.getArity()).to.equal(0);
        var r = deserialized.evaluate();
        expect(r).to.be.an.instanceof(ComposedFunctionValue);
        var v = r.getValue();
        expect(v).to.equal(5);
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
// :wrap=soft:tabSize=2:indentWidth=2: