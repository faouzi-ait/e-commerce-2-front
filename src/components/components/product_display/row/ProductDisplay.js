import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from './actions';
import {
  addItem,
  addOne,
} from '../../../components/product_display/row/actions';

import * as cmpStyle from './styles.module.scss';

function ProductDisplay({
  isRow,
  openModal,
  item,
  setProductId,
  showDetails = false,
}) {
  const dispatch = useDispatch();
  const { favorites, cart } = useSelector((state) => state.basket);

  const isAdded = favorites?.find((product) => product._id === item._id);
  const isInCart = cart?.find((product) => product._id === item._id);

  return (
    <main
      className={`${
        isRow ? cmpStyle.cardRowContainer : cmpStyle.rowContainer
      }`}>
      <section className={cmpStyle.favoritePositioning}>
        <img
          tabIndex={0}
          aria-label={`${
            isAdded
              ? `${item.name} added to favorites, click to remove`
              : `click here to add ${item.name} to favorites`
          }`}
          src={isAdded ? '../icons/heart-full.png' : '../icons/heart.png'}
          alt="favorites"
          className={cmpStyle.favorite}
          onClick={() => {
            isAdded
              ? dispatch(removeFromFavorites(item._id))
              : dispatch(addToFavorites(item));
          }}
        />
      </section>
      <img
        src={item.photo}
        alt={`${item.brand} product`}
        className={`${isRow ? cmpStyle.rowImage : cmpStyle.image}`}
      />
      <section
        className={`${
          isRow ? cmpStyle.productCardDisplay : cmpStyle.productRowDisplay
        }`}>
        <span
          tabIndex={0}
          aria-label={`${item.brand} product, ${item.description}, priced at ${
            item.price
          } dollars, ${
            item.quantity > 0
              ? 'item currently available'
              : 'product out of stock'
          }`}>
          {item.brand}
        </span>
        <span>{item.description}</span>
        <span>Price: ${item.price}</span>
        <span>Quantity Available: {item.quantity}</span>
        {!showDetails && (
          <button
            type="button"
            style={{ margin: '15px auto' }}
            aria-label={`${
              isInCart ? 'product added already, add 1 more' : 'add to cart'
            }`}
            onClick={() =>
              !isInCart ? dispatch(addItem(item)) : dispatch(addOne(item._id))
            }>
            {!isInCart ? 'Add to cart' : '+ 1 More'}
          </button>
        )}
        {showDetails && (
          <section onClick={() => setProductId(item._id)}>
            <button type="button" onClick={openModal}>
              View Product
            </button>
          </section>
        )}
      </section>
    </main>
  );
}

export default ProductDisplay;
