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

// DataTree for tree management
import dataTree from "data-tree";
// Local imports
import { All, CompoundDesignator, Designator, Nothing, Unknown } from "./modules/designator.mjs";
import { AbstractFunction, ConstantFunction, InputArgument, ReturnValue } from "./modules/function.mjs";
import { ConstantDesignator, ConstantValue, NaryValue, Value } from "./modules/value.mjs";
import { AtomicFunction, AtomicFunctionReturnValue, Identity } from "./modules/atomic-function.mjs";
import { BooleanAnd, BooleanOr, BooleanNot, NaryConjunctiveVerdict, NaryDisjunctiveVerdict } from "./modules/booleans.mjs";
import { AndNode, Explainer, DesignatedObject, ObjectNode, OrNode, Tracer, UnknownNode } from "./modules/tracer.mjs";
import { Addition, Subtraction, Division, GreaterOrEqual, LesserOrEqual, GreaterThan, LesserThan, Multiplication, IsEqualTo } from "./modules/numbers.mjs";
import { Enumerate, EnumeratedValue, NthItem } from "./modules/enumerate.mjs";
import { Argument, ArgumentValue, ComposedFunction, ComposedFunctionValue, FunctionNamedArgument, NamedArgument, NamedArgumentValue } from "./modules/composed-function.mjs";
import { ExistentialQuantifier, Quantifier, QuantifierConjunctiveVerdict, QuantifierDisjunctiveVerdict, QuantifierVerdict, UniversalQuantifier } from "./modules/quantifier.mjs";
import { BackgroundColor, BackgroundImage, BorderColor, BorderRadius, BorderStyle, BorderWidth, ClientOffsetTop, ClientOffsetLeft, Color, CssPropertyFunction, CssRecursivePropertyFunction, CurrentNode, DimensionHeight, DimensionWidth, Display, ElementAttribute, ElementAttributeValue, FindBySelector, Float, FontFamily, FontSize, FontWeight, MarginTop, MarginBottom, MarginLeft, MarginRight, NodeWrapper, Opacity, PageOffsetTop, PageOffsetLeft, Path, PathValue, PaddingTop, PaddingBottom, PaddingLeft, PaddingRight, Position, RegisterBySelector, Visibility, WebElementFunction, Zindex } from "./modules/web-element.mjs";
import { TestCondition, TestDriver, TestResult, Verdict } from "./modules/verdict.mjs";
import { isHtmlElement } from "./modules/util.mjs";
import { Serialization } from "./modules/serialization.mjs";
import { And, Current, Equals, Exists, Find, ForAll, Height, Implies, IsGreaterOrEqual, IsGreaterThan, IsLessOrEqual, IsLessThan, Minus, Not, Or, Plus, Register, Width } from './modules/syntax.mjs'


/**
 * Evaluates a set of conditions on a DOM tree
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A list of {@link Function}, each corresponding to a
 * Boolean condition to evaluate on the page.
 * @return An array of data trees corresponding to the explanation for
 * each condition that evaluates to <tt>false</tt>.
 */
function evaluateDom(root, conditions = []) {
    var verdicts = [];
    for (var i = 0; i < conditions.length; i++) {
        var verdict = getVerdict(root, conditions[i]);
        if (verdict != null) {
            verdicts.push(verdict);
        }
    }
    return verdicts;

}

/**
 * Evaluates a single condition on a DOM tree. <strong>This is a stub for
 * testing purposes.</strong>
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A {@link Function} that corresponds to a
 * Boolean condition to evaluate on the page.
 * @return A data tree explaining the violation of the condition if it
 * evaluates to <tt>false</tt>, and <tt>null</tt> if the condition is fulfilled.
 */
function getVerdict(root, condition) {
    if (root === null) {
        return null;
    }
    const returnValue = condition.evaluate(root);
    if (returnValue.value === true) {
        return null;
    }
    const verdict = new Verdict(returnValue, condition)
    const witness = verdict.getWitness();
    const trees = getTreeFromWitness(witness)
    return trees
}

