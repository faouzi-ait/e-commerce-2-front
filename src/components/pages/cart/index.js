import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../../components/footer';
import Page from '../../../components/components/container';

import useSticky from '../../../hooks/useSticky';

import {
  addOne,
  removeOne,
  removeItem,
} from '../../components/product_display/row/actions';

import { loginStatus } from '../../pages/login/selector';
import { cartItems } from './selectors';

import * as localStyles from './styles.module.scss';
import * as cmpStyles from '../login/styles.module.scss';

function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSticky, element } = useSticky();
  const { cart } = useSelector(cartItems);
  const { loggedIn } = useSelector(loginStatus);

  const calculateTotal = (cart) =>
    cart.reduce((acc, item) => acc + item.total, 0);

  const DisplayBasketHeader = ({ basketTitle, priceTitle }) => {
    return (
      <>
        <div className={localStyles.cartHeader}>
          <h1>{basketTitle}</h1>
          {/* <h1>{priceTitle}</h1> */}
        </div>
        <hr />
      </>
    );
  };
  const DisplayProductPhoto = ({ item, className }) => {
    return (
      <div>
        <img src={item.photo} alt="product" className={className} />
      </div>
    );
  };
  const DisplayProductInfo = ({ label, data, style }) => {
    return (
      <div className={style}>
        <span className={localStyles.labelBold}>{label}</span>
        {label === 'Total:' ? ' $' : null} {data}
      </div>
    );
  };
  const CartQuantity = ({ onClick, label, className, style, ...rest }) => {
    return (
      <button onClick={onClick} className={className} style={style} {...rest}>
        {label}
      </button>
    );
  };

  const DisplayBasketScreen = ({ item }) => {
    return (
      <div className={localStyles.productContainer}>
        <DisplayProductPhoto item={item} className={localStyles.image} />
        <div className={localStyles.productDetails}>
          <div className={cmpStyles.cartItemContainer}>
            <DisplayProductInfo
              data={item.description}
              style={localStyles.productTitle}
            />
          </div>
          <DisplayProductInfo
            label="Category:"
            data={item.category.name}
            style={localStyles.productData}
          />
          <DisplayProductInfo
            label="Quantity:"
            data={item.quantity}
            style={localStyles.productData}
          />
          <div className={cmpStyles.cartQuantityContainer}>
            <CartQuantity
              label="+"
              onClick={() => dispatch(addOne(item._id))}
              className={`${cmpStyles.signinBtn} ${localStyles.cartQuantityBtn}`}
            />
            <CartQuantity
              label="-"
              onClick={() => dispatch(removeOne(item._id))}
              className={`${cmpStyles.signinBtn} ${localStyles.cartQuantityBtn}`}
            />
            <CartQuantity
              label="x"
              onClick={() => dispatch(removeItem(item._id))}
              className={`${cmpStyles.signinBtn} ${localStyles.cartQuantityBtn}`}
            />
          </div>
          <DisplayProductInfo
            label="Total:"
            data={item.total}
            style={localStyles.productTotal}
          />
        </div>
      </div>
    );
  };

  return (
    <Page>
      {cart.length ? (
        <div
          className={localStyles.cartPageLayout}
          ref={cart.length ? element : null}>
          <div className={localStyles.basketSection}>
            <DisplayBasketHeader
              basketTitle="Shopping Basket"
              priceTitle="Price"
            />
            {cart.map((item) => (
              <DisplayBasketScreen key={item._id} item={item} />
            ))}
          </div>
          <div
            className={`${localStyles.pricingSection} ${
              cart.length && isSticky ? localStyles.navbarSticky : ''
            }`}>
            <div>
              Subtotal {`(${cart.length} items)`}:
              <span className={cmpStyles.cartTotal}>
                ${calculateTotal(cart)}
              </span>
              <button
                className={`${cmpStyles.signinBtn} ${localStyles.checkoutBtnWidth}`}>
                <span
                  className={`${localStyles.checkoutBtnWidth}`}
                  onClick={() => {
                    if (loggedIn) {
                      history.push('/payment');
                    } else {
                      history.push('/login?redirect=payment');
                    }
                  }}>
                  Proceed to Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={localStyles.cartImage}>
          <img
            src="./images/cart-empty.png"
            alt="cart empty"
            className={localStyles.emptyCart}
          />
          <span
            className={`${cmpStyles.signinBtn} ${localStyles.backToShopping}`}
            onClick={() => history.push('/')}>
            Back to shopping
          </span>
        </div>
      )}
      <Footer />
    </Page>
  );
}

export default Cart;
