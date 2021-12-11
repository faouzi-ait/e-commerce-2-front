import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TokenPane from '../../components/resend_token';
import { THEMES } from '../../components/toggles/constants';
import { t } from '../../../i18n/translate';

import { selectedTheme } from '../../components/toggles/selectors';
import { loginStatus } from './selector';
import { login_user_action } from './actions';

import { loginForm } from './styles.module.scss';

function Login() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isDark } = useSelector(selectedTheme);
  const { authenticating, loggedIn, errors } = useSelector(loginStatus);

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

    if (!username || !password) return;

    const payload = {
      email: username,
      password,
    };

    dispatch(login_user_action(payload));
    setPassword('');
    setUsername('');
  };

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {activationLandingScreen(window.location.search)}
      <div className={loginForm}>
        <form onSubmit={onSubmit}>
          <div>
            <label>{t('username')}:</label>
            <input
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label>{t('password')}:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {!loggedIn && (
            <button type="submit" disabled={authenticating ? true : false}>
              {authenticating ? 'Logging in...' : 'Login'}
            </button>
          )}
          <span
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: 'pointer', userSelect: 'none' }}>
            {t('loginToken')}
          </span>
          {isOpen && <TokenPane setOpen={setIsOpen} />}
          <span>
            {errors &&
              errors.data &&
              errors.data.message &&
              errors.data.message}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
