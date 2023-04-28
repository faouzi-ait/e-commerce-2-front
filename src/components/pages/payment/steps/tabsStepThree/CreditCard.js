import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';

import jwt from 'jwt-decode';
import axios from 'axios';

import { saveTransactionId } from '../../actions';

// import * as localCmp from '../../styles.module.scss';

// const API_LOCAL = process.env.REACT_APP_URL_DEV;
const API_PROD = process.env.REACT_APP_URL_PROD;

function CreditCard({ basket, billing, delivery }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const element = useElements();
  const stripe = useStripe();

  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const token = useSelector((state) => state?.tokens?.tokens?.token);
  const { email } = jwt(token);

  const getClientSecret = async () => {
    const cartItems = basket?.cart?.map((item) => ({
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    const shipping = {
      name: `${delivery.firstName} ${delivery.lastName}`,
      address: {
        line1: delivery.deliveryAddress,
        city: delivery.deliveryStates,
        postal_code: delivery.deliveryPostcode,
        country: delivery.deliveryCountry.label,
      },
    };

    const billingDetails = {
      name: `${billing.firstName} ${billing.lastName}`,
      address: {
        line1: billing.billingAddress,
        city: billing.billingStates,
        postal_code: billing.billingPostcode,
        country: billing.billingCountry.label,
      },
    };

    const { data: clientSecret } = await axios.post(
      `${API_PROD}/payment-card`,
      {
        cartItems,
        shipping,
        billingDetails,
        receipt_email: email,
      }
    );

    return clientSecret;
  };

  const handleCardChange = (e) => {
    const { error } = e;
    setError(error ? error?.message : '');
  };

  const handlePayment = async () => {
    setProcessing(true);

    const { clientSecret } = await getClientSecret();
    // eslint-disable-next-line

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: element.getElement(CardNumberElement),
      },
    });

    if (payload.error) setError(`Payment Failed: ${payload.error.message}`);

    setProcessing(false);

    if (payload?.paymentIntent) {
      dispatch(saveTransactionId(payload.paymentIntent.id));
      history.push(`/success-card?confirm_id=${payload.paymentIntent.id}`);
    }
  };

  return (
    <div>
      <div style={{ width: '22%', margin: '1rem 0' }}>
        <img src="/icons/cards.png" alt="cards" />
      </div>
      <div className="stripe-card">
        <CardNumberElement
          className="card-element"
          onChange={handleCardChange}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div className="card-expiry">
          <CardExpiryElement
            className="card-element-expiry"
            onChange={handleCardChange}
          />
        </div>

        <div>
          <CardCvcElement
            className="card-element-cvv"
            onChange={handleCardChange}
          />
        </div>
      </div>

      <div>{error && <p className="error-messge">{error}</p>}</div>

      <div className="submit-btn">
        <button
          disabled={processing ? true : false}
          className="submit-payment"
          onClick={() => handlePayment()}>
          {processing ? 'Processing' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}

export default CreditCard;
