import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

import Page from '../../components/container';
import Footer from '../../components/footer';
import CartDisplay from '../confirmation/CartDisplay';
import Button from '../../ui/button';

import { basketSelector } from '../../components/header/selectors';
import { trxBilling } from './selector';
import { emptyBasket } from '../../components/product_display/row/actions';

import { t } from '../../../i18n/translate';

import * as action from '../payment/actions';
import * as utils from '../../../utils';

import * as styles from './styles.module.scss';

function CardPaymentConfirmation({ history }) {
  const dispatch = useDispatch();
  const basket = useSelector(basketSelector);
  const { transactionId } = useSelector(trxBilling);
  const user = useSelector((state) => state.tokens.tokens.token);

  const resetCheckoutData = useCallback(() => {
    dispatch(action.saveTransactionId(''));
    dispatch(action.setDeliveryDetails({}));
    dispatch(action.setBillingDetails({}));
    dispatch(emptyBasket());
    dispatch(action.setStep(1));
  }, [dispatch]);

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let sessionId = params.get('confirm_id');

    if (!sessionId || !transactionId) {
      window.location.href = process.env.REACT_APP_FRONT_END;
    }
    // return () => resetCheckoutData();
  }, [dispatch, transactionId, resetCheckoutData]);

  return (
    <Page>
      <div className={styles.confirmationPageLayout}>
        <div className={styles.confirmationPageContent}>
          <h1>{t('confirmationTitle')}</h1>
          <img
            src="images/pngwing.png"
            alt="confirm"
            className="confirm-image"
          />
        </div>
        <p className={styles.purchaseTitle}>{t('confirmMessage')}</p>
        <p>
          {t('orderNumber')} <b>{transactionId}</b>
        </p>
        <hr className={styles.cartWidth} />
        {(basket || []).map((item) => (
          <CartDisplay item={item} key={item._id} />
        ))}
        <div className={styles.totalPaid}>
          Total: ${utils.calculateTotal(basket)}
        </div>
        <p>
          {t('confirmEmailMessage')}: <b>{jwt(user).email}</b>
        </p>
        <Button
          label="Back to Shopping"
          onClick={() => {
            resetCheckoutData();
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
export default CardPaymentConfirmation;
