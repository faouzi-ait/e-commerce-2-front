import React from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import Title from '../../../components/payment_title';
import SelectBox from '../../../ui/select';
import Button from '../../../ui/button';
import Input from '../../../ui/input';

import { setStep, setDeliveryDetails, copyBillingDetails } from '../actions';

import { t } from '../../../../i18n/translate';
import * as utils from '../../../../utils';

import * as headerStyles from '../../../components/header/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function StepTwo({ step, billing, copyBillingInfo, options }) {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, getValues } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      firstName: copyBillingInfo ? billing.firstName : '',
      lastName: copyBillingInfo ? billing.lastName : '',
      deliveryAddress: copyBillingInfo ? billing.billingAddress : '',
      deliveryCity: copyBillingInfo ? billing.billingCity : '',
      deliveryCountry: copyBillingInfo ? billing.billingCountry : '',
      deliveryStates: copyBillingInfo ? billing.billingStates : '',
      deliveryPostcode: copyBillingInfo ? billing.billingPostcode : '',
      deliveryPhone: copyBillingInfo ? billing.billingPhone : '',
    },
  });

  const stepTwoHandler = () => {
    console.log(getValues());
    dispatch(
      setDeliveryDetails({
        firstName: getValues().firstName,
        lastName: getValues().lastName,
        deliveryAddress: getValues().deliveryAddress,
        deliveryCity: getValues().deliveryCity,
        deliveryCountry: getValues().deliveryCountry,
        deliveryStates: getValues().deliveryStates,
        deliveryPostcode: getValues().deliveryPostcode,
        deliveryPhone: getValues().deliveryPhone,
      })
    );
    dispatch(setStep(3));
  };

  return (
    <form
      onSubmit={handleSubmit(stepTwoHandler)}
      style={{ marginLeft: '9rem' }}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step2')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />
        <label className={localCmp.copyBillingAddress}>
          <span className={cmpStyles.label}>{t('copyBillingAddress')}</span>

          <span className={localCmp.copyDetails}>
            <Input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(copyBillingDetails(true));
                  window.location.reload();
                } else {
                  dispatch(copyBillingDetails(false));
                  window.location.reload();
                }
              }}
              checked={copyBillingInfo}
            />
          </span>
        </label>

        <div className={localCmp.flex}>
          <Controller
            name="firstName"
            control={control}
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
                placeholder="Your Lastname"
              />
            )}
          />
        </div>
        <Controller
          name="deliveryAddress"
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              label={t('address')}
              type="text"
              name="deliveryAddress"
              aria-invalid={!!formState.errors?.deliveryAddress}
              style={utils.setErrorStyle(formState?.errors?.deliveryAddress)}
              className={`${cmpStyles.inputFieldFull}`}
              labelClassName={cmpStyles.label}
              placeholder="What is your address?"
              errorMessage={
                formState?.errors?.deliveryAddress ? t('addressError') : ''
              }
            />
          )}
        />

        <div className={localCmp.flex}>
          <Controller
            name="deliveryCity"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('city')}
                type="text"
                name="deliveryCity"
                aria-invalid={!!formState.errors?.deliveryCity}
                style={utils.setErrorStyle(formState?.errors?.deliveryCity)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your city?"
                errorMessage={
                  formState?.errors?.deliveryCity ? t('cityError') : ''
                }
              />
            )}
          />

          <Controller
            name="deliveryStates"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('province')}
                type="text"
                name="deliveryStates"
                aria-invalid={!!formState.errors?.deliveryStates}
                style={utils.setErrorStyle(formState?.errors?.deliveryStates)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your State?"
                errorMessage={
                  formState?.errors?.deliveryStates ? t('stateError') : ''
                }
              />
            )}
          />
        </div>
        <div className={localCmp.countryLayout}>
          <span className={localCmp.countrySize}>{t('country')}</span>

          <Controller
            name="deliveryCountry"
            control={control}
            rules={{ required: true }}
            styles={utils.paymentSelectStyles}
            className={headerStyles.selectBox}
            render={({ field: { ref, ...field } }) => (
              <>
                <SelectBox
                  {...field}
                  aria-invalid={!!formState.errors?.deliveryCountry}
                  // value={values.deliveryCountry}
                  name="deliveryCountry"
                  options={options}
                  styles={utils.paymentSelectStyles}
                  className={`${headerStyles.selectBox} ${
                    formState?.errors?.deliveryCountry && headerStyles.error
                  }
                }`}
                  classNamePrefix="react-select"
                />
                {formState?.errors?.deliveryCountry && (
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
            name="deliveryPostcode"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('postcode')}
                type="text"
                name="deliveryPostcode"
                aria-invalid={!!formState.errors?.deliveryPostcode}
                style={utils.setErrorStyle(formState?.errors?.deliveryPostcode)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your State?"
                errorMessage={
                  formState?.errors?.deliveryPostcode ? t('postcodeError') : ''
                }
              />
            )}
          />

          <Controller
            name="deliveryPhone"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <Input
                {...field}
                label={t('deliveryPhone')}
                type="text"
                name="deliveryPhone"
                aria-invalid={!!formState.errors?.deliveryPhone}
                style={utils.setErrorStyle(formState?.errors?.deliveryPhone)}
                className={utils.inputStyles(localCmp.inputField)}
                labelClassName={cmpStyles.label}
                placeholder="What is your State?"
                errorMessage={
                  formState?.errors?.deliveryPhone ? t('phoneError') : ''
                }
              />
            )}
          />
        </div>
        <div className={localCmp.flex}>
          <Button
            label={t('previous')}
            onClick={() => dispatch(setStep(1))}
            className={utils.btnStyles()}
            type="button"
          />
          <Button
            label={t('next')}
            className={utils.btnStyles()}
            type="sumbit"
          />
        </div>
      </div>
    </form>
  );
}

export default StepTwo;
