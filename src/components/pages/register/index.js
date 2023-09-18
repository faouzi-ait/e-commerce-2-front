import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import Page from '../../../components/components/container';
import TokenPane from '../../components/resend_token';
import Footer from '../../components/footer';

import Button from '../../ui/button';
import Input from '../../ui/input';

import { t } from '../../../i18n/translate';

import { registration } from './selector';
import { register } from './actions';

import * as utils from '../../../utils';

import { loginForm, backToLogin } from './styles.module.scss';
import * as cmpStyle from '../login/styles.module.scss';

function Register() {
  const { user, errors, registering } = useSelector(registration);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setFile] = useState();
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: utils.defaultRegisterValues,
  });

  const handleFileChange = ({ target }) => {
    if (target.files) setFile(target.files[0]);
  };

  const onSubmit = () => {
    const values = getValues();
    const data = new FormData();

    if (image) data.append('image', image);
    const registerData = utils.buildFormDataObject(values, data);

    dispatch(register(registerData));
  };

  // const handleFormValues = ({ target }) => {
  //   const { name, value, files } = target;
  //   setFormValues({ ...formValues, [name]: files ? files[0] : value });
  // };

  return (
    <Page>
      <main className={loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
          <p
            tabIndex={0}
            aria-label="account creation page"
            className={cmpStyle.pageTitle}
          >
            {t('registerTitle')}
          </p>

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('username')}
                type="text"
                name="name"
                aria-invalid={!!formState.errors?.name}
                className={`${cmpStyle.inputField}`}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(formState?.errors?.name)}
                errorMessage={formState?.errors?.name ? t('nameError') : ''}
                placeholder="Your Firstname"
                ariaLabelRequired
                autoFocus
              />
            )}
          />

          <Controller
            name="surname"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('surname')}
                type="text"
                name="surname"
                aria-invalid={!!formState.errors?.surname}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(formState?.errors?.surname)}
                errorMessage={
                  formState?.errors?.surname ? t('surnameError') : ''
                }
                placeholder="Your Lastname"
                ariaLabelRequired
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={utils.emailFormPattern}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('email')}
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
                ariaLabelRequired
              />
            )}
          />

          <Controller
            name="dob"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                type="date"
                label={t('age')}
                name="dob"
                aria-invalid={!!formState.errors?.dob}
                className={cmpStyle.inputField}
                labelClassName={cmpStyle.label}
                style={utils.setErrorStyle(formState?.errors?.dob)}
                errorMessage={formState?.errors?.dob ? t('dobError') : ''}
                ariaLabelRequired
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
                ariaLabelRequired
              />
            )}
          />

          <label className={cmpStyle.label}>{t('yourPics')}</label>
          <input
            ref={register}
            name="image"
            id="image"
            type="file"
            onChange={handleFileChange}
            className={cmpStyle.inputField}
          />

          <Button
            type="submit"
            label={!registering ? t('register') : t('registering...')}
            className={cmpStyle.signinBtn}
            aria-label="click here to create your account"
            disabled={!registering ? false : true}
          />

          <a
            role="button"
            href="/login"
            className={`${cmpStyle.activate} ${backToLogin}`}
            aria-label="click or press here to create a new account"
          >
            {t('returnToLogin')}
          </a>

          <button
            type="button"
            className={`${cmpStyle.activate} ${backToLogin}`}
            aria-label="click or press here to open the renew token window"
            onClick={() => setIsOpen(!isOpen)}
          >
            {t('loginToken')}
          </button>

          <span role="alert">{errors && errors?.data?.message}</span>
          <span role="alert">
            {user && user.message && t('registrationSucessful')}
          </span>
        </form>

        {isOpen && <TokenPane setOpen={setIsOpen} />}
      </main>
      <Footer />
    </Page>
  );
}

export default Register;
