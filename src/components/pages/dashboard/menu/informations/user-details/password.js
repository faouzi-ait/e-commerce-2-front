import React from 'react';
// import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

import Input from '../../../../../ui/input';
import Button from '../../../../../ui/button';

import * as utils from '../../../../../../utils';
import * as cmpStyle from '../../../styles.module.scss';

function Password({ userId }) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => console.log(data, userId);

  return (
    <div>
      <h1
        style={{ marginLeft: '4rem', marginTop: 0 }}
        tabIndex={0}
        aria-label="ACCOUNT DETAILS SECTION">
        PASSWORD MANAGEMENT
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cmpStyle.form}>
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
          name="newPassword"
          control={control}
          rules={{
            required: 'Please type in your new password',
            validate: (val) => {
              console.log(val);
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
              aria-invalid={!!errors?.newPassword}
              className={`${cmpStyle.inputField}`}
              labelClassName={cmpStyle.label}
              style={utils.setErrorStyle(errors?.newPassword)}
              errorMessage={
                errors?.newPassword ? errors?.newPassword.message : ''
              }
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
              if (watch('newPassword') !== val)
                return 'Your passwords do not match';
            },
          }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label="New Password"
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
          // label={!registering ? t('register') : t('registering...')}
          label="Update Password"
          className={cmpStyle.signinBtn}
          disabled={isSubmitting ? true : false}
        />
      </form>
    </div>
  );
}

export default Password;
