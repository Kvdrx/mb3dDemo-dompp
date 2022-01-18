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
import { CompoundDesignator, Designator } from "./designator.mjs";
import { AtomicFunction, AtomicFunctionReturnValue } from "./atomic-function.mjs";
import { Value } from "./value.mjs";
import { Enumerate, EnumeratedValue } from "./enumerate.mjs";

/**
 *
 * @extends AtomicFunction
 */
class WebElementFunction extends AtomicFunction {
    constructor(name) {
        super(1);
        this.name = name;
    }

    compute() {
        var element = arguments[0].getValue();
        var val;
        if(element.isWrapper) {
            val = this.getWrapperValue(element);
        }
        else {
            val = this.get(element);
        }
        return new ElementAttributeValue(this.name, arguments[0], val);
    }

    get(e) {
            return null; // To be overridden by descendants
        }
        //this method help to get window object
    getOwnerWindow(element) {
        return element.ownerDocument.defaultView || element.ownerDocument.parentWindow;
    }
    getElementComputedStyle(element) {
        const window = this.getOwnerWindow(element);
        return window.getComputedStyle(element);
    }
    getWrapperValue(wrapper) {
        for(let i = 0; i < wrapper.propertyNames.length; i++) {
            if(wrapper.propertyNames[i] == this.name){
                return wrapper.propertyValues[i];
            }
        }
        var node = document.evaluate(wrapper.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return this.get(node);
    }
}

/**
 * Designator that points to the value of an attribute for some DOM node.
 * @extends Designator
 */
class ElementAttribute extends Designator {
    /**
     * Creates a ne instance of the designator.
     * @param name {String} The name of the attribute
     */
    constructor(name) {
        super();
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

/**
 * The value of an attribute for some DOM node.
 * @extends Value
 */
class ElementAttributeValue extends Value {
    /**
     * Creates a new instance of the value.
     * @param name {String} The name of the attribute in the DOM node
     * @param input {Object|Value} The DOM node, or a value containing the
     * DOM node
     * @param v {Object|Value} The value of the attribute in the DOM node
     */
    constructor(name, input, v) {
        super();
        this.name = name;
        this.input = Value.lift(input);
        this.value = Value.lift(v);
    }

    getValue() {
        return this.value.getValue();
    }

    toString() {
        return this.value.getValue().toString();
    }

    query(q, d, root, factory) {
        var leaves = [];
        var new_d = CompoundDesignator.create(new ElementAttribute(this.name), d);
        var n = factory.getObjectNode(new_d, this.input);
        leaves.push(...this.input.query(q, new_d, n, factory));
        root.addChild(n);
        return leaves;
    }
}
/**
 * value of css attribute
 * @extends WebElementFunction
 */
class CssPropertyFunction extends WebElementFunction {
    constructor(name, returnType = null) {
        if (["float", "int", "string", null].indexOf(returnType) == -1) {
            throw new Error(`CssPropertyFunction returnType expects one of the following values: "float", "int", "string", null. Received ${returnType} instead.`);
        }

        super(name);
        this.returnType = returnType;
    }

    get(element) {
        const style = this.getElementComputedStyle(element);
        const value = style.getPropertyValue(this.name);

        switch (this.returnType) {
            case "float":
                return parseFloat(value);

            case "int":
                return parseInt(value);

            case "string":
                return typeof value == "string" ? value : value.toString();
        }

        return value;
    }
}

/**
 * value of a css attribute, but in case the value is undefined or does not meet certain criteria, retrieve the value of the parent element
 * @extends WebElementFunction
 */
class CssRecursivePropertyFunction extends WebElementFunction {
    constructor(name, returnType = null, defaultValue = null) {
        if (["float", "int", "string", null].indexOf(returnType) == -1) {
            throw new Error(`CssPropertyFunction returnType expects one of the following values: "float", "int", "string", null. Received ${returnType} instead.`);
        }

        super(name);
        this.returnType = returnType;
        this.defaultValue = defaultValue;
    }

    get(element) {
        const value = this.getRecursive(element);

        switch (this.returnType) {
            case "float":
                return parseFloat(value);

            case "int":
                return parseInt(value);

            case "string":
                return typeof value == "string" ? value : value.toString();
        }

        return value;   
    }

    getRecursive(element) {
        if(!element) return this.defaultValue;

        const style = this.getElementComputedStyle(element);
        const value = style.getPropertyValue(this.name);

        if(this.filter(value))
            return this.getRecursive(element.parentElement);
        else
            return value;
    }

    //to be overridden by descendants to add additionnal filters depending on property
    filter(value) {
        return value == "";
    }
}


/**
 * Function that extracts the width of a DOM node.
 * @extends WebElementFunction
 */
class DimensionWidth extends WebElementFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super("width");
    }

