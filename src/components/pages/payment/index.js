import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '../../ui/button';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import Footer from '../../components/footer';

import { selectedTheme } from '../../components/toggles/selectors';
import { THEMES } from '../../components/toggles/constants';
import { cartItems } from '../../pages/cart/selectors';

import { basketData } from './selectors';
import { setStep } from './actions';

import useSticky from '../../../hooks/useSticky';
import { t } from '../../../i18n/translate';

import * as cartStyles from '../cart/styles.module.scss';
import * as cmpStyles from '../login/styles.module.scss';
import * as localCmp from './styles.module.scss';

function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(cartItems);
  const { isDark } = useSelector(selectedTheme);
  const { isSticky, element } = useSticky();
  const { step } = useSelector(basketData);

  const btnStyles = `${cmpStyles.signinBtn} ${cartStyles.checkoutBtnWidth} ${cartStyles.checkoutBtnCheckout}`;

  const calculateTotal = (cart) =>
    cart.reduce((acc, item) => acc + item.total, 0);

  const CartSummary = ({ item }) => {
    return (
      <div className={localCmp.orderSummaryItems} key={item._id}>
        <div className={localCmp.marginFix}>{item.name}</div>
        <div>x{item.quantity}</div>
        <div>{item.price}$</div>
        <div>{item.total}$</div>
      </div>
    );
  };

  return (
    <div
      className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT}`}
      ref={element}>
      <div className={localCmp.cartPageLayout}>
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && (
          <div className={localCmp.clentDetails}>
            <p>Details Summary</p>
            <p>Submit Order</p>
            <Button
              label="Previous"
              onClick={() => dispatch(setStep(step - 1))}
              className={btnStyles}
              type="button"
            />
          </div>
        )}
        <div
          className={`${localCmp.orderSummary} ${
            isSticky ? localCmp.navbarSticky : ''
          }`}>
          <p className={`${localCmp.orderSummaryLayout}`}>{t('order')}</p>
          <div style={{ marginTop: '-2.85rem' }}>
            {cart.map((item) => (
              <CartSummary item={item} key={item._id} />
            ))}
          </div>
          <div className={localCmp.summaryTotal}>
            <Button
              label={t('backToCart')}
              onClick={() => history.push('/checkout')}
              className={`${btnStyles} ${localCmp.backToCart}`}
              type="button"
            />
            <span className={localCmp.totalSection}>
              Total: {calculateTotal(cart)}$
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
