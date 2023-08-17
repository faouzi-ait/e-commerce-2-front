import React from 'react';
// import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

import Input from '../../../../../ui/input';
import Button from '../../../../../ui/button';

import * as utils from '../../../../../../utils';
import * as cmpStyle from '../../../styles.module.scss';

function Info({ details, userId }) {
  const userData = details?.data;

  const { handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: userData?.name,
      surname: userData?.surname,
      email: userData?.email,
    },
  });

  const onSubmit = ({ name, surname, email }) => {
    console.log(name, surname, email, userId);
  };

  return (
    <sectopn>
      <h1
        style={{ marginLeft: '4rem' }}
        tabIndex={0}
        aria-label="ACCOUNT DETAILS SECTION">
        ACCOUNT INFORMATION
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label="Name"
              type="text"
              aria-invalid={!!formState?.errors?.name}
              className={`${cmpStyle.inputField}`}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(formState?.errors?.name)}
              errorMessage={
                formState?.errors?.name ? 'Please type in your name' : ''
              }
              placeholder="Your Name"
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
              label="Surname"
              type="text"
              name="surname"
              aria-invalid={!!formState.errors?.surname}
              className={cmpStyle.inputField}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(formState?.errors?.surname)}
              errorMessage={
                formState?.errors?.surname ? 'Please type in your surname' : ''
              }
              placeholder="Your Lastname"
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
              label="Email"
              type="email"
              name="email"
              aria-invalid={!!formState.errors?.email}
              className={cmpStyle.inputField}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(formState?.errors?.email)}
              errorMessage={
                formState?.errors?.email ? formState?.errors?.email.message : ''
              }
              placeholder="your-email@somewhere.com"
              disabled
            />
          )}
        />

        <Button
          type="submit"
          // label={!registering ? t('register') : t('registering...')}
          label="Update Details"
          className={cmpStyle.signinBtn}
          // disabled={!registering ? false : true}
        />
      </form>
    </sectopn>
  );
}

export default Info;