    get(element) {
        return element.offsetWidth;
    }
}

/**
 * Function that extracts the height of a DOM node.
 * @extends WebElementFunction
 */
class DimensionHeight extends WebElementFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super("height");
    }

    get(element) {
        return element.offsetHeight;
    }
}
/** 
 * Function that extracts the offset from the top of the page of a DOM node.
 * @extends WebElementFunction
 */
class PageOffsetTop extends WebElementFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super("pageOffsetTop");
    }

    get(element) {
        return this.getOffsetTop(element);
    }

    getOffsetTop(element) {
        if(!element) return 0;
        return this.getOffsetTop(element.offsetParent) + element.offsetTop;
    }

}
/**
 * Function that extracts the offset from the left of the page of a DOM node.
 * @extends WebElementFunction
 */
class PageOffsetLeft extends WebElementFunction {
    /**
    * Creates a new instance of the function.
    */
    constructor() {
        super("pageOffsetLeft");
    }

    get(element) {
        return this.getOffsetLeft(element);
    }

    getOffsetLeft(element) {
        if(!element) return 0;
        return this.getOffsetLeft(element.offsetParent) + element.offsetLeft;
    }
}
/** 
 * Function that extracts the offset from the top of the viewport of a DOM node.
 * @extends WebElementFunction
 */
class ClientOffsetTop extends WebElementFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super("clientOffsetTop");
    }

    get(element) {
        return element.getBoundingClientRect().top;
    }
}
/** 
 * Function that extracts the offset from the left of the viewport of a DOM node.
 * @extends WebElementFunction
 */
class ClientOffsetLeft extends WebElementFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super("clientOffsetLeft");
    }

    get(element) {
        return element.getBoundingClientRect().left;
    }
}
/**
 * Function that extracts the font size.
 * @extends CssPropertyFunction
 */
class FontSize extends CssPropertyFunction {
    constructor() {
        super("font-size")
    }
}
/**
 * Function that extracts the font size.
 * @extends CssPropertyFunction
 */
class FontWeight extends CssPropertyFunction {
    constructor() {
        super("font-weight")
    }
}
/**
 * Function that extracts the font family
 * @extends CssPropertyFunction
 */
class FontFamily extends CssPropertyFunction {
    constructor() {
        super("font-family")
    }
}
/**
 * Function that extract the color of DOM element
 * @extends CssPropertyFunction
 */
class Color extends CssPropertyFunction {
    constructor() {
        super("color")
    }
}
/**
 * Function that extract the opacity
 * @extends CssPropertyFunction
 */
class Opacity extends CssPropertyFunction {
    constructor() {
        super("opacity", "float");
    }
}
/**
 * Function that extracts the background-color of a DOM.
 * @extends CssPropertyFunction
 */
class BackgroundColor extends CssRecursivePropertyFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super("background-color", null, "rgba(0, 0, 0, 0)");
    }

    filter(value) {
        return (value == "" || value == "transparent" || value == "rgba(0, 0, 0, 0)")
    }
}
/**
 * Function that extract margin-top of a DOM
 * @extends CssPropertyFunction
 */
class MarginTop extends CssPropertyFunction {
    constructor() {
        super("margin-top", "float")
    }
}
/**
 * Function that extract margin-bottom of a DOM
 * @extends CssPropertyFunction
 */
class MarginBottom extends CssPropertyFunction {
    constructor() {
        super("margin-bottom")
    }
}
/**
 * Function that extract margin-left of a DOM
 * @extends CssPropertyFunction
 */
class MarginLeft extends CssPropertyFunction {
    constructor() {
        super("margin-left")
    }
}
/**
 * Function that extract margin-right of a DOM
 * @extends CssPropertyFunction
 */
