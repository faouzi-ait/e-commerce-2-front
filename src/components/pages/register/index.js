import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Page from '../../../components/components/container';
import TokenPane from '../../components/resend_token';
import Footer from '../../components/footer';

import Button from '../../ui/button';
import Input from '../../ui/input';

import { t } from '../../../i18n/translate';

import { registration } from './selector';
import { register } from './actions';

import { loginForm, backToLogin } from './styles.module.scss';
import * as cmpStyle from '../login/styles.module.scss';

import { buildFormDataObject } from '../../../utils';

function Register() {
  const dispatch = useDispatch();
  const { user, errors, registering } = useSelector(registration);
  const [formValues, setFormValues] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formValues?.email || !formValues?.password) {
      alert('Please fill in the form');
      return;
    }

    const data = buildFormDataObject(formValues);

    dispatch(register(data));
  };

  const handleFormValues = ({ target }) => {
    const { name, value, files } = target;
    setFormValues({ ...formValues, [name]: files ? files[0] : value });
  };

  return (
    <Page>
      <div className={loginForm}>
        <form onSubmit={onSubmit} className={cmpStyle.form}>
          <p className={cmpStyle.h3}>{t('registerTitle')}</p>

          <Input
            name="name"
            label={t('username')}
            type="text"
            onChange={handleFormValues}
            value={formValues?.name}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Firstname"
          />

          <Input
            name="surname"
            label={t('surname')}
            type="text"
            onChange={handleFormValues}
            value={formValues?.surname}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Lastname"
          />

          <Input
            name="email"
            label={t('email')}
            type="text"
            onChange={handleFormValues}
            value={formValues?.email}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="unique-email@somewhere.com"
          />

          <Input
            name="age"
            label={t('age')}
            type="number"
            onChange={handleFormValues}
            value={formValues?.age}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="How old are you"
          />

          <Input
            name="password"
            label={t('password')}
            type="password"
            onChange={handleFormValues}
            value={formValues?.password}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
            placeholder="Your Password"
          />

          <Input
            label={t('picture')}
            type="file"
            name="image"
            onChange={handleFormValues}
            value={undefined}
            className={cmpStyle.inputField}
            labelClassName={cmpStyle.label}
          />

          <Button
            type="submit"
            className={cmpStyle.signinBtn}
            label={registering ? t('registering') : t('register')}
          />

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
