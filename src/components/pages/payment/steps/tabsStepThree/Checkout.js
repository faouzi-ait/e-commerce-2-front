import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useStripe } from '@stripe/react-stripe-js';
import uuid from 'react-uuid';
import jwt from 'jwt-decode';
import axios from 'axios';

import Input from '../../../../ui/input';

import { saveTransactionId } from '../../actions';

// import { t } from '../../../../../i18n/translate';
import * as utils from '../../../../../utils';

import * as localCmp from '../../styles.module.scss';

// const API_LOCAL = process.env.REACT_APP_URL_DEV;
const API_PROD = process.env.REACT_APP_URL_PROD;

const Checkout = ({ basket }) => {
  const stripe = useStripe();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.tokens?.tokens?.token);
  const { email } = jwt(token);
  const [customer_email] = useState(email);

  const { handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
    defaultValues: { email: customer_email },
  });

  console.log(customer_email);

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
    <>
      <form
        onSubmit={handleSubmit(handleCheckoutSubmit)}
        className={localCmp.form}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                styleInline={{ marginTop: '-5px' }}
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
          <div style={{ marginLeft: "5px" }}></div>
          <button type="submit" className={localCmp.signinBtn}>
            Go to Checkout
          </button>
        </div>
      </form>
      <div className={localCmp.checkoutmessage}>
        If the details above are correct, by clicking on the "Proceed to
        Checkout" button, you will be redirected to our card processing partner
        to finalize your purchase.
      </div>
    </>
  );
};

export default Checkout;
