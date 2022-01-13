import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import countryList from 'react-select-country-list';

import SelectBox from '../../../ui/select';
import Button from '../../../ui/button';
import Input from '../../../ui/input';

import { setStep, setDeliveryDetails, copyBillingDetails } from '../actions';
import { basketData } from '../selectors';

import { t } from '../../../../i18n/translate';
import * as utils from '../../../../utils';

import * as headerStyles from '../../../components/header/styles.module.scss';
import * as cartStyles from '../../cart/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function StepTwo() {
  const dispatch = useDispatch();
  const options = useMemo(() => countryList().getData(), []);
  const { step, billing, copyBillingInfo } = useSelector(basketData);

  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCountry, setDeliveryCountry] = useState({});
  const [deliveryStates, setDeliveryState] = useState('');
  const [deliveryPostcode, setDeliveryPostCode] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');

  const btnStyles = `${cmpStyles.signinBtn} ${cartStyles.checkoutBtnWidth} ${cartStyles.checkoutBtnCheckout}`;
  const inputStyles = `${cmpStyles.inputField} ${localCmp.inputField}`;

  useEffect(() => {
    if (copyBillingInfo) {
      setDeliveryAddress(billing?.billingAddress);
      setDeliveryCity(billing?.billingCity);
      setDeliveryCountry(billing?.billingCountry);
      setDeliveryState(billing?.billingStates);
      setDeliveryPostCode(billing?.billingPostcode);
    } else {
      setDeliveryAddress('');
      setDeliveryCity('');
      setDeliveryState('');
      setDeliveryPostCode('');
    }
  }, [copyBillingInfo, billing]);

  const changeDeliveryHandler = (value) => setDeliveryCountry(value);

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

  const stepTwoHandler = (e) => {
    dispatch(
      setDeliveryDetails({
        deliveryAddress,
        deliveryCity,
        deliveryCountry,
        deliveryStates,
        deliveryPostcode,
        deliveryPhone,
      })
    );
    dispatch(setStep(3));
  };

  return (
    <div className={localCmp.clentDetails}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title step={step} title={t('step2')} />
        <label className={localCmp.copyBillingAddress}>
          <span className={cmpStyles.label}>{t('copyBillingAddress')}</span>

          <span style={{ marginTop: '-10px' }}>
            <Input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(copyBillingDetails(true));
                } else {
                  dispatch(copyBillingDetails(false));
                }
              }}
              checked={copyBillingInfo}
            />
          </span>
        </label>

        <Input
          label={t('address')}
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className={`${cmpStyles.inputField} ${localCmp.inputAddress}`}
          labelClassName={cmpStyles.label}
          placeholder="What is your address?"
          disabled={copyBillingInfo}
        />

        <div style={{ display: 'flex' }}>
          <Input
            label={t('city')}
            type="text"
            value={deliveryCity}
            onChange={(e) => setDeliveryCity(e.target.value)}
            className={inputStyles}
            labelClassName={cmpStyles.label}
            placeholder="What is your city?"
            disabled={copyBillingInfo}
          />
          <Input
            label={t('province')}
            type="text"
            value={deliveryStates}
            onChange={(e) => setDeliveryState(e.target.value)}
            className={inputStyles}
            labelClassName={cmpStyles.label}
            placeholder="What is your State?"
            disabled={copyBillingInfo}
          />
        </div>

        <div className={localCmp.countryLayout}>
          <span style={{ fontWeight: 'bold', marginBottom: '.7rem' }}>
            {t('country')}
          </span>
          <SelectBox
            value={deliveryCountry}
            options={options}
            onChange={changeDeliveryHandler}
            styles={utils.paymentSelectStyles}
            className={headerStyles.selectBox}
            classNamePrefix="react-select"
            disabled={copyBillingInfo}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Input
            label={t('postcode')}
            type="text"
            value={deliveryPostcode}
            onChange={(e) => setDeliveryPostCode(e.target.value)}
            className={inputStyles}
            labelClassName={cmpStyles.label}
            placeholder="What is your postcode?"
            disabled={copyBillingInfo}
          />
          <Input
            label={t('phone')}
            type="number"
            value={deliveryPhone}
            onChange={(e) => setDeliveryPhone(e.target.value)}
            className={inputStyles}
            labelClassName={cmpStyles.label}
            placeholder="What is your phone number?"
          />
        </div>

        <div style={{ display: 'flex' }}>
          <Button
            label={t('previous')}
            onClick={() => dispatch(setStep(1))}
            className={btnStyles}
            type="button"
          />
          <Button
            label={t('next')}
            onClick={stepTwoHandler}
            className={btnStyles}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default StepTwo;
