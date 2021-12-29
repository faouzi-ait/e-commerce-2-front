import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

import { THEMES } from '../../components/toggles/constants';
import TokenPane from '../../components/resend_token';
import { t } from '../../../i18n/translate';
import Input from '../../ui/input';

import { selectedTheme } from '../../components/toggles/selectors';
import { loginStatus } from './selector';
import { login } from './actions';

import * as cmpStyle from './styles.module.scss';

function Login() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDark } = useSelector(selectedTheme);
  const { authenticating, /*loggedIn,*/ errors } = useSelector(loginStatus);

  const activationLandingScreen = (query) => {
    const queryString = query;
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status');

    switch (status) {
      case 'activated':
        return 'Your account is now activated';
      case 'expired':
        return 'Your activation token has expired, please renew your token and try again';
      case 'already_activated':
        return 'Your account is already active, please login to access your account';
      default:
        return '';
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    const payload = {
      email,
      password,
    };

    dispatch(login(payload));
    setPassword('');
    setEmail('');
  };

  return (
    <div className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {activationLandingScreen(window.location.search)}
      <div className={cmpStyle.loginForm}>
        <form onSubmit={onSubmit} className={cmpStyle.form}>
          <p className={cmpStyle.h3}>{t('signIn')}</p>
          <Input
            label={t('username')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="your-email@somewhere.com"
          />

          <Input
            label={t('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Password"
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

          {isOpen && <TokenPane setOpen={setIsOpen} />}
          <span>{errors && errors?.data?.message}</span>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
