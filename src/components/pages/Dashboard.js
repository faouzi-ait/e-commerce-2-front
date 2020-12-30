import React from 'react';
import { useSelector } from 'react-redux';
import { THEMES } from '../../redux/types';
// import { t } from '../../i18n/translate';

import { selectedTheme } from '../../redux/selectors';

function Dashboard() {
  const { user } = useSelector((state) => state.login);
  const { isDark } = useSelector(selectedTheme);

  console.log(user.profile);

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {/* {t('greeting')} */}
      dashboard
    </div>
  );
}
export default Dashboard;
