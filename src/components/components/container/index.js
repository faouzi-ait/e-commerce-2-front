import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { THEMES } from '../../components/toggles/constants';
import { selectedTheme } from '../../components/toggles/selectors';

function Page({ children, style }) {
  const { isDark } = useSelector(selectedTheme);
  const styles = (style) =>
    `baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT} ${style}`;

  return <div className={styles(style)}>{children}</div>;
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]),
};

Page.defaultProps = {
  children: [],
};

export default Page;
