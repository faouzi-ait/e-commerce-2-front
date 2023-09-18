import React, { useState } from 'react';
// import axios from 'axios';
import { updateProfile } from '../../../../../../api/apiCalls';
import { Controller, useForm } from 'react-hook-form';

import Input from '../../../../../ui/input';
import Button from '../../../../../ui/button';

import * as utils from '../../../../../../utils';
import * as cmpStyle from '../../../styles.module.scss';

function Info({ details, userId }) {
  const [isUpdating, setisUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const userData = details?.data;

  const { handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: userData?.name,
      surname: userData?.surname,
      email: userData?.email,
    },
  });

  const onSubmit = async ({ name, surname, email }) => {
    setisUpdating(true);
    const request = await updateProfile({ name, surname, email });
    setisUpdating(false);

    if (request?.status === 'success') {
      setMessage('Update Successfull');
    } else {
      setMessage('A problem occured, please try again later');
    }

    setTimeout(() => {
      setMessage('');
    }, 2500);
  };

  return (
    <section>
      <h1
        tabIndex={0}
        style={{ marginLeft: '4rem' }}
        aria-label="ACCOUNT DETAILS SECTION"
      >
        ACCOUNT INFORMATION
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
        {message && (
          <h2 style={{ color: 'green', margin: '0 0 0 50px' }}>{message}</h2>
        )}
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label="Name"
              type="text"
              errorMsgId="nameError"
              aria-invalid={!!formState?.errors?.name}
              className={`${cmpStyle.inputField}`}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(formState?.errors?.name)}
              errorMessage={
                formState?.errors?.name ? 'Please type in your name' : ''
              }
              placeholder="Your Name"
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
              label="Surname"
              type="text"
              name="surname"
              errorMsgId="surnameError"
              aria-invalid={!!formState.errors?.surname}
              className={cmpStyle.inputField}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(formState?.errors?.surname)}
              errorMessage={
                formState?.errors?.surname ? 'Please type in your surname' : ''
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
          label={isUpdating ? 'Updating details...' : 'Update Details'}
          className={cmpStyle.signinBtn}
          disabled={!isUpdating ? false : true}
        />
      </form>
    </section>
  );
}

export default Info;
