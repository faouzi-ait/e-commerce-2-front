import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../ui/input';
import { THEMES } from '../../components/toggles/constants';
import { t } from '../../../i18n/translate';

import { selectedTheme } from '../../components/toggles/selectors';
import { register } from './actions';
import { registration } from './selector';

import { loginForm } from './styles.module.scss';

function Register() {
  const { user, errors, registering } = useSelector(registration);
  const { isDark } = useSelector(selectedTheme);
  const [password, setPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !password || !surname || !email) {
      alert('Please fill in the form');
      return;
    }

    dispatch(register({ name, age, surname, email, password }));
  };

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      <div className={loginForm}>
        <form onSubmit={onSubmit}>
          <Input
            label={t('username')}
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <Input
            label={t('surname')}
            type="text"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
          />

          <Input
            label={t('email')}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <Input
            label={t('age')}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />

          <Input
            label={t('password')}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button type="submit">
            {registering ? 'Registering...' : 'Register'}
          </button>

          <div>
            {errors && errors?.data?.message}
            {user &&
              user.message &&
              'Registration successful, please check your email to activate your account'}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
