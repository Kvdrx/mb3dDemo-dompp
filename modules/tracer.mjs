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
import { All, Nothing, Unknown } from "./designator.mjs";
import { ReturnValue } from "./function.mjs";
import { map_contains, map_get, map_put, same_object, set_contains } from "./util.mjs";

/**
 * Manages the nodes of a designation and-or graph.
 * @param arguments An optional stack corresponding to the tracer's context.
 */
class Tracer {
    constructor() {
        /**
         * A map keeping trace of which designated objects already have nodes.
         */
        this.nodes = new Map();

        /**
         * The context in which the tracer operates (a stack).
         */
        this.tracerContext = [];
        if (arguments.length > 0) {
            this.tracerContext = arguments;
        }

        /**
         * Whether to simplify the trees
         */
        this.simplify = true;
    }

    /**
     * Sets whether the trees produced by the tracer should be simplified.
     * @param b {boolean} Set to true to simplify trees, false otherwise
     */
    setSimplify(b) {
        this.simplify = b;
    }

    /**
     * Gets a new instance of an object node.
     * @param dob The designated object that will be contained inside the node
     * @return The object node. If an object node already exists for this
     * designated object, it is reused. Otherwise, a new object node is created.
     */
    getObjectNode(d, o) {
        if (d instanceof DesignatedObject) {
            var dob = d;
        } else {
            var dob = new DesignatedObject(d, o);
        }
        if (map_contains(this.nodes, dob)) {
            return map_get(this.nodes, dob);
        }
        var on = new ObjectNode(dob);
        map_put(this.nodes, dob, on);
        return on;
    }

    /**
     * Gets a new instance of an "and" node.
     * @return A new "and" node
     */
    getAndNode() {
        return new AndNode();
    }

    /**
     * Gets a new instance of an "or" node.
     * @return A new "or" node
     */
    getOrNode() {
        return new OrNode();
    }

    /**
     * Gets a new instance of an "unknown" node.
     * @return A new "unknown" node
     */
    getUnknownNode() {
        return new UnknownNode();
    }

    /**
     * Gets an instance of a sub-tracer from this tracer.
     * @param {Object} o An object to append at the end of the current
     * tracer's context
     */
    getSubTracer(o) {
        var con = [];
        con.push(...this.tracerContext);
        con.push(o);
        return new Tracer(...con);
    }

    getTree(q, d, o) {
        var visited = [];
        var tn = this.getObjectNode(d, o);
        this.getChildren(q, tn, visited);
        return tn;
    }

    getChildren(q, root, visited) {
        if (set_contains(visited, root)) {
            // This node has already been expanded
            return;
        }
        visited.push(root);
        if (!(root instanceof ObjectNode)) {
            // Nothing to expand
            return;
        }
        var dob = root.getDesignatedObject();
        var o = dob.getObject();
        var d = dob.getDesignator();
        if (d instanceof All || d instanceof Nothing || d instanceof Unknown) {
            // Trivial designator: nothing to expand
            return;
        }
        if (typeof o.query == "function") // Object is queryable
        {
            // Send the query and create nodes from its result
            var leaves = o.query(q, d, root, this);
            for (var i = 0; i < leaves.length; i++) {
                this.getChildren(q, leaves[i], visited);
            }
        } else {
            // Query is non-trivial, and object is not trackable: nothing to do
            //var n = this.getObjectNode(Unknown.instance, o);
            //root.addChild(n);
        }
    }
}

/**
 * Abstract object representing a generic node in an and-or lineage graph.
 */
class TraceabilityNode {
    /**
     * A counter for traceability node IDs.
     */
    static TN_ID_COUNTER = 0;

    constructor() {
        /**
         * The node's unique ID
         */
        this.id = TraceabilityNode.TN_ID_COUNTER++;

        /**
         * The node's children
         */
        this.children = [];
    }

    /**
     * Gets the node'is unique ID.
     * @return The node's ID
     */
    getId() {
        return this.id;
    }

    /**
     * Adds a child to the node.
     * @return The node to add
     */
    addChild(n) {
        if (n == this) {
            return;
        }
        this.children.push(n);
    }

    /**
     * Gets the children of this node.
     * @return The list of children
     */
    getChildren() {
        return this.children;
    }
}

/**
 * An "and" node.
 * @extends TraceabilityNode
 */
class AndNode extends TraceabilityNode {
    constructor() {
        super();
    }

    toString() {
        var indent = "";
        if (arguments.length == 1) {
            indent = arguments[0];
        }
        var s = "";
        s += indent + "^" + "\n";
        for (var i = 0; i < this.children.length; i++) {
            s += indent + this.children[i].toString(indent + " ");
        }
        return s;
    }

