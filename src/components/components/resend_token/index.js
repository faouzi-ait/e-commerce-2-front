import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import Input from '../../ui/input';
import { resendActivationToken } from '../../components/resend_token/actions';

import * as utils from '../../../utils';
import { t } from '../../../i18n/translate';

import { tokenPane, closeBtn, tokenPaneMsg } from './styles.module.scss';
import * as cmpStyle from '../../pages/login/styles.module.scss';

function TokenPane({ setOpen }) {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, getValues } = useForm({
    mode: 'onBlur',
  });

  const { result, error } = useSelector((state) => state?.tokenRequest);

  const onSubmit = () =>
    dispatch(resendActivationToken({ email: getValues().user }));

  return (
    <div className={tokenPane}>
      <span onClick={() => setOpen(false)} className={closeBtn}>
        X
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="user"
          control={control}
          rules={utils.emailFormPattern}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label=""
              type="email"
              name="user"
              aria-invalid={!!formState.errors?.user}
              className={cmpStyle.inputField}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(formState?.errors?.user)}
              errorMessage={
                formState?.errors?.user ? formState?.errors?.user.message : ''
              }
              placeholder="your-email@somewhere.com"
              isContrast
            />
          )}
        />

        <button type="submit" className={cmpStyle.signinBtn}>
          {t('resendTokenLabel')}
        </button>
      </form>

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
