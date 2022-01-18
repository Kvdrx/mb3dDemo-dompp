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
import { AndNode, Explainer, ObjectNode, OrNode } from "./tracer.mjs";
import { set_contains } from "./util.mjs";

class TestDriver {
    constructor() {
        this.conditions = [];
        if (arguments.length > 0) {
            this.conditions = arguments;
        }
        this.returnedValues = [];
    }

    /**
     * Adds a condition to evaluate
     */
    add() {
        this.conditions.push(...arguments);
    }

    evaluateAll(o) {
        this.returnedValues = [];
        for (var i = 0; i < this.conditions.length; i++) {
            var v = this.conditions[i].evaluate(o);
            this.returnedValues.push(v);
        }
    }

    getResult() {
        var verdicts = [];
        for (var i = 0; i < this.conditions.length; i++) {
            verdicts.push(new Verdict(this.returnedValues[i], this.conditions[i]));
        }
        return new TestResult(...verdicts);
    }
}

class TestCondition {
    constructor(name, f) {
        this.name = name;
        this.function = f;
    }

    getName() {
        return this.name;
    }

    /**
     * Evaluates a test condition on a web element.
     * @param e The web element on which to evaluate the test condition
     * @return {Verdict} The result of the evaluation of the condition
     */
    evaluate(e) {
        return this.function.evaluate(e);
    }
}

class Verdict {
    /**
     * Creates a new verdict.
     * @param v {Value} The return value of the test condition
     * @param c {TestCondition} The test condition that was evaluated
     */
    constructor(v, c) {
        this.value = v;
        this.condition = c;
    }

    getCondition() {
        return this.condition;
    }

    getValue() {
        return this.value;
    }

    getResult() {
        var o = this.value.getValue();
        if (!o) {
            return false;
        }
        return true;
    }

    getWitness() {
        var list = [];
        var root = Explainer.explain(this.value);
        Verdict.pick(root, list);
        return list;
    }

    /**
     * Non-deterministically picks a set of objects that explain the verdict.
     * The method is recursive and works as follows:
     * <ul>
     * <li>If the current node is an And node, call pick on all its
     * children</li>
     * <li>If the current node is an Or node, call pick on one of its
     * children</li>
     * <li>If the current node is a leaf ObjectNode, add it to the list</li>
     * <li>Otherwise, call pick on all children of the node</li>
     * </ul>
     * Non-determinism occurs because of the handling of the Or node. By
     * construction, any set of elements produced by the method is one of the
     * clauses of the tree when put in disjunctive normal form.
     * @param n The current node
     * @param list A list to which nodes are added
     */
    static pick(n, list, visited = []) {
        if (set_contains(visited, n)) {
            return;
        }
        visited.push(n);
        if (n instanceof AndNode) {
            for (var i = 0; i < n.getChildren().length; i++) {
                Verdict.pick(n.getChildren()[i], list, visited);
            }
        } else if (n instanceof OrNode) {
            var test = true;
            while (test) {
                Verdict.pick(n.getChildren()[i], list, visited);
                test = false;
            }
            /*
            for (let i = 0; i < n.getChildren().length; i++) {
            	Verdict.pick(n.getChildren()[i], list, visited);
            	break;
            }
            */
        } else if (n instanceof ObjectNode) {
            if (n.getChildren().length === 0) {
                list.push(n.getDesignatedObject());
            } else {
                for (let i = 0; i < n.getChildren().length; i++) {
                    Verdict.pick(n.getChildren()[i], list, visited);
                }
            }
        }
    }
}

class TestResult {
    constructor() {
        this.verdicts = arguments;
    }

    getVerdicts() {
        return this.verdicts;
    }

    getResult() {
        for (var i = 0; i < this.verdicts.length; i++) {
            if (!this.verdicts[i].getResult()) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Package exports
 */
export { TestCondition, TestDriver, TestResult, Verdict };

// :wrap=soft:tabSize=2:indentWidth=2: