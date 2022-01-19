import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TokenPane from '../../components/resend_token';
import Footer from '../../components/footer';
import Page from '../../../components/components/container';

import Input from '../../ui/input';
import { t } from '../../../i18n/translate';

import { registration } from './selector';
import { register } from './actions';

import * as cmpStyle from '../login/styles.module.scss';
import { loginForm, backToLogin } from './styles.module.scss';

function Register() {
  const { user, errors, registering } = useSelector(registration);
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [surname, setSurname] = useState('');
  const [photo, setPhoto] = useState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    const data = new FormData();
    e.preventDefault();

    if (!name || !password || !surname || !email) {
      alert('Please fill in the form');
      return;
    }

    data.append('name', name);
    data.append('age', age);
    data.append('surname', surname);
    data.append('email', email);
    data.append('password', password);

    if (photo) {
      data.append('image', photo);
    }

    dispatch(register(data));
  };

  return (
    <Page>
      <div className={loginForm}>
        <form onSubmit={onSubmit} className={cmpStyle.form}>
          <p className={cmpStyle.h3}>{t('registerTitle')}</p>

          <Input
            label={t('username')}
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Firstname"
          />

          <Input
            label={t('surname')}
            type="text"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Lastname"
          />

          <Input
            label={t('email')}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="unique-email@somewhere.com"
          />

          <Input
            label={t('age')}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="How old are you"
          />

          <Input
            label={t('password')}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Password"
          />

          <div>
            <label
              htmlFor="image"
              style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
              {t('picture')}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setPhoto(e.target.files[0])}
              value={undefined}
              className={cmpStyle.inputField}
            />
          </div>

          <button type="submit" className={cmpStyle.signinBtn}>
            {registering ? t('registering') : t('register')}
          </button>

          <Link to="/login" className={`${cmpStyle.activate} ${backToLogin}`}>
            {t('returnToLogin')}
          </Link>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`${cmpStyle.activate} ${backToLogin}`}>
            {t('loginToken')}
          </div>

          {isOpen && <TokenPane setOpen={setIsOpen} />}

          <div>
            {errors && errors?.data?.message}
            {user && user.message && t('registrationSucessful')}
          </div>
        </form>
      </div>
      <Footer />
    </Page>
  );
}

export default Register;
