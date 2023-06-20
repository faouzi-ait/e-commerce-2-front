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

  const isAdded = favorites.find((product) => product._id === item._id);
  const isInCart = cart?.find((product) => product._id === item._id);

  return (
    <div
      className={`${
        isRow ? cmpStyle.cardRowContainer : cmpStyle.rowContainer
      }`}>
      <div className={cmpStyle.favoritePositioning}>
        <img
          src={isAdded ? '../icons/heart-full.png' : '../icons/heart.png'}
          alt="favorites"
          className={cmpStyle.favorite}
          onClick={() => {
            isAdded
              ? dispatch(removeFromFavorites(item._id))
              : dispatch(addToFavorites(item));
          }}
        />
      </div>
      <img
        src={item.photo}
        alt="p"
        className={`${isRow ? cmpStyle.rowImage : cmpStyle.image}`}
      />
      <div
        className={`${
          isRow ? cmpStyle.productCardDisplay : cmpStyle.productRowDisplay
        }`}>
        <span>{item.brand}</span>
        <span>{item.description}</span>
        <span>Price: ${item.price}</span>
        <span>Quantity Available: {item.quantity}</span>
        {!showDetails && (
          <div>
            <button
              onClick={() =>
                !isInCart ? dispatch(addItem(item)) : dispatch(addOne(item._id))
              }>
              {!isInCart ? 'Add to cart' : '+ 1 More'}
            </button>
          </div>
        )}
        {showDetails && (
          <div onClick={() => setProductId(item._id)}>
            <button onClick={openModal}>
              View Product <i className="fa fa-eye"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDisplay;
