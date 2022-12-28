import React from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import Title from '../../../components/payment_title';
import SelectBox from '../../../ui/select';
import Button from '../../../ui/button';
import Input from '../../../ui/input';

import * as actions from '../actions';
import * as utils from '../../../../utils';
import { t } from '../../../../i18n/translate';

import * as headerStyles from '../../../components/header/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function StepOne({ step, billing, options }) {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, getValues } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  });

  const stepOneHandler = () => {
    dispatch(
      actions.setBillingDetails({
        firstName: getValues().firstName,
        lastName: getValues().lastName,
        billingAddress: getValues().billingAddress,
        billingCity: getValues().billingCity,
        billingCountry: getValues().billingCountry,
        billingStates: getValues().billingStates,
        billingPostcode: getValues().billingPostcode,
        billingPhone: getValues().billingPhone,
      })
    );
    dispatch(actions.setStep(2));
  };

  const resetStep1Form = () => {
    dispatch(actions.resetStep1Form({}));
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(stepOneHandler)}
      style={{ marginLeft: '9rem' }}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step1')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />

        <div className={localCmp.flex}>
          <Controller
            name="firstName"
            control={control}
            defaultValue={billing.firstName}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('username')}
                type="text"
                name="firstName"
                aria-invalid={!!formState.errors?.firstName}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                style={utils.setErrorStyle(formState?.errors?.firstName)}
                errorMessage={
                  formState?.errors?.firstName ? t('nameError') : ''
                }
                placeholder="Your Firstname"
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue={billing.lastName}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('surname')}
                type="text"
                name="lastName"
                aria-invalid={!!formState.errors?.lastName}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                style={utils.setErrorStyle(formState?.errors?.lastName)}
                errorMessage={
                  formState?.errors?.lastName ? t('surnameError') : ''
                }
                placeholder="What is your last name?"
              />
            )}
          />
        </div>

        <Controller
          name="billingAddress"
          control={control}
          defaultValue={billing.billingAddress}
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label={t('address')}
              type="text"
              name="billingAddress"
              aria-invalid={!!formState.errors?.billingAddress}
              style={utils.setErrorStyle(formState?.errors?.billingAddress)}
              className={`${cmpStyles.inputFieldFull}`}
              labelClassName={cmpStyles.label}
              placeholder="What is your address?"
              errorMessage={
                formState?.errors?.billingAddress ? t('addressError') : ''
              }
            />
          )}
        />

        <div className={localCmp.flex}>
          <Controller
            name="billingCity"
            control={control}
            defaultValue={billing.billingCity}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('city')}
                type="text"
                name="billingCity"
                aria-invalid={!!formState.errors?.billingCity}
                style={utils.setErrorStyle(formState?.errors?.billingCity)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your city?"
                errorMessage={
                  formState?.errors?.billingCity ? t('cityError') : ''
                }
              />
            )}
          />

          <Controller
            name="billingStates"
            control={control}
            defaultValue={billing.billingStates}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('province')}
                type="text"
                name="billingStates"
                aria-invalid={!!formState.errors?.billingStates}
                style={utils.setErrorStyle(formState?.errors?.billingStates)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your State?"
                errorMessage={
                  formState?.errors?.billingStates ? t('stateError') : ''
                }
              />
            )}
          />
        </div>

        <div className={localCmp.countryLayout}>
          <span className={localCmp.countrySize}>{t('country')}</span>
          <Controller
            name="billingCountry"
            control={control}
            rules={{ required: true }}
            styles={utils.paymentSelectStyles}
            className={headerStyles.selectBox}
            render={({ field: { ref, ...field } }) => (
              <>
                <SelectBox
                  {...field}
                  aria-invalid={!!formState.errors?.billingCountry}
                  value={getValues().billingCountry}
                  name="billingCountry"
                  options={options}
                  styles={utils.paymentSelectStyles}
                  className={`${headerStyles.selectBox} ${
                    formState?.errors?.billingCountry && headerStyles.error
                  }
                }`}
                  classNamePrefix="react-select"
                />
                {formState?.errors?.billingCountry && (
                  <span className="form-field-error" role="alert">
                    {t('countryError')}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className={localCmp.flex}>
          <Controller
            name="billingPostcode"
            control={control}
            rules={{ required: true }}
            defaultValue={billing.billingPostcode}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('postcode')}
                type="text"
                name="billingPostcode"
                aria-invalid={!!formState.errors?.billingPostcode}
                style={utils.setErrorStyle(formState?.errors?.billingPostcode)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your postcode?"
                errorMessage={
                  formState?.errors?.billingPostcode ? t('postcodeError') : ''
                }
              />
            )}
          />

          <Controller
            name="billingPhone"
            control={control}
            rules={{ required: true }}
            defaultValue={billing.billingPhone}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('billingPhone')}
                type="text"
                name="billingPhone"
                aria-invalid={!!formState.errors?.billingPhone}
                style={utils.setErrorStyle(formState?.errors?.billingPhone)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your phone number?"
                errorMessage={
                  formState?.errors?.billingPhone ? t('phoneError') : ''
                }
              />
            )}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Button
            type="button"
            label="Clear Form "
            className={utils.btnStyles()}
            onClick={resetStep1Form}
          />
          <Button
            label={t('next')}
            className={utils.btnStyles()}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default StepOne;
