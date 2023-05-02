import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import Footer from '../../components/footer';
import Page from '../../../components/components/container';

import TokenPane from '../../components/resend_token';
import PasswordReset from '../../components/password-reset';
import { t } from '../../../i18n/translate';
import Input from '../../ui/input';

import * as utils from '../../../utils';

import { login, fromPaymentLink, resetError } from './actions';
import { loginStatus } from './selector';

import * as cmpStyle from './styles.module.scss';

function Login() {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [isOpen, setIsOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const { authenticating, errors } = useSelector(loginStatus);

  const { handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
    defaultValues: utils.defaultValues,
  });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    const param = new URLSearchParams(search).get('redirect');

    if (param === 'payment') {
      dispatch(fromPaymentLink(true));
    } else {
      dispatch(fromPaymentLink(false));
    }
  }, [dispatch, search]);

  const onSubmit = ({ email, password }) =>
    dispatch(login({ email, password }));

  return (
    <Page>
      <h1 className={cmpStyle.loginTitle}>
        {utils.activationLandingScreen(search)}
      </h1>
      <div className={cmpStyle.loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
          <p className={cmpStyle.h3}>{t('signIn')}</p>
          <Controller
            name="email"
            control={control}
            rules={utils.emailFormPattern}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('login')}
                type="email"
                name="email"
                aria-invalid={!!formState.errors?.email}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(formState?.errors?.email)}
                errorMessage={
                  formState?.errors?.email
                    ? formState?.errors?.email.message
                    : ''
                }
                placeholder="your-email@somewhere.com"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                type="password"
                name="password"
                label="Password"
                aria-invalid={!!formState.errors.password}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(formState?.errors?.password)}
                errorMessage={
                  formState.errors?.password ? t('passwordError') : ''
                }
                placeholder="Please enter your password"
              />
            )}
          />

          <button
            type="submit"
            disabled={authenticating ? true : false}
            className={cmpStyle.signinBtn}>
            {authenticating ? t('signingIn') : t('signIn')}
          </button>

          <Link
            to="/register"
            className={`${cmpStyle.signinBtn} ${cmpStyle.register}`}>
            {t('register')}
          </Link>

          <div onClick={() => setIsOpen(!isOpen)} className={cmpStyle.activate}>
            {t('loginToken')}
          </div>

          <div
            onClick={() => setIsResetOpen(!isResetOpen)}
            className={cmpStyle.activate}
            disabled={!formState.isValid}>
            Forgot password?
          </div>

          <span>{errors && errors?.data?.message}</span>
        </form>
        {isOpen && <TokenPane setOpen={setIsOpen} />}
        {isResetOpen && <PasswordReset setOpen={setIsResetOpen} />}
      </div>
      <Footer />
    </Page>
  );
}

export default Login;
