import React from 'react';
import { useSelector } from 'react-redux';
import { THEMES } from '../../ui/toggles/constants';
import { t } from '../../../i18n/translate';

import { selectedTheme } from '../../ui/toggles/selectors';
import {} from './styles.module.scss';

function Home() {
  const { isDark } = useSelector(selectedTheme);

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {t('greeting')}, {t('home')}
    </div>
  );
}

export default Home;
