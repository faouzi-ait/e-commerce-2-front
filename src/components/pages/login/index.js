import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import Footer from '../../components/footer';
import Page from '../../../components/components/container';

import TokenPane from '../../components/resend_token';
import PasswordReset from '../../components/password-reset';
import Input from '../../ui/input';

import * as utils from '../../../utils';

import { t } from '../../../i18n/translate';
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

  const onSubmit = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  return (
    <Page>
      <h1 className={cmpStyle.loginTitle}>
        {utils.activationLandingScreen(search)}
      </h1>
      <main className={cmpStyle.loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
          <p
            tabIndex={0}
            aria-label="account creation page"
            className={cmpStyle.pageTitle}
          >
            {t('signIn')}
          </p>
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
                errorMsgId="emailError"
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
                ariaLabelRequired
                autoFocus
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
                errorMsgId="passwordError"
                aria-invalid={!!formState.errors.password}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(formState?.errors?.password)}
                errorMessage={
                  formState.errors?.password ? t('passwordError') : ''
                }
                placeholder="Please enter your password"
                ariaLabelRequired
              />
            )}
          />

          <button
            type="submit"
            className={cmpStyle.signinBtn}
            aria-label="click here to login"
            // disabled={authenticating ? true : false}
          >
            {/* {t('signIn')} */}
            {authenticating ? t('signingIn') : t('signIn')}
          </button>

          <a
            role="button"
            href="/register"
            className={`${cmpStyle.signinBtn} ${cmpStyle.register}`}
            aria-label="click or press here to create a new account"
          >
            {t('register')}
          </a>

          <button
            type="button"
            className={cmpStyle.activate}
            aria-label="click or press here to open the renew token window"
            onClick={() => setIsOpen(!isOpen)}
          >
            {t('loginToken')}
          </button>

          <button
            type="button"
            aria-label="click or press here to reset your password"
            className={cmpStyle.activate}
            onClick={() => setIsResetOpen(!isResetOpen)}
          >
            Forgot password?
          </button>

          <span role="alert">{errors && errors?.data?.message}</span>
        </form>

        {isResetOpen && <PasswordReset setOpen={setIsResetOpen} />}
        {isOpen && <TokenPane setOpen={setIsOpen} />}
      </main>
      <Footer />
    </Page>
  );
}

export default Login;
