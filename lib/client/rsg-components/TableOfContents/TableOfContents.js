import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import filterSectionsByName from '../../utils/filterSectionsByName';

var TableOfContents =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TableOfContents, _Component);

  function TableOfContents() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      searchTerm: ''
    });

    return _this;
  }

  var _proto = TableOfContents.prototype;

  _proto.renderLevel = function renderLevel(sections, useRouterLinks, hashPath, useHashId) {
    var _this2 = this;

    if (useRouterLinks === void 0) {
      useRouterLinks = false;
    }

    if (hashPath === void 0) {
      hashPath = [];
    }

    if (useHashId === void 0) {
      useHashId = false;
    }

    var items = sections.map(function (section) {
      var children = [].concat(section.sections || [], section.components || []);
      var sectionDepth = section.sectionDepth || 0;
      var childHashPath = sectionDepth === 0 && useHashId ? hashPath : [].concat(hashPath, [section.name]);
      return Object.assign({}, section, {
        heading: !!section.name && children.length > 0,
        content: children.length > 0 && _this2.renderLevel(children, useRouterLinks, childHashPath, sectionDepth === 0)
      });
    });
    return React.createElement(ComponentsList, {
      items: items,
      hashPath: hashPath,
      useHashId: useHashId,
      useRouterLinks: useRouterLinks
    });
  };

  _proto.renderSections = function renderSections() {
    var searchTerm = this.state.searchTerm;
    var _this$props = this.props,
        sections = _this$props.sections,
        useRouterLinks = _this$props.useRouterLinks; // If there is only one section, we treat it as a root section
    // In this case the name of the section won't be rendered and it won't get left padding

    var firstLevel = sections.length === 1 ? sections[0].components : sections;
    var filtered = filterSectionsByName(firstLevel, searchTerm);
    return this.renderLevel(filtered, useRouterLinks);
  };

  _proto.render = function render() {
    var _this3 = this;

    var searchTerm = this.state.searchTerm;
    return React.createElement(TableOfContentsRenderer, {
      searchTerm: searchTerm,
      onSearchTermChange: function onSearchTermChange(searchTerm) {
        return _this3.setState({
          searchTerm: searchTerm
        });
      }
    }, this.renderSections());
  };

  return TableOfContents;
}(Component);

_defineProperty(TableOfContents, "propTypes", {
  sections: PropTypes.array.isRequired,
  useRouterLinks: PropTypes.bool
});

export { TableOfContents as default };