    addChild(n) {
        if (n instanceof AndNode) {
            for (var i = 0; i < n.children.length; i++) {
                this.children.push(n.children[i]);
            }
        } else {
            this.children.push(n);
        }
    }
}

/**
 * An "or" node.
 * @extends TraceabilityNode
 */
class OrNode extends TraceabilityNode {
    constructor() {
        super();
    }

    toString() {
        var indent = "";
        if (arguments.length == 1) {
            indent = arguments[0];
        }
        var s = "";
        s += indent + "v" + "\n";
        for (var i = 0; i < this.children.length; i++) {
            s += indent + this.children[i].toString(indent + " ");
        }
        return s;
    }

    addChild(n) {
        if (n instanceof OrNode) {
            for (var i = 0; i < n.children.length; i++) {
                this.children.push(n.children[i]);
            }
        } else {
            this.children.push(n);
        }
    }
}

/**
 * An "unknown" node.
 * @extends TraceabilityNode
 */
class UnknownNode extends TraceabilityNode {
    constructor() {
        super();
    }

    toString() {
        return "?";
    }
}

/**
 * An "object" node.
 * @extends TraceabilityNode
 */
class ObjectNode extends TraceabilityNode {
    /**
     * Creates a new object node.
     * @param {Designator|DesignatedObject} d The designator
     * @param {Object} o The object that is designated
     */
    constructor(d, o) {
        super();
        if (d instanceof DesignatedObject) {
            this.designatedObject = d;
        } else {
            this.designatedObject = new DesignatedObject(d, o);
        }
    }

    /**
     * Gets the designated object contained inside this node.
     */
    getDesignatedObject() {
        return this.designatedObject;
    }

    toString() {
        return this.designatedObject.toString();
    }
}

/**
 * Association between a designator, and object and an optional context.
 */
class DesignatedObject {
    /**
     * Creates a new designated object
     * @param designator The part of the object that is designated
     * @param object The object that is designated
     * @param context The object's context
     */
    constructor(designator, object, context) {
        /**
         * The part of the object that is designated.
         */
        this.designator = designator;

        /**
         * The object that is designated.
         */
        this.object = object;

        /**
         * The object's context.
         */
        if (arguments.length >= 3) {
            this.context = context;
        } else {
            this.context = [];
        }
    }

    /**
     * Retrieves the designator associated to an object.
     * @return The designator
     */
    getDesignator() {
        return this.designator;
    }

    /**
     * Retrieves the object that is being designated.
     * @return The object
     */
    getObject() {
        return this.object;
    }

    /**
     * Retrieves the object's context.
     * @return The context
     */
    getContext() {
        return this.context;
    }

    equals(cdo) {
        if (cdo == null || !(cdo instanceof DesignatedObject)) {
            return false;
        }
        return ((this.object == null && cdo.object == null) || (this.object != null && same_object(this.object, cdo.object))) &&
            (this.designator.equals(cdo.designator) && this.sameContext(cdo));
    }

    /**
     * Checks if two designated objects have the same context.
     * @param cdo The other designated object
     * @return <tt>true</tt> if the two objects have the same context,
     * <tt>false</tt> otherwise
     */
    sameContext(cdo) {
        if (this.context.length != cdo.context.length) {
            return false;
        }
        for (var i = 0; i < this.context.length; i++) {
            if (this.context[i] != cdo.context[i]) {
                return false;
            }
        }
        return true;
    }

    toString() {
        return this.designator.toString() + " of " + this.object.toString();
    }
}

/**
 * Front-end to explain the result of a calculation. This class provides a
 * static method called <tt>explain</tt> that can be used to produce a
 * lineage DAG from a {@link Value} returned by a function.
 */
class Explainer {
    constructor() {
        // Nothing to do
    }

    /**
     * Explains the result of a calculation produced by an
     * {@link AbstractFunction}.
     * @param v {Value} The value to explain
     * @param simplify Set to <tt>true</tt> to produce a simplified DAG
     * (default), <tt>false</tt> to get a full DAG
     */
    static explain(v, simplify = true) {
        var tracer = new Tracer();
        tracer.setSimplify(simplify);
        return tracer.getTree(null, ReturnValue.instance, v);
    }
}

/**
 * Package exports
 */
export { Tracer, AndNode, DesignatedObject, Explainer, ObjectNode, OrNode, UnknownNode };

// :wrap=soft:tabSize=2:indentWidth=2: