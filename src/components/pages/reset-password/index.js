import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import Page from '../../../components/components/container';
import Footer from '../../components/footer';
import Input from '../../ui/input';

import { resetPassword } from '../../../api/apiCalls';

import * as utils from '../../../utils';
import { t } from '../../../i18n/translate';

import * as cmpStyle from '../login/styles.module.scss';
import * as styles from './styles.module.scss';

const PasswordReset = () => {
  const params = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: utils.resetPasswordDefaultValues,
  });

  const confirmPassword = watch('confirmPassword') 
  const password = watch('password')

  const onSubmit = async ({ password, confirmPassword }) => {

    const { status, error } = await resetPassword(params?.token, {
      password,
      confirmPassword,
    });

    if (status === 201) setSuccess('Password successfully changed');
    if (error) setError(error.response.data.message);

    setTimeout(() => resetResponseMessage(), 2500);
  };

  const resetResponseMessage = () => {
    setSuccess('');
    setError('');
  };

  return (
    <Page>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1 style={{ marginBottom: '5rem' }}>Reset your password</h1>

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                type="password"
                name="password"
                label="Password"
                aria-invalid={!!errors.password}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(errors?.password)}
                errorMessage={errors?.password ? errors?.password?.message : ''}
                placeholder="Please enter your password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                aria-invalid={!!errors.confirmPassword}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(errors?.confirmPassword)}
                errorMessage={errors?.confirmPassword ? t('passwordError') : ''}
                placeholder="Please confirm your password"
              />
            )}
          />

          {watch('confirmPassword') !== watch('password') &&
            getValues('confirmPassword') && (
              <p className={styles.confirmPassword}>Passwords not match</p>
            )}

          <button
            type="submit"
            className={cmpStyle.signinBtn}
            disabled={!isValid || confirmPassword !== password}>
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </button>

          {success && <h4>{success}</h4>}
          {error && <h4 style={{ color: 'red' }}>{error}</h4>}
        </form>
      </div>
      <Footer />
    </Page>
  );
};

export default PasswordReset;
