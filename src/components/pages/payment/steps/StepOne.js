import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Title from '../../../components/payment_title';
import SelectBox from '../../../ui/select';
import Button from '../../../ui/button';
import Input from '../../../ui/input';

import { setStep, setBillingDetails } from '../actions';

import { t } from '../../../../i18n/translate';
import * as utils from '../../../../utils';

import * as headerStyles from '../../../components/header/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function StepOne({ step, billing, options }) {
  const dispatch = useDispatch();
  const [billingCity, setBillingCity] = useState('');
  const [billingStates, setBillingState] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingPostcode, setBillingPostCode] = useState('');

  useEffect(() => {
    !billingCity && setBillingCity(billing.billingCity);
    !billingStates && setBillingState(billing.billingStates);
    !billingAddress && setBillingAddress(billing.billingAddress);
    !billingCountry && setBillingCountry(billing.billingCountry);
    !billingPostcode && setBillingPostCode(billing.billingPostcode);
  }, [
    billing,
    billingAddress,
    billingCity,
    billingCountry,
    billingPostcode,
    billingStates,
  ]);

  const changeBillingHandler = (value) => setBillingCountry(value);
  const stepOneHandler = (e) => {
    dispatch(
      setBillingDetails({
        billingAddress,
        billingCity,
        billingCountry,
        billingStates,
        billingPostcode,
      })
    );
    dispatch(setStep(2));
  };

  return (
    <div className={localCmp.clentDetails}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step1')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />
        <Input
          label={t('address')}
          type="text"
          name="billingAddress"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          className={utils.inputStyles(localCmp.inputAddress)}
          labelClassName={cmpStyles.label}
          placeholder="What is your address?"
        />

        <div style={{ display: 'flex' }}>
          <Input
            label={t('city')}
            type="text"
            name="billingCity"
            value={billingCity}
            onChange={(e) => setBillingCity(e.target.value)}
            className={utils.inputStyles(localCmp.inputField)}
            labelClassName={cmpStyles.label}
            placeholder="What is your city?"
          />
          <Input
            label={t('province')}
            type="text"
            name="province"
            value={billingStates}
            onChange={(e) => setBillingState(e.target.value)}
            className={utils.inputStyles(localCmp.inputField)}
            labelClassName={cmpStyles.label}
            placeholder="What is your State?"
          />
        </div>

        <div className={localCmp.countryLayout}>
          <span style={{ fontWeight: 'bold', marginBottom: '.7rem' }}>
            {t('country')}
          </span>
          <SelectBox
            name="billingCountry"
            value={billingCountry}
            options={options}
            onChange={changeBillingHandler}
            styles={utils.paymentSelectStyles}
            className={headerStyles.selectBox}
            classNamePrefix="react-select"
          />
        </div>
        <Input
          label={t('postcode')}
          type="text"
          name="billingPostcode"
          value={billingPostcode}
          onChange={(e) => setBillingPostCode(e.target.value)}
          className={utils.inputStyles(localCmp.inputField)}
          labelClassName={cmpStyles.label}
          placeholder="What is your postcode?"
        />
        <Button
          label={t('next')}
          onClick={stepOneHandler}
          className={utils.btnStyles()}
          type="button"
        />
      </div>
    </div>
  );
}

export default StepOne;
