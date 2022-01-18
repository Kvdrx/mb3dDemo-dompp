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

// Local imports
import { CompoundDesignator, Designator } from "./designator.mjs";

/**
 * Object produced by the call(this) to a function, and whose lineage
 * can be computed.
 */
class Value {
    /*
    constructor() {
    	// Nothing to do
    }
    */

    /**
     * Gets the concrete value carried by this Value object.
     * @return The value
     */
    getValue() {
        // To be overridden by descendants
        return null;
    }

    /**
     * Queries the provenance of a value.
     * @param type The type of lineage relationship
     * @param d A designator representing the part of the object that is the
     * subject of the query
     * @param root The node to which the rsults of the query should be appended
     * as children
     * @param A factory to produce traceability nodes
     * @return The list of terminal traceability nodes produced by this query
     */
    query(type, d, root, factory) {
        // To be overridden by descendants
    }

    // d is a deserializer and j is a JSON structure
    static deserialize(d, j) {
        const params = [];

        for (const serializedParam of j.contents) {

            if(typeof serializedParam == "object" && Object.keys(serializedParam).length == 2 
            && typeof serializedParam.name != "undefined" && typeof serializedParam.contents != "undefined") {
                params.push(d.deserialize(serializedParam));
            } 
            else if(Array.isArray(serializedParam)) {
                for(var i = 0; i<serializedParam.length; i++) {
                    if(typeof serializedParam[i] == "object" && Object.keys(serializedParam[i]).length == 2 
                    && typeof serializedParam[i].name != "undefined" && typeof serializedParam[i].contents != "undefined")
                        serializedParam[i] = d.deserialize(serializedParam[i]);
                }
                params.push(serializedParam);
            } 
            else {
                params.push(serializedParam);
            }
        }

        return new this(...params);
    }

    toJson() {
        const serializedMembers = [];

        for (var member of this.members) {
            if(typeof member == "object" && Value.isPrototypeOf(member.constructor)) {
                serializedMembers.push(member.toJson());
            } 
            else if(Array.isArray(member)) {
                for(var i = 0; i<member.length; i++) {
                    if(typeof member[i] == "object" && Value.isPrototypeOf(member[i].constructor))
                        member[i] = member[i].toJson();
                }
                serializedMembers.push(member);
            } 
            else {
                serializedMembers.push(member);
            }
        }

        return {
            "name": this.constructor.name,
            "contents": serializedMembers
        }
    }

    /**
     * Converts an arbitrary object into a {@link Value}.
     * @param o The object to convert. If o is a {@link Value}, it is returned as
     * is. Otherwise, o is converted into a {@link ConstantValue} that returns o.
     * @return The converted value
     */
    static lift(o) {
        if (o instanceof Value) {
            return o;
        }
        return new ConstantValue(o);
    }
}

/**
 * Value that is linked to a list of other values. This class is the
 * ancestor used for values produced by most n-ary atomic functions.
 * @extends Value
 */
class NaryValue extends Value {
    /**
     * Creates a new instance of this value.
     * @param {Object} value The value to produce
     * @param {Array} values An array of {@link Value}s that are linked to
     * this value
     * @param {Array} positions An array of integers with the position of
     * each input value in the function's arguments
     */
    constructor(value, values = [], positions = []) {
        super();
        this.value = value;
        this.values = values;
        this.positions = positions;
    }

    getValue() {
        return this.value;
    }
}

/**
 * Special type of value that always returns the same constant.
 * @param o The constant to return
 * @extends Value
 */
class ConstantValue extends Value {
    constructor(o) {
        super();

        /**
         * The value represented by this constant
         */
        this.value = o;
        this.members = [o];
    }

    query(q, d, root, factory) {
        var leaves = [];
        var new_d = CompoundDesignator.create(d, new ConstantDesignator());
        var n = factory.getObjectNode(new_d, this.value);
        root.addChild(n);
        leaves.push(n);
        return leaves;
    }

    getValue() {
        return this.value;
    }

    toString() {
        return this.value.toString();
    }

    equals(o) {
        if (o == null || !(o instanceof Value)) {
            return false;
        }
        return o.getValue() === this.value;
    }
}
/**
 * Atomic designator that points to the value of a constant.
 * @extends Designator
 */
class ConstantDesignator extends Designator {
    /*
    constructor() {
    	super();
    }
    */

    toString() {
        return "Value";
    }
}

/**
 * Package exports
 */
export { ConstantDesignator, ConstantValue, NaryValue, Value };