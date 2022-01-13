import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import countryList from 'react-select-country-list';

import SelectBox from '../../../ui/select';
import Button from '../../../ui/button';
import Input from '../../../ui/input';

import { setStep, setBillingDetails } from '../actions';
import { basketData } from '../selectors';

import { t } from '../../../../i18n/translate';
import * as utils from '../../../../utils';

import * as headerStyles from '../../../components/header/styles.module.scss';
import * as cartStyles from '../../cart/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function StepOne() {
  const dispatch = useDispatch();
  const { step, billing } = useSelector(basketData);
  const [billingCity, setBillingCity] = useState('');
  const [billingStates, setBillingState] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingPostcode, setBillingPostCode] = useState('');
  const options = useMemo(() => countryList().getData(), []);

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

  console.log(billing);

  const btnStyles = `${cmpStyles.signinBtn} ${cartStyles.checkoutBtnWidth} ${cartStyles.checkoutBtnCheckout}`;
  const inputStyles = `${cmpStyles.inputField} ${localCmp.inputField}`;

  const changeBillingHandler = (value) => setBillingCountry(value);

  const Title = ({ step, title }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className={cmpStyles.h3}>{title}</p>
        <p className={cmpStyles.h3}>
          {t('step')} {step} / 3
        </p>
      </div>
    );
  };

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
        <Title step={step} title={t('step1')} />
        <Input
          label={t('address')}
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          className={`${cmpStyles.inputField} ${localCmp.inputAddress}`}
          labelClassName={cmpStyles.label}
          placeholder="What is your address?"
        />

        <div style={{ display: 'flex' }}>
          <Input
            label={t('city')}
            type="text"
            value={billingCity}
            onChange={(e) => setBillingCity(e.target.value)}
            className={inputStyles}
            labelClassName={cmpStyles.label}
            placeholder="What is your city?"
          />
          <Input
            label={t('province')}
            type="text"
            value={billingStates}
            onChange={(e) => setBillingState(e.target.value)}
            className={inputStyles}
            labelClassName={cmpStyles.label}
            placeholder="What is your State?"
          />
        </div>

        <div className={localCmp.countryLayout}>
          <span style={{ fontWeight: 'bold', marginBottom: '.7rem' }}>
            {t('country')}
          </span>
          <SelectBox
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
          value={billingPostcode}
          onChange={(e) => setBillingPostCode(e.target.value)}
          className={inputStyles}
          labelClassName={cmpStyles.label}
          placeholder="What is your postcode?"
        />
        <Button
          label={t('next')}
          onClick={stepOneHandler}
          className={btnStyles}
          type="button"
        />
      </div>
    </div>
  );
}

export default StepOne;
