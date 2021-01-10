import React from 'react';

import { useSelector } from 'react-redux';
import { selectedTheme } from '../../ui/toggles/selectors';
import { THEMES } from '../../ui/toggles/constants';
// import { t } from '../../i18n/translate';

import ToggleButtons from '../toggles';

import { header, toggleBtn } from './styles.module.scss';

function Header() {
  const { isDark } = useSelector(selectedTheme);

  return (
    <div
      className={`baseTheme ${header} ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      <span className={toggleBtn}>
        <ToggleButtons />
      </span>
    </div>
  );
}

export default Header;
