import React from 'react';
import { useSelector } from 'react-redux';
import Page from '../../../components/components/container';
// import { t } from '../../../i18n/translate';

import { userProfile } from './selector';
import {} from './styles.module.scss';

function Dashboard() {
  const { profile } = useSelector(userProfile);

  console.log(profile);

  return (
    <Page>
      {/* {t('greeting')} */}
      dashboard
    </Page>
  );
}
export default Dashboard;
