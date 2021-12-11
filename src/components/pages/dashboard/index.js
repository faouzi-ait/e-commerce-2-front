import React from 'react';
import { useSelector } from 'react-redux';
// import { t } from '../../../i18n/translate';

import { selectedTheme } from '../../components/toggles/selectors';
import { THEMES } from '../../components/toggles/constants';
import { userProfile } from './selector';
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
