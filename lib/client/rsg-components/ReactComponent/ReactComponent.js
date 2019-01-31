import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import SectionHeading from 'rsg-components/SectionHeading';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Slot from 'rsg-components/Slot';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes, UsageModes } from '../../consts';
var ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production' ? require('rsg-components/ExamplePlaceholder').default : function () {
  return React.createElement("div", null);
};

var ReactComponent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ReactComponent, _Component);

  function ReactComponent(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    var usageMode = props.usageMode;
    _this.handleTabChange = _this.handleTabChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      activeTab: usageMode === UsageModes.expand ? DOCS_TAB_USAGE : undefined
    };
    return _this;
  }

  var _proto = ReactComponent.prototype;

  _proto.handleTabChange = function handleTabChange(name) {
    this.setState(function (state) {
      return {
        activeTab: state.activeTab !== name ? name : undefined
      };
    });
  };

  _proto.render = function render() {
    var activeTab = this.state.activeTab;
    var _this$context = this.context,
        displayMode = _this$context.displayMode,
        pagePerSection = _this$context.config.pagePerSection;
    var _this$props = this.props,
        component = _this$props.component,
        depth = _this$props.depth,
        usageMode = _this$props.usageMode,
        exampleMode = _this$props.exampleMode;
    var name = component.name,
        visibleName = component.visibleName,
        slug = component.slug,
        filepath = component.filepath,
        pathLine = component.pathLine;
    var _component$props = component.props,
        description = _component$props.description,
        _component$props$exam = _component$props.examples,
        examples = _component$props$exam === void 0 ? [] : _component$props$exam,
        _component$props$tags = _component$props.tags,
        tags = _component$props$tags === void 0 ? {} : _component$props$tags;

    if (!name) {
      return null;
    }

    var showUsage = usageMode !== UsageModes.hide;
    return React.createElement(ReactComponentRenderer, {
      name: name,
      slug: slug,
      filepath: filepath,
      pathLine: pathLine,
      docs: React.createElement(JsDoc, tags),
      description: description && React.createElement(Markdown, {
        text: description
      }),
      heading: React.createElement(SectionHeading, {
        id: slug,
        pagePerSection: pagePerSection,
        deprecated: !!tags.deprecated,
        slotName: "componentToolbar",
        slotProps: Object.assign({}, component, {
          isolated: displayMode !== DisplayModes.all
        }),
        depth: depth
      }, visibleName),
      examples: examples.length > 0 ? React.createElement(Examples, {
        examples: examples,
        name: name,
        exampleMode: exampleMode
      }) : React.createElement(ExamplePlaceholder, {
        name: name
      }),
      tabButtons: showUsage && React.createElement(Slot, {
        name: "docsTabButtons",
        active: activeTab,
        props: Object.assign({}, component, {
          onClick: this.handleTabChange
        })
      }),
      tabBody: React.createElement(Slot, {
        name: "docsTabs",
        active: activeTab,
        onlyActive: true,
        props: component
      })
    });
  };

  return ReactComponent;
}(Component);

_defineProperty(ReactComponent, "propTypes", {
  component: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired
});

_defineProperty(ReactComponent, "contextTypes", {
  config: PropTypes.object.isRequired,
  displayMode: PropTypes.string
});

export { ReactComponent as default };