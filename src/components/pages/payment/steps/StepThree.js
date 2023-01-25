import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe } from '@stripe/react-stripe-js';
import uuid from 'react-uuid';
import jwt from 'jwt-decode';
import axios from 'axios';

import * as UI from 'react-accessible-accordion';

import Input from '../../../ui/input';
import Button from '../../../ui/button';
import Title from '../../../components/payment_title';
import BillingAddress from '../billingDetails/BillingAddress';
import DeliveryAddress from '../billingDetails/DeliveryAddress';

import { AccordionItem, TableHead, TableBody, theadLabels } from './StepsUI';

import { setStep, saveTransactionId } from '../actions';
import { t } from '../../../../i18n/translate';
import { calculateTotal } from '../../../../utils';

import * as localCmp from '../styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';

import 'react-accessible-accordion/dist/fancy-example.css';

const API_LOCAL = process.env.REACT_APP_URL_DEV;
// const API_PROD = process.env.REACT_APP_URL_PROD;

function StepThree({ step, billing, basket, delivery }) {
  const token = useSelector((state) => state?.tokens?.tokens?.token);
  const [confirmation, setConfirmation] = useState(true);
  const { email } = jwt(token);
  const dispatch = useDispatch();
  const stripe = useStripe();

  const [customer_email, setEmail] = useState(email);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const transactionId = uuid();

    const line_items = basket.cart.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.photo],
          },
        },
      };
    });

    const payment = await axios.post(`${API_LOCAL}/payment-checkout`, {
      line_items,
      customer_email,
      cart: basket.cart,
      transactionId,
    });

    dispatch(saveTransactionId(transactionId));

    const { data: sessionId } = payment;
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId.sessionId,
    });

    if (error) console.log(error);
  };

  return (
    <div className={localCmp.clentDetails}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step3')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />
        <hr />
        <h4 className={localCmp.stepTwoTitle}>{t('OrderPageTitle')}</h4>
        <table>
          <TableHead labels={theadLabels} />
          <TableBody basket={basket} />
        </table>
        <div className={localCmp.stepThreeTotal}>
          {t('Total')}: {calculateTotal(basket?.cart)}$
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
          <div>
            <form onSubmit={handleCheckoutSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  value={customer_email}
                  onChange={({ target }) => setEmail(target.value)}
                />
                <button type="submit">Checkout and Pay</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepThree;
