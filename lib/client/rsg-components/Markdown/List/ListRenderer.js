import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontFamily = _ref.fontFamily;
  return {
    list: {
      marginTop: 0,
      marginBottom: space[2],
      paddingLeft: space[3],
      fontSize: 'inherit'
    },
    ordered: {
      listStyleType: 'decimal'
    },
    li: {
      color: color.base,
      fontFamily: fontFamily.base,
      fontSize: 'inherit',
      lineHeight: 1.5,
      listStyleType: 'inherit'
    }
  };
};

export function ListRenderer(_ref2) {
  var classes = _ref2.classes,
      ordered = _ref2.ordered,
      children = _ref2.children;
  var Tag = ordered ? 'ol' : 'ul';
  var classNames = cx(classes.list, ordered && classes.ordered);
  return React.createElement(Tag, {
    className: classNames
  }, Children.map(children, function (li) {
    return cloneElement(li, {
      className: classes.li
    });
  }));
}
ListRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  ordered: PropTypes.bool,
  children: PropTypes.node.isRequired
};
ListRenderer.defaultProps = {
  ordered: false
};
export default Styled(styles)(ListRenderer);