function getTreeFromWitness(witnesses = []) {
    const tree = dataTree.create();
    for (const designatedObject of witnesses) {
        const part = [];
        let subject = null;
        let elementAttribute = null;
        let lastPartType;
        // First form
        if (isHtmlElement(designatedObject.getObject())) {
            const elements = designatedObject.getDesignator().elements;
            subject = elements[elements.length - 2].toString() || null;
            elementAttribute = elements[elements.length - 3].toString() || null;
            lastPartType = "Path";
        }
        // Second form
        else {
            subject = designatedObject.getObject();
            lastPartType = "ConstantDesignator";
        }
        // Build the leaf's "part"
        for (const element of designatedObject.getDesignator().elements) {
            if (element.constructor.name === lastPartType) {
                break;
            }
            part.push(element.toString());
        }
        tree.insert({
            elementAttribute,
            part,
            subject
        });
    }
    return tree;
}

function serializeArray(array) {
    var res = [];
    var s = new Serialization();
    for(let i=0; i<array.length; i++ ) {
        res.push(s.serialize(array[i]));
    }
    return res;
}

function deserializeArray(array) {
    var res = [];
    var s = new Serialization();
    for(let i=0; i<array.length; i++) {
        res.push(s.deserialize(array[i]));
    }
    return res;
}

/**
 * Export public API
 */
export {
    getVerdict,
    evaluateDom,
    getTreeFromWitness,
    serializeArray,
    deserializeArray,
    AbstractFunction,
    Addition,
    All,
    And,
    AndNode,
    Argument,
    ArgumentValue,
    AtomicFunction,
    AtomicFunctionReturnValue,
    BackgroundColor,
    BackgroundImage,
    BooleanAnd,
    BooleanNot,
    BooleanOr,
    BorderColor,
    BorderRadius,
    BorderStyle,
    BorderWidth,
    ClientOffsetTop,
    ClientOffsetLeft,
    CssPropertyFunction,
    CssRecursivePropertyFunction,
    Color,
    ComposedFunction,
    ComposedFunctionValue,
    CompoundDesignator,
    ConstantFunction,
    ConstantDesignator,
    ConstantValue,
    Current,
    CurrentNode,
    Designator,
    DesignatedObject,
    DimensionHeight,
    DimensionWidth,
    Display,
    Division,
    ElementAttribute,
    ElementAttributeValue,
    Enumerate,
    EnumeratedValue,
    Equals,
    ExistentialQuantifier,
    Exists,
    Explainer,
    Find,
    FindBySelector,
    Float,
    FontFamily,
    FontSize,
    FontWeight,
    ForAll,
    FunctionNamedArgument,
    GreaterOrEqual,
    GreaterThan,
    Height,
    Identity,
    Implies,
    InputArgument,
    IsEqualTo,
    IsGreaterOrEqual,
    IsGreaterThan,
    IsLessOrEqual,
    IsLessThan,
    LesserThan,
    LesserOrEqual,
    MarginTop,
    MarginBottom,
    MarginLeft,
    MarginRight,
    Minus,
    Multiplication,
    NamedArgument,
    NamedArgumentValue,
    NaryConjunctiveVerdict,
    NaryDisjunctiveVerdict,
    NaryValue,
    NthItem,
    NodeWrapper,
    Not,
    Nothing,
    ObjectNode,
    Opacity,
    Or,
    OrNode,
    PageOffsetTop,
    PageOffsetLeft,
    Path,
    PathValue,
    PaddingTop,
    PaddingBottom,
    PaddingRight,
    PaddingLeft,
    Plus,
    Position,
    Quantifier,
    QuantifierConjunctiveVerdict,
    QuantifierDisjunctiveVerdict,
    QuantifierVerdict,
    Register,
    RegisterBySelector,
    ReturnValue,
    Serialization,
    Subtraction,
    TestCondition,
    TestDriver,
    TestResult,
    Tracer,
    UniversalQuantifier,
    Unknown,
    UnknownNode,
    Value,
    Verdict,
    Visibility,
    WebElementFunction,
    Width,
    Zindex
};

// :wrap=soft:tabSize=2: