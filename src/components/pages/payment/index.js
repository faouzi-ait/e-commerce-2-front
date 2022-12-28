import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import countryList from 'react-select-country-list';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import OrderSummary from './steps/OrderSummary';
import Footer from '../../components/footer';
import Page from '../../../components/components/container';

import { basketData, cartData } from './selectors';

import useSticky from '../../../hooks/useSticky';
import * as localCmp from './styles.module.scss';

function Payment() {
  const { isSticky, element } = useSticky();
  const options = useMemo(() => countryList().getData(), []);
  const { step, billing, delivery, existingBillingDetails, copyBillingInfo } =
    useSelector(basketData);
  const basket = useSelector(cartData);

  return (
    <Page>
      <div className={localCmp.cartPageLayout} ref={element}>
        {step === 1 && (
          <StepOne
            step={step}
            billing={billing}
            options={options}
            copyExistingDetails={existingBillingDetails}
          />
        )}
        {step === 2 && (
          <StepTwo
            step={step}
            billing={billing}
            copyBillingInfo={copyBillingInfo}
            options={options}
          />
        )}
        {step === 3 && (
          <StepThree
            step={step}
            billing={billing}
            delivery={delivery}
            basket={basket}
          />
        )}
        <OrderSummary isSticky={isSticky} />
      </div>
      <Footer />
    </Page>
  );
}

export default Payment;
