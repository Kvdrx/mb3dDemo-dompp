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
import { CompoundDesignator } from "./designator.mjs";
import { AbstractFunction, InputArgument, ReturnValue } from "./function.mjs";
import { Value } from "./value.mjs";
//import { NaryConjunctiveVerdict, NaryDisjunctiveVerdict } from "./booleans.mjs"

/**
 * Function that performs a direct computation on its input arguments. This is
 * opposed to a {@link ComposedFunction} that calls other functions to produce
 * its return value.
 * @param arity The input arity of the function
 * @extends AbstractFunction
 */
class AtomicFunction extends AbstractFunction {
    constructor(arity) {
        super();

        /**
         * The input arity of the function
         */
        this.arity = arity;
    }

    evaluate() {
        var values = [];
        for (var i = 0; i < arguments.length; i++) {
            values[i] = Value.lift(arguments[i]);
        }
        return this.compute(...values);
    }

    /**
     * Computes the return value of the function from its input arguments.
     * @param arguments A variable number of {@link Values}, whose number
     * must match the input arity of the function.
     * @return The resulting {@link Value}
     */
    compute() {
        if (arguments.length !== this.arity) {
            throw "Invalid number of arguments";
        }
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i].getValue());
        }
        var o = this.getValue(...args);
        if (o instanceof Value) {
            return o;
        }
        return new AtomicFunctionReturnValue(this, o, ...arguments);
    }
    getValue() {
        // To be overridden by descendants
        return null;
    }

    set() {
        return this;
    }
}

/**
 * Value obtained as the output produced by an atomic function call(this).
 * @extends Value
 */
class AtomicFunctionReturnValue extends Value {
    /**
     * Creates a new value
     * @param arguments An output value followed by the function's input arguments
     */
    constructor() {
        super();

        /**
         * The function instance this value comes from
         */
        this.referenceFunction = arguments[0];

        /**
         * The output value produced by the function
         */
        this.outputValue = arguments[1];

        /**
         * The function's input arguments
         */
        this.inputValues = [];
        for (var i = 2; i < arguments.length; i++) {
            this.inputValues.push(arguments[i]);
        }
    }

    getValue() {
        return this.outputValue;
    }

    toString() {
        return this.outputValue.toString();
    }

    /* @Override */
    query(type, d, root, factory) {
        var leaves = [];
        var n = factory.getAndNode();
        for (var i = 0; i < this.inputValues.length; i++) {
            if (this.inputValues[i] === null) {
                continue;
            }
            var new_d = CompoundDesignator.create(d.tail(), new InputArgument(i));
            var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
            var sub_leaves = [];
            sub_leaves = this.inputValues[i].query(type, ReturnValue.instance, sub_root, factory);
            leaves.push(...sub_leaves);
            n.addChild(sub_root);
        }
        var f_root = factory.getObjectNode(d, this.referenceFunction);
        if (n.getChildren().length === 1) {
            f_root.addChild(n.getChildren()[0]);
        } else {
            f_root.addChild(n);
        }
        root.addChild(f_root);
        return leaves;
    }
}

/**
 * Function that returns its single input argument as is.
 * @extends AtomicFunction
 */
class Identity extends AtomicFunction {
    constructor() {
        super(1);
    }

    getValue() {
        return arguments[0];
    }
}

/**
 * Package exports
 */
export { AtomicFunction, AtomicFunctionReturnValue, Identity };