class MarginRight extends CssPropertyFunction {
    constructor() {
        super("margin-right")
    }
}
/**
 * Function that extract paddig-top of a DOM
 * @extends CssPropertyFunction
 */
class PaddingTop extends CssPropertyFunction {
    constructor() {
        super("padding-top")
    }
}
/**
 * Function that extract paddig-bottom of a DOM
 * @extends CssPropertyFunction
 */
class PaddingBottom extends CssPropertyFunction {
    constructor() {
        super("padding-bottom")
    }
}
/**
 * Function that extract paddig-left of a DOM
 * @extends CssPropertyFunction
 */
class PaddingLeft extends CssPropertyFunction {
    constructor() {
        super("padding-left")
    }
}
/**
 * Function that extract paddig-right of a DOM
 * @extends CssPropertyFunction
 */
class PaddingRight extends CssPropertyFunction {
    constructor() {
        super("padding-right")
    }
}
/**
 * Function that extract border-width
 * @extends CssPropertyFunction
 */
class BorderWidth extends CssPropertyFunction {
    constructor() {
        super("border-width")
    }
}
/**
 * Function extract border-style of DOM element
 * @extends CssPropertyFunction
 */
class BorderStyle extends CssPropertyFunction {
    constructor() {
        super("border-style")
    }
}
/**
 * Function extrach border-color for DOM element
 * @extends CssPropertyFunction
 */
class BorderColor extends CssPropertyFunction {
    constructor() {
        super("border-color")
    }
}
/**
 * Function that extract border-radius
 * @extends CssPropertyFunction
 */
class BorderRadius extends CssPropertyFunction {
    constructor() {
        super("border-radius")
    }
}
/**
 * Function that extract display property of DOM element
 * @extends CssPropertyFunction
 */
class Display extends CssPropertyFunction {
    constructor() {
        super("display")
    }
}
/**
 * Function that extract visibility of DOM element
 * @extends CssPropertyFunction
 */
class Visibility extends CssPropertyFunction {
    constructor() {
        super("visibility")
    }
}
/**
 * Function that extract position of DOM element
 * @extends CssPropertyFunction
 */
class Position extends CssPropertyFunction {
    constructor() {
        super("position")
    }
}
/**
 * Function that extract flottant elemnt of DOM
 * @extends CssPropertyFunction
 */
class Float extends CssPropertyFunction {
    constructor() {
        super("float")
    }
}
/**
 * Function that extract flottant elemnt of DOM
 * @extends CssPropertyFunction
 */
class BackgroundImage extends CssPropertyFunction {
    constructor() {
        super("background-image")
    }
}

/**
 * Function that extract Z-index
 * @extends CssRecursivePropertyFunction
 */
class Zindex extends CssRecursivePropertyFunction {
    constructor() {
        super("z-index", "float", 0);
    }

    filter(value) {
        return value == "" || value == "auto";
    }
}

/**
 * Designator that points to an element in a DOM tree based on
 * an XPath expression.
 * @extends Designator
 */
class Path extends Designator {
    /**
     * Creates a new instance of the designator.
     * @param path {String} A string containing an XPath expression
     */
    constructor(path) {
        super();
        this.path = path;
    }

    toString() {
        return this.path;
    }

}

/**
 * The value of the path
 * @extends Value
 */
class PathValue extends Value {
    constructor(p, root, value) {
        super();
        this.value = Value.lift(value);
        this.root = Value.lift(root);
        this.path = p;
        this.members = [p, root, value];
    }

    query(q, d, root, factory) {
        var leaves = [];
        var new_d = CompoundDesignator.create(d.tail(), this.path);
        var n = factory.getObjectNode(new_d, this.root);
        leaves.push(...this.root.query(q, new_d, n, factory));
        root.addChild(n);
        return leaves;
    }

    getValue() {
        return this.value.getValue();
    }

    toString() {
        return this.value.toString();
    }
}

/**
 * Function that produces a list of elements that match a given CSS selector.
 * @extends Enumerate
 */
class FindBySelector extends Enumerate {
    /**
     * Creates a new instance of the function.
     * @param selector The CSS selector used to fetch elements
     */
    constructor(selector) {
        super();
        this.selector = selector;
        this.members = [selector]
    }

