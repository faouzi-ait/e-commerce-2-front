import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '../../../ui/button';

import { t } from '../../../../i18n/translate';

import { cartItems } from '../../../pages/cart/selectors';

import { calculateTotal } from '../../../../utils';

import * as cartStyles from '../../cart/styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import * as localCmp from '../styles.module.scss';

function OrderSummary({ isSticky }) {
  const history = useHistory();
  const { cart } = useSelector(cartItems);

  const btnStyles = `${cmpStyles.signinBtn} ${cartStyles.checkoutBtnWidth} ${cartStyles.checkoutBtnCheckout}`;

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
      className={`${localCmp.orderSummary} ${
        isSticky ? localCmp.navbarSticky : ''
      }`}>
      <p className={`${localCmp.orderSummaryLayout}`}>{t('order')}</p>
      <div className={localCmp.summaryMargin}>
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
          Total: &nbsp;${calculateTotal(cart)}
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;
