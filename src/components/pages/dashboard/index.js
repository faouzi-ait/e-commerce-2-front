import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

import Page from '../../../components/components/container';
// import { t } from '../../../i18n/translate';

import { getUserDetails } from './actions';

import {} from './styles.module.scss';

function Dashboard() {
  const profile = useSelector((state) => state.tokens.tokens.token);
  const dispatch = useDispatch();

  console.log(profile);
  useEffect(() => {
    const { id } = jwt(profile);
    dispatch(getUserDetails(id));
  }, [dispatch, profile]);

  return (
    <Page>
      {/* {t('greeting')} */}
      dashboard
    </Page>
  );
}
export default Dashboard;