    evaluate() {
        if (arguments.length !== 1) {
            throw "Invalid number of arguments";
        }
        var v = Value.lift(arguments[0]);
        var root = v.getValue();
        var elm_list = root.querySelectorAll(this.selector);
        var val_list = [];
        var out_list = [];
        for (let i = 0; i < elm_list.length; i++) {
            var path = FindBySelector.getPathTo(elm_list[i]);
            var pv = new PathValue(new Path(path), root, elm_list[i]);
            val_list.push(pv);
        }
        for (let i = 0; i < val_list.length; i++) {
            out_list.push(new EnumeratedValue(i, val_list));
        }
        return new AtomicFunctionReturnValue(this, out_list, v);
    }

    static getPathTo(element) {
        if (element.id !== "") { return "id(\"" + element.id + "\")"; }
        if (element.tagName === "BODY") { return "html/body"; }

        var ix = 0;
        var siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (sibling === element) { return this.getPathTo(element.parentNode) + "/" + element.tagName.toLowerCase() + "[" + (ix + 1) + "]"; }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) { ix++; }
        }
    }
}

/**
 * Wrapper that enclose the path to a DOM Node and register a number of CSS property values determined by the user.
 */
class NodeWrapper {
    /**
     * Creates a new instance of the wrapper.
     * @param element Reference to the DOM Node used to fetch values
     * @param path Xpath corresponding to element
     * @param properties The list of CSS properties to be registered
     */
    constructor(element, path, ...properties) {
        this.isWrapper = true;
        this.path = path;
        this.propertyNames = [];
        this.propertyValues = [];

        for(let i = 0; i < properties.length; i++) {
            this.propertyNames[i] = properties[i].name;
            this.propertyValues[i] = properties[i].get(element);
        }
    }
}

/**
 * Function that finds a DOM Node from the Xpath stored in a NodeWrapper
 * @extends AtomicFunction
 */
class CurrentNode extends AtomicFunction {
    /**
     * Creates a new instance of the function.
     */
    constructor() {
        super(1);
    }

    getValue() { 
        var wrapper = arguments[0];
        //wrapper = wrapper.inputList[wrapper.index].value.value;
        if(!wrapper.isWrapper)
            throw "CurrentNode : Invalid argument type";
        var node = document.evaluate(wrapper.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return node;
    }
}

/**
 * Function that produces a list of NodeWrapper from nodes that match a given CSS selector.
 * @extends Enumerate
 */
class RegisterBySelector extends Enumerate {
    /**
     * Creates a new instance of the function.
     * @param selector The CSS selector used to fetch elements
     * @param properties The list of CSS attributes to be registered in the wrappers
     */
    constructor(selector, ...properties) {
        super();
        this.selector = selector;
        this.properties = properties;
        this.members = [selector, properties]
    }

    evaluate() {
        if (arguments.length !== 1) {
            throw "Invalid number of arguments";
        }
        var v = Value.lift(arguments[0]);
        var root = v.getValue();
        var elm_list = root.querySelectorAll(this.selector);
        var val_list = [];
        var out_list = [];
        for (let i = 0; i < elm_list.length; i++) {
            var path = FindBySelector.getPathTo(elm_list[i]);
            var wrapper = new NodeWrapper(elm_list[i], path, ...this.properties);
            var pv = new PathValue(new Path(path), root, wrapper);
            val_list.push(pv);
        }
        for (let i = 0; i < val_list.length; i++) {
            out_list.push(new EnumeratedValue(i, val_list));
        }
        return new AtomicFunctionReturnValue(this, out_list, v);
    }
}

/**
 * Package exports
 */
export { BackgroundColor, BackgroundImage, BorderColor, BorderRadius, BorderStyle, BorderWidth, ClientOffsetTop, ClientOffsetLeft, Color, CssPropertyFunction, CssRecursivePropertyFunction, CurrentNode, DimensionHeight, DimensionWidth, Display, ElementAttribute, ElementAttributeValue, FindBySelector, Float, FontFamily, FontSize, FontWeight, MarginTop, MarginBottom, MarginRight, MarginLeft, NodeWrapper, Opacity, PageOffsetTop, PageOffsetLeft, Path, PathValue, PaddingTop, PaddingBottom, PaddingRight, PaddingLeft, Position, RegisterBySelector, Visibility, WebElementFunction, Zindex };

// :wrap=soft:tabSize=2:indentWidth=2: