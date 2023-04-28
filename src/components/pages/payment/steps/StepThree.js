import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as UI from 'react-accessible-accordion';

import Input from '../../../ui/input';
import Button from '../../../ui/button';
import Title from '../../../components/payment_title';
import BillingAddress from '../billingDetails/BillingAddress';
import DeliveryAddress from '../billingDetails/DeliveryAddress';
import Checkout from './tabsStepThree/Checkout';
import CreditCard from './tabsStepThree/CreditCard';

import { AccordionItem, TableHead, TableBody, theadLabels } from './StepsUI';

import { setStep } from '../actions';
import { t } from '../../../../i18n/translate';
import * as utils from '../../../../utils';

import * as localCmp from '../styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';

import 'react-accessible-accordion/dist/fancy-example.css';

function StepThree({ step, billing, basket, delivery }) {
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] = useState(true);
  const [paymentStep, setPaymentStep] = useState(1);

  return (
    <div className={localCmp.clentDetails}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step3')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />
        <hr />
        <table>
          <TableHead labels={theadLabels} />
          <TableBody basket={basket} />
        </table>
        <div className={localCmp.stepThreeTotal}>
          {t('Total')}: {utils.calculateTotal(basket?.cart)}$
        </div>
        <hr />
        <UI.Accordion allowMultipleExpanded allowZeroExpanded>
          <AccordionItem label={t('BillingLabel')}>
            <BillingAddress item={billing} />
            <Button
              label={t('backToStep1')}
              onClick={() => dispatch(setStep(1))}
              className="update-btn"
              type="button"
            />
          </AccordionItem>
          <AccordionItem label={t('DeliveryLabel')}>
            <DeliveryAddress item={delivery} />
            <Button
              label={t('backToStep2')}
              onClick={() => dispatch(setStep(2))}
              className="update-btn"
              type="button"
            />
          </AccordionItem>
        </UI.Accordion>
        <div className={localCmp.confirmationBox}>
          <Input
            type="checkbox"
            name="confirmation"
            id="confirmation"
            checked={confirmation}
            onChange={() => setConfirmation(!confirmation)}
            disabled={false}
          />
          <label htmlFor="confirmation" className={localCmp.confirmationLabel}>
            {t('confirmation')}
          </label>
        </div>
        {confirmation && (
          <>
            <button
              type="button"
              className={
                paymentStep === 1 ? localCmp.tabBtnSelected : localCmp.tabBtn
              }
              onClick={() => setPaymentStep(1)}>
              CREDIT CARD
            </button>{' '}
            <button
              type="button"
              className={
                paymentStep === 2 ? localCmp.tabBtnSelected : localCmp.tabBtn
              }
              onClick={() => setPaymentStep(2)}>
              CHECKOUT
            </button>
          </>
        )}
        {confirmation && paymentStep === 1 && (
          <CreditCard basket={basket} delivery={delivery} billing={billing} />
        )}
        {confirmation && paymentStep === 2 && <Checkout basket={basket} />}
      </div>
    </div>
  );
}

export default StepThree;
