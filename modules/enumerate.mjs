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

import { AtomicFunction, AtomicFunctionReturnValue } from "./atomic-function.mjs";
import { CompoundDesignator, Designator } from "./designator.mjs";
import { Value } from "./value.mjs";

/**
 *
 * @extends AtomicFunction
 */
class Enumerate extends AtomicFunction {
  constructor() {
    super(1);
  }

  compute() {
    var list = arguments[0].getValue();
    if (!Array.isArray(list)) {
      throw "Enumerate: Invalid argument type";
    }
    var val_list = [];
    var out_list = [];
    for (var i = 0; i < list.length; i++) {
      val_list.push(Value.lift(list[i]));
    }
    for (let i = 0; i < list.length; i++) {
      out_list.push(new EnumeratedValue(i, val_list));
    }
    return new AtomicFunctionReturnValue(this, out_list, ...arguments);
  }

  getValue() {
    return null;
  }
}
/**
 *
 * @extends Value
 */
class EnumeratedValue extends Value {
  constructor(index, input_list) {
    super();
    this.index = index;
    this.inputList = input_list;
    this.members = [index, input_list];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = CompoundDesignator.create(d.tail(), new NthItem(this.index));
    var n_it = factory.getObjectNode(new_d, this.inputList);
    root.addChild(n_it);
    var v = this.inputList[this.index];
    var sub_leaves = v.query(q, new_d, n_it, factory);
    leaves.push(...sub_leaves);
    return leaves;
  }

  getValue() {
    return this.inputList[this.index].getValue();
  }

  toString() {
    return this.inputList[this.index].getValue().toString();
  }

  equals(o) {
    if (o == null || !(o instanceof EnumeratedValue)) {
      return false;
    }
    return this.index === o.index && this.inputList === o.inputList;
  }
}

/**
 *
 * @extends Designator
 */
class NthItem extends Designator {
  constructor(index) {
    super();
    this.index = index;
  }

  appliesTo(o) {
    return Array.isArray(o);
  }

  getIndex() {
    return this.index;
  }

  toString() {
    return "Element #" + (this.index + 1);
  }
}

/**
 * Package exports
 */
export { Enumerate, EnumeratedValue, NthItem };

// :wrap=soft:tabSize=2:indentWidth=2:
