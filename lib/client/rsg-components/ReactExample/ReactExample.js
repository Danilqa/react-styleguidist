function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-async';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import splitExampleCode from '../../utils/splitExampleCode';
import transpileImports from '../../utils/transpileImports';
/* eslint-disable react/no-multi-comp */
// Wrap everything in a React component to leverage the state management
// of this component

var StateHolder =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(StateHolder, _Component);

  function StateHolder() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", _this.props.initialState);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateBinded", _this.setState.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  }

  var _proto = StateHolder.prototype;

  _proto.render = function render() {
    // Return null when component doesn't render anything to avoid an error
    return this.props.component(this.state, this.setStateBinded) || null;
  };

  return StateHolder;
}(Component);

_defineProperty(StateHolder, "propTypes", {
  component: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired
});

var ReactExample =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(ReactExample, _Component2);

  function ReactExample() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = ReactExample.prototype;

  _proto2.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.code !== nextProps.code;
  } // Eval the code to extract the value of the initial state
  ;

  _proto2.getExampleInitialState = function getExampleInitialState(compiledCode) {
    if (compiledCode.indexOf('initialState') === -1) {
      return {};
    }

    return this.props.evalInContext("\n\t\t\tvar state = {}, initialState = {};\n\t\t\ttry {\n\t\t\t\t" + compiledCode + ";\n\t\t\t} catch (err) {}\n\t\t\treturn initialState;\n\t\t")();
  } // Run example code and return the last top-level expression
  ;

  _proto2.getExampleComponent = function getExampleComponent(compiledCode) {
    return this.props.evalInContext("\n\t\t\tvar initialState = {};\n\t\t\t" + compiledCode + "\n\t\t");
  };

  _proto2.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        code = _this$props.code,
        compilerConfig = _this$props.compilerConfig,
        onError = _this$props.onError;
    var promiseFn = compileCode(code, compilerConfig, onError);
    return React.createElement(Wrapper, {
      onError: onError
    }, React.createElement(Async, {
      promiseFn: promiseFn
    }, function (_ref) {
      var data = _ref.data,
          isLoading = _ref.isLoading;

      if (isLoading) {
        return 'Loading.....';
      }

      var compiledCode = transpileImports(data);

      if (!compiledCode) {
        return null;
      }

      var _splitExampleCode = splitExampleCode(compiledCode),
          head = _splitExampleCode.head,
          example = _splitExampleCode.example;

      var initialState = _this2.getExampleInitialState(head);

      var exampleComponent = _this2.getExampleComponent(example);

      return React.createElement(StateHolder, {
        component: exampleComponent,
        initialState: initialState
      });
    }));
  };

  return ReactExample;
}(Component);

_defineProperty(ReactExample, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  compilerConfig: PropTypes.object
});

_defineProperty(ReactExample, "contextTypes", {});

export { ReactExample as default };