import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

import Page from '../../../components/components/container';
import Footer from '../../components/footer';
import Button from '../../ui/button';

import { basketSelector } from '../../components/header/selectors';
import { trxBilling } from './selector';

import {
  saveTransactionId,
  setDeliveryDetails,
  setBillingDetails,
  setStep,
} from '../payment/actions';
import { emptyBasket } from '../../components/product_display/row/actions';
import * as utils from '../../../utils';

import {} from './styles.module.scss';

function Confirmation({ history }) {
  const dispatch = useDispatch();
  const basket = useSelector(basketSelector);
  const user = useSelector((state) => state.tokens.tokens.token);
  const { transactionId } = useSelector(trxBilling);

  const total = basket.reduce(function (acc, val) {
    return acc + val.total;
  }, 0);

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let name = params.get('session_id');

    if (name) {
      setTimeout(() => {
        // window.location.href = 'http://localhost:3000/dashboard';
      }, 2500);
    } else {
      window.location.href = 'http://localhost:3000/';
    }

    return () => {
      dispatch(saveTransactionId(''));
      dispatch(setDeliveryDetails({}));
      dispatch(setBillingDetails({}));
      dispatch(emptyBasket());
      dispatch(setStep(1));
    };
  }, [dispatch]);

  return (
    <Page>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '60vw',
          height: '60vh',
          borderRadius: '5px',
          marginLeft: '20%',
          marginBottom: '8%',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <h1>Your order has been received</h1>
          <img
            src="images/pngwing.png"
            alt="confirm"
            className="confirm-image"
          />
        </div>
        <p style={{ fontSize: '2rem' }}>Thank you for your purchase</p>
        <p>
          Your order reference number is: <b>{transactionId}</b>
        </p>
        <hr style={{ width: '58%' }} />
        {(basket || []).map((item) => (
          <>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                marginLeft: '25%',
                marginBottom: '10px',
              }}>
              <img src={item.photo} alt="product" className="confirm-product" />
              <div style={{ fontSize: '1.25rem' }}>
                <div style={{ fontWeight: 'bold' }}>{item.description}</div>
                <div>
                  Unit Price: ${item.price} | Quantity: {item.quantity}
                </div>
                <div>Total: ${item.price * item.quantity}</div>
              </div>
            </div>
          </>
        ))}
        <div style={{ fontWeight: 'bold' }}>Total Paid: ${total}</div>
        <p>
          You will receive an email shortly to confirm your order at:{' '}
          <b>{jwt(user).email}</b>
        </p>
        <Button
          label="Back to Shopping"
          onClick={() => {
            dispatch(saveTransactionId(''));
            dispatch(setDeliveryDetails({}));
            dispatch(setBillingDetails({}));
            dispatch(emptyBasket());
            dispatch(setStep(1));
            history.push('/');
          }}
          className={utils.btnStyles()}
          type="button"
        />
      </div>
      <Footer />
    </Page>
  );
}
export default Confirmation;
