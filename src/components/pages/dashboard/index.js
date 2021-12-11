import React from 'react';
import { useSelector } from 'react-redux';
import { THEMES } from '../../ui/toggles/constants';
// import { t } from '../../../i18n/translate';

import { userProfile } from './selector';
import { selectedTheme } from '../../ui/toggles/selectors';
import {} from './styles.module.scss';

function Dashboard() {
  const { isDark } = useSelector(selectedTheme);
  const { profile } = useSelector(userProfile);

  console.log(profile);

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {/* {t('greeting')} */}
      dashboard
    </div>
  );
}
export default Dashboard;
