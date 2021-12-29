import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../ui/input';
import { resendActivationToken } from '../../components/resend_token/actions';

import { tokenPane, closeBtn, tokenPaneMsg } from './styles.module.scss';
import * as cmpStyle from '../../pages/login/styles.module.scss';

import { t } from '../../../i18n/translate';

function TokenPane({ setOpen }) {
  const dispatch = useDispatch();
  const { result, error } = useSelector((state) => state?.tokenRequest);
  const [userMail, setUserMail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!userMail) return;

    const payload = {
      email: userMail,
    };

    dispatch(resendActivationToken(payload));
  };

  return (
    <div className={tokenPane}>
      <span onClick={() => setOpen(false)} className={closeBtn}>
        X
      </span>
      <Input
        type="email"
        onChange={(e) => setUserMail(e.target.value)}
        value={userMail}
        placeholder="Your email"
        className={cmpStyle.inputField}
        labelClassName={cmpStyle.label}
      />

      <button type="submit" onClick={onSubmit} className={cmpStyle.signinBtn}>
        {t('resendTokenLabel')}
      </button>

      {result && result?.message && (
        <span className={tokenPaneMsg}>{t('resendTokenMsg')}</span>
      )}
      {error && error?.data && (
        <span className={tokenPaneMsg}>{error.data.message}</span>
      )}
    </div>
  );
}

export default TokenPane;
