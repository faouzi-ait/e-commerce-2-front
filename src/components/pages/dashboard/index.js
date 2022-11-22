import React from 'react';
// import { useSelector } from 'react-redux';
// import jwt_decode from 'jwt-decode';

import Page from '../../../components/components/container';
// import { t } from '../../../i18n/translate';

// import { userProfile } from './selector';
import {} from './styles.module.scss';

function Dashboard() {
  // const { profile } = useSelector(userProfile);

  // console.log(profile);

  // export function* decodeUserProfile() {
  //   const user = localStorage.getItem('ACCESS_TOKEN');

  //   if (user) {
  //     const token = JSON.parse(user);
  //     const profile = jwt_decode(token);
  //     yield put(
  //       actions.updateUserInfoAction({
  //         profile,
  //         isLoaded: true,
  //       })
  //     );
  //   } else {
  //     yield put(
  //       actions.updateUserInfoAction({
  //         isLoaded: true,
  //       })
  //     );
  //   }
  // }

  return (
    <Page>
      {/* {t('greeting')} */}
      dashboard
    </Page>
  );
}
export default Dashboard;
