import React /*, { useState, useEffect, useMemo }*/ from 'react';
import { /*useSelector, */ useDispatch } from 'react-redux';
// import countryList from 'react-select-country-list';

// import SelectBox from '../../../ui/select';
import Button from '../../../ui/button';
// import Input from '../../../ui/input';
import Title from '../../../components/payment_title';

import {
  setStep /*, setDeliveryDetails, copyBillingDetails*/,
} from '../actions';
// import { basketData } from '../selectors';

import { t } from '../../../../i18n/translate';
// import * as utils from '../../../../utils';

// import * as headerStyles from '../../../components/header/styles.module.scss';
import * as cartStyles from '../../cart/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function StepThree({ step /*, billing, copyBillingInfo */ }) {
  const dispatch = useDispatch();
  const btnStyles = `${cmpStyles.signinBtn} ${cartStyles.checkoutBtnWidth} ${cartStyles.checkoutBtnCheckout}`;
  // const inputStyles = `${cmpStyles.inputField} ${localCmp.inputField}`;

  return (
    <div className={localCmp.clentDetails}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step3')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />
        <Button
          label={t('previous')}
          onClick={() => dispatch(setStep(2))}
          className={btnStyles}
          type="button"
        />
      </div>
    </div>
  );
}

export default StepThree;
