import "core-js/modules/es6.function.name";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';

var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color;
  return {
    button: {
      padding: 0,
      fontSize: fontSize.base,
      fontFamily: fontFamily.base,
      textDecoration: 'underline',
      color: color.light,
      border: 0,
      cursor: 'pointer',
      background: 'transparent',
      '&:hover, &:active': {
        isolate: false,
        color: color.lightest
      }
    }
  };
};

export var ExamplePlaceholderRenderer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ExamplePlaceholderRenderer, _Component);

  function ExamplePlaceholderRenderer() {
    var _this;

    _this = _Component.call(this) || this;
    _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isVisible: false
    };
    return _this;
  }

  var _proto = ExamplePlaceholderRenderer.prototype;

  _proto.handleOpen = function handleOpen() {
    this.setState({
      isVisible: true
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        classes = _this$props.classes,
        name = _this$props.name;
    var isVisible = this.state.isVisible;

    if (isVisible) {
      return React.createElement(Markdown, {
        text: "\nCreate **Readme.md** or **" + name + ".md** file in the component\u2019s folder like this:\n\n    " + name + " example:\n\n    ```js\n    <" + name + " pizza=\"\uD83C\uDF55\" />\n\t```\n\nYou may need to **restart** the style guide server after adding an example file.\n\nRead more in the [documenting components guide](" + DOCS_DOCUMENTING + ").\n\t\t\t\t\t"
      });
    }

    return React.createElement("button", {
      className: classes.button,
      onClick: this.handleOpen
    }, "Add examples to this component");
  };

  return ExamplePlaceholderRenderer;
}(Component);

_defineProperty(ExamplePlaceholderRenderer, "propTypes", {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
});

export default Styled(styles)(ExamplePlaceholderRenderer);