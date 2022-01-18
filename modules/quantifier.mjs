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
import { AbstractFunction, ReturnValue } from "./function.mjs";
import { Value } from "./value.mjs";
import { Verdict } from "./verdict.mjs";

/**
 * Base class for the implementation of the universal and existential
 * quantifiers.
 * @extends AbstractFunction
 */
class Quantifier extends AbstractFunction {
    /**
     * Creates a new instance of quantifier.
     * @param index {integer|string}
     * @param domain {AbstractFunction}
     * @param phi {AbstractFunction}
     */
    constructor(index, domain, phi) {
        super();
        if (typeof(index) === "number") {
            this.index = index;
        } else {
            this.variable = index;
        }
        this.domain = domain;
        this.phi = phi;

        this.members = [index, domain, phi]
    }

    getArity() {
        return 1;
    }

    evaluate() {
        if (arguments.length !== 1) {
            throw "Invalid number of arguments";
        }
        var true_verdicts = [];
        var false_verdicts = [];
        var v_dom = this.domain.evaluate(...arguments);
        var o_dom = v_dom.getValue();
        if (!Array.isArray(o_dom)) {
            throw "Domain expression does not return a list";
        }
        var domain = o_dom;
        for (var i = 0; i < domain.length; i++) {
            var x = Value.lift(domain[i]);
            var cf = this.phi.set(this.variable, x);
            var ret_val = cf.evaluate(...arguments);
            var o_b = ret_val.getValue();
            if (typeof(o_b) !== "boolean") {
                throw "Invalid argument type";
            }
            var b = o_b;
            if (b) {
                true_verdicts.push({ value: x, verdict: ret_val });
            } else {
                false_verdicts.push({ value: x, verdict: ret_val });
            }
        }
        return this.getQuantifierValue(false_verdicts, true_verdicts);
    }

    getQuantifierValue(false_verdicts, true_verdicts) {
        return null; // To be overridden by descendants
    }
}

/**
 * Common class to {@link QuantifierDisjunctiveVerdict} and
 * {@link QuantifierConjunctiveVerdict}.
 * @extends Value
 */
class QuantifierVerdict extends Value {
    constructor(f, value, verdicts) {
        super();
        this.value = value;
        this.verdicts = verdicts;
        this.referenceFunction = f;
    }

    getValue() {
        return this.value;
    }

    toString() {
        return this.value.toString();
    }
}

/**
 * Verdict returned by a quantifier and which depends on either of the input
 * values provided. This verdict is returned for a universal quantifier that
 * evaluates to false, and for an existential quantifier that evaluates to
 * true.
 * @extends QuantifierVerdict
 */
class QuantifierDisjunctiveVerdict extends QuantifierVerdict {
    query(q, d, root, factory) {
        var leaves = [];
        var n = factory.getOrNode();
        for (var i = 0; i < this.verdicts.length; i++) {
            var vv = this.verdicts[i];
            var v = vv.verdict;
            var sub_factory = factory.getSubTracer(this.referenceFunction);
            var sub_leaves = v.query(q, ReturnValue.instance, n, sub_factory);
            leaves.push(...sub_leaves);
        }
        var tn = factory.getObjectNode(ReturnValue.instance, this.referenceFunction);
        if (this.verdicts.length === 1) {
            tn.addChild(n.getChildren()[0]);
        } else {
            tn.addChild(n);
        }
        root.addChild(tn);
        return leaves;
    }
}

/**
 * Verdict returned by a quantifier and which depends on all the input values
 * provided. This verdict is returned for a universal quantifier that evaluates
 * to true, and for an existential quantifier that evaluates to false.
 * @extends QuantifierVerdict
 */
class QuantifierConjunctiveVerdict extends QuantifierVerdict {
    query(q, d, root, factory) {
        var leaves = [];
        var n = factory.getAndNode();
        for (var i = 0; i < this.verdicts.length; i++) {
            var vv = this.verdicts[i];
            var v = vv.verdict;
            var sub_factory = factory.getSubTracer(v);
            var sub_leaves = v.query(q, ReturnValue.instance, n, sub_factory);
            leaves.push(...sub_leaves);
        }
        var tn = factory.getObjectNode(ReturnValue.instance, this.referenceFunction);
        if (this.verdicts.length === 1) {
            tn.addChild(n.getChildren()[0]);
        } else {
            tn.addChild(n);
        }
        root.addChild(tn);
        return leaves;
    }
}

/**
 * Universal quantifier.
 * @extends Quantifier
 */
class UniversalQuantifier extends Quantifier {
    getQuantifierValue(false_verdicts = [], true_verdicts = []) {
        if (false_verdicts.length === 0) {
            return new QuantifierConjunctiveVerdict(this, true, true_verdicts);
        }
        return new QuantifierDisjunctiveVerdict(this, false, false_verdicts);
    }

    toString() {
        return "ForAll";
    }

    set(variable, value) {
        return new UniversalQuantifier(this.variable, this.domain.set(variable, value), this.phi.set(variable, value));
    }
}

/**
 * Existential quantifier.
 * @extends Quantifier
 */
class ExistentialQuantifier extends Quantifier {
    getQuantifierValue(false_verdicts = [], true_verdicts = []) {
        if (true_verdicts.length > 0) {
            return new QuantifierDisjunctiveVerdict(this, true, true_verdicts);
        }
        return new QuantifierConjunctiveVerdict(this, false, false_verdicts);
    }

    toString() {
        return "Exists";
    }

    set(variable, value) {
        return new ExistentialQuantifier(this.variable, this.domain.set(variable, value), this.phi.set(variable, value));
    }
}

/**
 * Package exports
 */
export { ExistentialQuantifier, Quantifier, QuantifierConjunctiveVerdict, QuantifierDisjunctiveVerdict, QuantifierVerdict, UniversalQuantifier };
// :wrap=soft:tabSize=2:indentWidth=2: