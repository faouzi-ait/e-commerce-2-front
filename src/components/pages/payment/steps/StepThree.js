import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
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
import * as utils from '../../../../utils';

import * as localCmp from '../styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';

import 'react-accessible-accordion/dist/fancy-example.css';

// const API_LOCAL = process.env.REACT_APP_URL_DEV;
const API_PROD = process.env.REACT_APP_URL_PROD;

function StepThree({ step, billing, basket, delivery }) {
  const token = useSelector((state) => state?.tokens?.tokens?.token);
  const [confirmation, setConfirmation] = useState(true);
  const { email } = jwt(token);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [customer_email,] = useState(email);

  const { handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
    defaultValues: { email: customer_email },
  });

  const handleCheckoutSubmit = async () => {
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

    const payment = await axios.post(`${API_PROD}/payment-checkout`, {
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
        {/* <h4 className={localCmp.stepTwoTitle}>{t('OrderPageTitle')}</h4> */}
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
            <form
              onSubmit={handleSubmit(handleCheckoutSubmit)}
              className={localCmp.form}>
              <div>
                <Controller
                  name="email"
                  control={control}
                  rules={utils.emailFormPattern}
                  render={({ field: { ref, ...field } }) => (
                    <Input
                      {...field}
                      type="email"
                      name="email"
                      aria-invalid={!!formState.errors?.email}
                      className={localCmp.inputCheckoutField}
                      styleInline={{ marginTop: "-5px" }}
                      style={utils.setErrorStyle(formState?.errors?.email)}
                      errorMessage={
                        formState?.errors?.email
                          ? formState?.errors?.email.message
                          : ''
                      }
                      placeholder="your-email@somewhere.com"
                    />
                  )}
                />

                <button type="submit" className={localCmp.signinBtn}>
                  Proceed to Checkout
                </button>
              </div>
            </form>
            <div className={localCmp.checkoutmessage}>
              If the details above are correct, by clicking on the "Proceed to
              Checkout" button, you will be redirected to our card processing
              partner to finalize your purchase.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StepThree;
