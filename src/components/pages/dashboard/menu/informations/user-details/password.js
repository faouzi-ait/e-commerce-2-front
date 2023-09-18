import React, { useState } from 'react';
// import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

import Input from '../../../../../ui/input';
import Button from '../../../../../ui/button';

import { updatePassword } from '../../../../../../api/apiCalls';

import * as utils from '../../../../../../utils';
import * as cmpStyle from '../../../styles.module.scss';

function Password({ userId }) {
  const [isUpdating, setisUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async ({ currentPassword, password, confirmPassword }) => {
    setisUpdating(true);
    const request = await updatePassword({
      currentPassword,
      password,
      confirmPassword,
    });
    setisUpdating(false);

    console.log(request?.error?.response?.status);

    if (request?.data?.success === true) {
      setMessage('Password Update Successfull');
      reset();
    } else {
      if (request?.error?.response?.status === 401) {
        setMessage('Login with your new password');
      } else {
        setMessage('Please try again');
      }
    }

    setTimeout(() => {
      setMessage('');
    }, 2500);
  };

  return (
    <div>
      <h1
        style={{ marginLeft: '4rem', marginTop: 0 }}
        tabIndex={0}
        aria-label="ACCOUNT DETAILS SECTION"
      >
        PASSWORD MANAGEMENT
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
        {message && (
          <h2 style={{ color: 'green', marginleft: '50px' }}>{message}</h2>
        )}
        <Controller
          name="currentPassword"
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label="Current Password"
              type="password"
              aria-invalid={!!errors?.currentPassword}
              className={`${cmpStyle.inputField}`}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(errors?.currentPassword)}
              errorMessage={
                errors?.currentPassword
                  ? 'Please type in your current password'
                  : ''
              }
              placeholder="Your current password"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Please type in your new password',
            validate: (val) => {
              if (watch('currentPassword') === val)
                return 'New and current passwords can not be the same';
            },
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label="New Password"
              type="password"
              aria-invalid={!!errors?.password}
              className={`${cmpStyle.inputField}`}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(errors?.password)}
              errorMessage={errors?.password ? errors?.password.message : ''}
              placeholder="Your new password"
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Please confirm your new password',
            validate: (val) => {
              if (watch('password') !== val)
                return 'Your passwords do not match';
            },
          }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label="Confirm new Password"
              type="password"
              aria-invalid={!!errors?.confirmPassword}
              className={`${cmpStyle.inputField}`}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(errors?.confirmPassword)}
              errorMessage={
                errors?.confirmPassword ? errors?.confirmPassword?.message : ''
              }
              placeholder="Confirm your new password"
            />
          )}
        />

        <Button
          type="submit"
          label={isUpdating ? 'Updating Password...' : 'Update Password'}
          className={cmpStyle.signinBtn}
          disabled={!isUpdating ? false : true}
        />
      </form>
    </div>
  );
}

export default Password;
