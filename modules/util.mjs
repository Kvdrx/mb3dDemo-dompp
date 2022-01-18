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
 * Checks if two objects are equal. This is a surrogate to simulate the
 * behavior of Object.equals in Java. If the first object has an equals()
 * method, it is called; otherwise, standard equality between JavaScript
 * objects is used.
 * @param o1 The first object
 * @param o2 The second object
 * @return true if the two objects are equal, false otherwise
 */
function same_object(o1, o2) {
    if (o1 == null && o2 == null) {
        return true;
    }
    if ((o1 == null && o2 != null) || (o1 != null && o2 == null)) {
        return false;
    }
    // assert: o1 != null && o2 != null
    if (typeof(o1).equals === "function") {
        // Two objects that implement equals
        return o1.equals(o2);
    }
    return o1 === o2;
}

function map_get(m, k) {
    for (const [key, value] of m) {
        if (key.equals(k)) {
            return value;
        }
    }
    return null;
}

function map_contains(m, k) {
    for (const [key] of m) {
        if (same_object(key, k)) {
            return true;
        }
    }
    return false;
}

function map_put(m, k, v) {
    for (const [key] of m) {
        if (same_object(key, k)) {
            m.set(key, v);
            return;
        }
    }
    m.set(k, v);
}

function set_contains(s, x) {
    for (var i = 0; i < s.length; i++) {
        if (same_object(s[i], x)) {
            return true;
        }
    }
    return false;
}

function isHtmlElement(obj) {
    if (typeof obj != 'object') {
        return false;
    }
    while (obj.constructor.name !== "" && obj.constructor.name !== "Object") {
        if ((obj.name || obj.constructor.name) === "HTMLElement") {
            return true;
        }
        obj = Object.getPrototypeOf(obj.constructor);
    }
    return false;
}

/**
 * Package exports
 */
export { map_contains, map_get, map_put, same_object, set_contains, isHtmlElement };