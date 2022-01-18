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
import { InputArgument, ReturnValue } from "./function.mjs";
import { AtomicFunction } from "./atomic-function.mjs";
import { NaryValue } from "./value.mjs";
import { CompoundDesignator } from "./designator.mjs";

/**
 * Abstract class representing the binary Boolean connectives "and" and "or".
 * @extends AtomicFunction
 */
class BooleanConnective extends AtomicFunction {
    constructor() {
        super("arity");
    }

    compute() {
        var false_values = [];
        var false_positions = [];
        var true_values = [];
        var true_positions = [];
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i].getValue();
            if (typeof(o) !== "boolean") {
                throw "BooleanConnective: Invalid argument type";
            }
            if (o === true) {
                true_values.push(arguments[i]);
                true_positions.push(i);
            } else {
                false_values.push(arguments[i]);
                false_positions.push(i);
            }
        }
        return this.getBooleanValue(false_values, true_values, false_positions, true_positions);
    }
}

/**
 * An {@link NaryValue} that is linked to its input values through an "or"
 * node.
 * @extends NaryValue
 */
class NaryDisjunctiveVerdict extends NaryValue {
    query(q, d, root, factory) {
        var leaves = [];
        var n = factory.getOrNode();
        for (var i = 0; i < this.values.length; i++) {
            var new_d = CompoundDesignator.create(d.tail(), new InputArgument(this.positions[i]));
            var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
            var sub_leaves = [];
            sub_leaves = this.values[i].query(q, ReturnValue.instance, sub_root, factory);
            leaves.push(...sub_leaves);
            n.addChild(sub_root);
        }
        if (n.getChildren().length === 1) {
            root.addChild(n.getChildren()[0]);
        } else {
            root.addChild(n);
        }
        return leaves;
    }
}

/**
 * An {@link NaryValue} that is linked to its input values through an "and"
 * node.
 * @extends NaryValue
 */
class NaryConjunctiveVerdict extends NaryValue {
    constructor(value, values = [], positions = []) {
        super(value, values, positions);
    }

    query(q, d, root, factory) {
        var leaves = [];
        var n = factory.getAndNode();
        for (var i = 0; i < this.values.length; i++) {
            var new_d = CompoundDesignator.create(d.tail(), new InputArgument(this.positions[i]));
            var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
            var sub_leaves = [];
            sub_leaves = this.values[i].query(q, ReturnValue.instance, sub_root, factory);
            leaves.push(...sub_leaves);
            n.addChild(sub_root);
        }
        if (n.getChildren().length === 1) {
            root.addChild(n.getChildren()[0]);
        } else {
            root.addChild(n);
        }
        return leaves;
    }
}

/**
 * The Boolean "and" function.
 * @extends BooleanConnective
 */
class BooleanAnd extends BooleanConnective {
    constructor(arity = 2) {
            super(arity);
        }
        /**
         * Gets the Boolean value.
         * @param false_values
         * @param true_values
         * @param false_positions
         * @param true_positions
         */
    getBooleanValue(false_values = [], true_values = [], false_positions = [], true_positions = []) {
        if (false_values.length === 0) {
            return new NaryConjunctiveVerdict(true, true_values, true_positions);
        }
        return new NaryDisjunctiveVerdict(false, false_values, false_positions);
    }

    toString() {
        return "And";
    }
}

/**
 * The Boolean "or" function.
 * @extends BooleanConnective
 */
class BooleanOr extends BooleanConnective {
    constructor(arity = 2) {
        super(arity);
    }

    getBooleanValue(false_values = [], true_values = [], false_positions = [], true_positions = []) {
        if (true_values.length === 0) {
            return new NaryConjunctiveVerdict(false, false_values, false_positions);
        }
        return new NaryDisjunctiveVerdict(true, true_values, true_positions);
    }

    toString() {
        return "Or";
    }
}

/**
 * The Boolean "not" function.
 * @extends AtomicFunction
 */
class BooleanNot extends AtomicFunction {
    constructor() {
        super(1);
    }

    getValue() {
        if (typeof(arguments[0]) !== "boolean") {
            throw "BooleanNot: Invalid argument type";
        }
        return !arguments[0];
    }

    toString() {
        return "Not";
    }
}

/**
 * Package exports
 */
export { BooleanAnd, BooleanNot, BooleanOr, NaryConjunctiveVerdict, NaryDisjunctiveVerdict };