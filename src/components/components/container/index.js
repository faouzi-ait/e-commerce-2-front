import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { THEMES } from '../../components/toggles/constants';
import { selectedTheme } from '../../components/toggles/selectors';

function Page({ children }) {
  const { isDark } = useSelector(selectedTheme);

  return (
    <div className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {children}
    </div>
  );
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
