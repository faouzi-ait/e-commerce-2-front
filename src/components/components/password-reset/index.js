import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import Input from '../../ui/input';
import { forgotPasswordToken } from '../../components/password-reset/actions';

import * as utils from '../../../utils';

import { tokenPane, closeBtn, tokenPaneMsg } from './styles.module.scss';
import * as styles from '../../pages/login/styles.module.scss';

function TokenPane({ setOpen }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  const { result, error } = useSelector((state) => state?.forgotPassword);

  const onSubmit = ({ email }) => dispatch(forgotPasswordToken({ email }));

  return (
    <div className={tokenPane}>
      <span onClick={() => setOpen(false)} className={closeBtn}>
        X
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={utils.emailFormPattern}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label=""
              type="email"
              name="email"
              aria-invalid={!!errors?.email}
              className={styles.inputField}
              labelClassName={styles.label}
              style={utils.setErrorStyle(errors?.email)}
              errorMessage={errors?.email ? errors?.email.message : ''}
              placeholder="your-email@somewhere.com"
              isContrast
            />
          )}
        />

        <button type="submit" className={styles.signinBtn} disabled={!isValid}>
          {isSubmitting ? 'Reseting Password...' : 'Reset Password'}
        </button>
      </form>

      {result && result?.message && (
        <span className={tokenPaneMsg} style={{ padding: '6px 50px' }}>
          Please use the link in your inbox to reset your password
        </span>
      )}
      {error && error?.data && (
        <span className={tokenPaneMsg}>{error.data.message}</span>
      )}
    </div>
  );
}

export default TokenPane;
