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
import { AbstractFunction, InputArgument, ReturnValue } from "./function.mjs";
import { Value } from "./value.mjs";
import { ObjectNode } from "./tracer.mjs";

/**
 * A function that is defined as the composition of other functions.
 * @extends AtomicFunction
 */
class ComposedFunction extends AbstractFunction {
  /**
     * Creates a new instance of the function.
     * @param operator The top-level operator this function composes
     * @param operands The operands of this function. These operands
     * can themselves be other functions.
     */
  constructor(operator, ...operands) {
    super();
    this.members = [operator, ...operands];
    this.operator = operator;
    this.operands = [];
    for (var i = 0; i < operands.length; i++) {
      if (typeof (operands[i]) === "string") {
        var op = operands[i];
        if (op.startsWith("@")) {
          var index = op.substring(1).trim();
          this.operands.push(new Argument(index));
          continue;
        }
        if (op.startsWith("$")) {
          this.operands.push(new NamedArgument(this, op.substring(1).trim()));
          continue;
        }
      } else {
        this.operands.push(AbstractFunction.lift(operands[i]));
      }
    }
  }

  setName(name) {
    this.name = name;
    return this;
  }

  set(variable, value) {
    var cf = new ComposedFunction(this.operator);
    var operands = [];
    for (var i = 0; i < this.operands.length; i++) {
      operands.push(this.operands[i].set(variable, value));
    }
    cf.operands = operands;
    return cf;
  }

  getArity() {
    var args = [];
    this.getArguments(args);
    return args.length;
  }

  getArguments(args) {
    for (var i = 0; i < this.operands.length; i++) {
      var f = this.operands[i];
      if (f instanceof ComposedFunction) {
        f.getArguments(args);
      }
      if (f instanceof Argument) {
        args.push(f.index);
      }
      if (f instanceof NamedArgument) {
        args.push(i);
      }
    }
  }

  evaluate() {
    var values = [];
    for (var i = 0; i < this.operands.length; i++) {
      values.push(this.operands[i].evaluate(...arguments));
    }
    var v = this.operator.evaluate(...values);
    return new ComposedFunctionValue(this, v, ...values);
  }

  toString() {
    if (this.name != null) {
      return this.name;
    }
    return "F(" + this.operator.toString() + ")";
  }
}

/**
 * Value returned by a composed function.
 * @extends Value
 */
class ComposedFunctionValue extends Value {
  constructor(f, return_value, ...values) {
    super();
    this.referenceFunction = f;
    this.inputValues = values;
    this.returnValue = return_value;
  }

  query(q, d, root, factory) {
    var leaves = [];
    if (!(d.head() instanceof ReturnValue)) {
      return leaves;
    }
    var new_d = CompoundDesignator.create(ReturnValue.instance, d.tail());
    var sub_root = factory.getObjectNode(new_d, this.referenceFunction.operator);
    var sub_leaves = this.returnValue.query(q, d, sub_root, factory);
    var new_sub_leaves = [];
    for (var i = 0; i < sub_leaves.length; i++) {
      var sub_leaf = sub_leaves[i];
      if (sub_leaf instanceof ObjectNode) {
        var o_sl = sub_leaf;
        var des = o_sl.getDesignatedObject().getDesignator();
        if (des.head() instanceof InputArgument) {
          var fia = des.head();
          var index = fia.getIndex();
          new_sub_leaves.push(...this.inputValues[index].query(q, new_d, sub_leaf, factory));
          continue;
        }
      }
      new_sub_leaves.push(sub_leaf);
    }
    leaves.push(...new_sub_leaves);
    root.addChild(sub_root);
    return leaves;
  }

  getValue() {
    return this.returnValue.getValue();
  }

  toString() {
    return this.returnValue.toString();
  }
}

/**
 * A named argument.
 * @extends AbstractFunction
 */
class NamedArgument extends AbstractFunction {
  constructor(f, name) {
    super();
    this.name = name;
    this.value = null;
    this.referenceFunction = f;
    this.isSet = false;
  }

  /* @Override */
  set(name, value) {
    if (this.name === name || ("$" + this.name) === name) {
      this.value = Value.lift(value);
    }
    this.isSet = true;
    return this;
  }

  evaluate() {
    if (this.isSet) {
      return new NamedArgumentValue(this.name, this.value);
    }
    for (var i = 0; i < this.referenceFunction.operands.length; i++) {
      if (this.referenceFunction.operands[i] instanceof NamedArgument) {
        if (this.name === this.referenceFunction.operands[i].getName()) {
          return new NamedArgumentValue(this.name, Value.lift(arguments[i]));
        }
      }
    }
    return new NamedArgumentValue(this.name, this.value);
  }

  toString() {
    return "$" + this.name;
  }

  getArity() {
    return 0;
  }

  getName() {
    return this.name;
  }
}
/**
 * A named argument value.
 * @extends Value
 */
class NamedArgumentValue extends Value {
  constructor(name, v) {
    super();
    this.value = v;
    this.name = name;
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = CompoundDesignator.create(d.tail(), new FunctionNamedArgument(this.name, this.value));
    var n = factory.getObjectNode(new_d, this.value);
    var sub_leaves = this.value.query(q, d, n, factory);
    leaves.push(...sub_leaves);
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.getValue().toString();
  }
}

/**
 * Designates the argument passed to a function by referring to it
 * by its name.
 * @extends Designator
 */
class FunctionNamedArgument extends Designator {
  /**
     * Creates a new named argument.
     * @param name The name of the argument
     * @param v The value of the argument
     */
  constructor(name, v) {
    super();
    this.name = name;
    this.value = v;
  }

  appliesTo(o) {
    return o instanceof Function;
  }

  head() {
    return this;
  }

  tail() {
    return null;
  }

  toString() {
    return "$" + this.name + "/" + this.value;
  }
}

/**
 * A function that acts as an argument to a composed function.
 * @extends AbstractFunction
 */
class Argument extends AbstractFunction {
  /**
     * Creates a new instance of the function.
     * @param index The position of the argument in the composed
     * function
     */
  constructor(index) {
    super();
    this.index = index;
  }

  /* @Override */
  set(name, value) {
    return this;
  }

  evaluate() {
    var v = Value.lift(arguments[this.index]);
    return new ArgumentValue(this, v, this.index);
  }

  toString() {
    return "@" + this.index;
  }
}

/**
 * A value that corresponds to an argument passed to a composed function.
 * @extends Value
 */
class ArgumentValue extends Value {
  /**
     * Creates a new argument value.
     * @param f The function to which this value is an argument
     * @param v The value
     * @param index The position of the value in the arguments of the
     * function
     */
  constructor(f, v, index) {
    super();
    this.value = v;
    this.index = index;
    this.referenceFunction = f;
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = CompoundDesignator.create(d.tail(), new InputArgument(this.index, this.value));
    var n = factory.getObjectNode(new_d, this.value);
    var sub_leaves = this.value.query(q, d, n, factory);
    leaves.push(...sub_leaves);
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }
}

/**
 * Package exports
 */
export {
  Argument,
  ArgumentValue,
  ComposedFunction,
  ComposedFunctionValue,
  FunctionNamedArgument,
  NamedArgument,
  NamedArgumentValue
};
