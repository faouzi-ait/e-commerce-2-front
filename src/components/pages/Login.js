import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TokenPane from '../ui/TokenPane';
import { THEMES } from '../../redux/types';
import { t } from '../../i18n/translate';

import { selectedTheme } from '../../redux/selectors';

import { login_user_action } from '../../redux/actions/login';

// import '../../sass/index.scss';

function Login() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isDark } = useSelector(selectedTheme);
  const { authenticating, loggedIn, errors } = useSelector(
    (state) => state.login
  );

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
      <div className="loginForm">
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
            <button type="submit">
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
