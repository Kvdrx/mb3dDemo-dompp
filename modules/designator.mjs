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
// Local imports
import { same_object } from "./util.mjs";

/**
 * Abstract class representing all functions that extract parts of an
 * object.
 */
class Designator {
    /**
     * Creates a new instance of designator.
     */
    constructor() {
        // Nothing to do
    }

    /**
     * Extracts the designator at the head of a composition. For designators that
     * are atomic, returns the designator itself.
     */
    head() {
        return this;
    }

    /**
     * Extracts the designator made of the tail of a composition. For designators
     * that are atomic, returns null.
     */
    tail() {
        return null;
    }

    equals(o) {
        if (o == null || !(o instanceof Designator)) {
            return false;
        }
        return o == this;
    }
}

/**
 * A special designator that designates "nothing".
 * @extends Designator
 */
class Nothing extends Designator {
    static instance = new Nothing();

    constructor() {
        super();
    }

    toString() {
        return "Nothing";
    }

    equals(o) {
        if (o == null || !(o instanceof Nothing)) {
            return false;
        }
        return true;
    }
}

/**
 * A special designator that designates "unknown".
 * @extends Designator
 */
class Unknown extends Designator {
    static instance = new Unknown();

    constructor() {
        super();
    }

    toString() {
        return "Unknown";
    }

    equals(o) {
        if (o == null || !(o instanceof Unknown)) {
            return false;
        }
        return true;
    }
}

/**
 * A special designator that designates all of an object.
 * @extends Designator
 */
class All extends Designator {
    static instance = new All();

    constructor() {
        super();
    }

    toString() {
        return "All";
    }

    equals(o) {
        if (o == null || !(o instanceof All)) {
            return false;
        }
        return true;
    }
}

/**
 * Designator expressed as the composition of atomic designators.
 * @param Any number of designators
 * @extends Designator
 */
class CompoundDesignator extends Designator {
    /**
     * Creates a flat compound designator from a list of other designators.
     */
    static create() {
        if (arguments.length == 0) {
            return Nothing.instance;
        }
        var designators = [];
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == null) {
                continue;
            }
            if (arguments[i] instanceof CompoundDesignator) {
                designators.push(...arguments[i].elements);
            } else {
                designators.push(arguments[i]);
            }
        }
        if (designators.length == 0) {
            return Nothing.instance;
        }
        if (designators.length == 1) {
            return designators[0];
        }
        return new CompoundDesignator(...designators);
    }

    constructor() {
        super();
        this.elements = [];
        for (var i = 0; i < arguments.length; i++) {
            this.add(arguments[i]);
        }
    }

    /**
     * Adds a designator to the composition.
     * @param d The designator to add. If it is compound, each of its elements are
     * added individually. This helps keeping the compound designators "flat".
     * If d is null, the input is simply ignored and nothing happens.
     */
    add(d) {
        if (d == null) {
            return;
        }
        if (d instanceof CompoundDesignator) {
            for (var j = 0; j < d.elements.length; j++) {
                this.add(d.elements[j]);
            }
        } else {
            this.elements.push(d);
        }
    }

    /**
     * Gets the size (number of atomic designators) contained in this composite
     * designator.
     * @return The number of atomic designators
     */
    size() {
        return this.elements.length;
    }

    head() {
        if (this.elements.length == 0) {
            return new Nothing();
        }
        return this.elements[this.elements.length - 1];
    }

    tail() {
        if (this.elements.length <= 1) {
            return null;
        }
        if (this.elements.length == 2) {
            return this.elements[0];
        }
        var new_d = new CompoundDesignator();
        for (var i = 0; i < this.elements.length - 1; i++) {
            new_d.add(this.elements[i]);
        }
        return new_d;
    }

    toString() {
        var s = "";
        for (var i = 0; i < this.elements.length; i++) {
            if (i > 0) {
                s += " of ";
            }
            s += this.elements[i].toString();
        }
        return s;
    }

    equals(o) {
        if (o == null || !(o instanceof CompoundDesignator)) {
            return false;
        }
        if (o.size() != this.size()) {
            return false;
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (!same_object(this.elements[i], o.elements[i])) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Module exports
 */
export { All, CompoundDesignator, Designator, Nothing, Unknown };