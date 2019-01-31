import "core-js/modules/es6.string.small";
import "core-js/modules/es6.object.assign";
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';
import prismTheme from '../../../styles/prismTheme';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily,
      borderRadius = _ref.borderRadius;
  return {
    pre: Object.assign({
      fontFamily: fontFamily.monospace,
      fontSize: fontSize.small,
      lineHeight: 1.5,
      color: color.base,
      whiteSpace: 'pre-wrap',
      wordWrap: 'normal',
      tabSize: 2,
      hyphens: 'none',
      backgroundColor: color.codeBackground,
      padding: [[space[1], space[2]]],
      border: [[1, color.codeBackground, 'solid']],
      borderRadius: borderRadius,
      marginTop: 0,
      marginBottom: space[2]
    }, prismTheme({
      color: color
    }))
  };
};

export function PreRenderer(_ref2) {
  var classes = _ref2.classes,
      className = _ref2.className,
      children = _ref2.children;
  var classNames = cx(className, classes.pre);
  var isHighlighted = className && className.indexOf('lang-') !== -1;

  if (isHighlighted) {
    return React.createElement("pre", {
      className: classNames,
      dangerouslySetInnerHTML: {
        __html: children
      }
    });
  }

  return React.createElement("pre", {
    className: classNames
  }, children);
}
PreRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(PreRenderer);