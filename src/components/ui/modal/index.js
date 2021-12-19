import React, { /*useState, */ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modalWrapper';

import Stars from '../../components/stars';
import { addItem, addOne } from '../../components/product_display/row/actions';
import { getRelatedProducts } from './actions';

import * as sel from './selectors';
import * as cmpStyle from './styles.module.scss';

const customStyles = {
  content: {
    width: '65%',
    height: '75%',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ProductModal({
  modalIsOpen,
  closeModal,
  productId,
  isProduct = false,
  isSearch = false,
}) {
  const dispatch = useDispatch();
  const [items, setItems] = useState(null);
  const { cart } = useSelector(sel.basketSelector);
  const { products } = useSelector(sel.productSelector);
  const { data, loading } = useSelector(sel.relatedProductSelector);

  const search = useSelector(
    (state) => state?.productsBySearch?.searchResults?.data
  );
  const productInCart = cart.find((item) => item._id === productId);
  const searchItem = search?.items?.filter((item) => item._id === productId);
  const product = products?.data?.items?.filter(
    (item) => item._id === productId
  );

  const Button = ({ label, onClick, className, ...rest }) => {
    return (
      <div onClick={onClick} className={className} {...rest}>
        <span>{label}</span>
      </div>
    );
  };

  const DisplayButtons = ({ inCart }) => {
    return (
      <div>
        {!inCart ? (
          <Button
            label="Add to cart"
            onClick={() => dispatch(addItem(items))}
            className={cmpStyle.buyBtn}
          />
        ) : (
          <Button
            label="+ 1 More"
            onClick={() => dispatch(addOne(items._id))}
            className={cmpStyle.buyBtn}
          />
        )}
      </div>
    );
  };

  const Label = ({ label, className }) => {
    return <span className={className}>{label}</span>;
  };

  const DisplayLabel = ({ stock }) => {
    return (
      <div>
        {stock > 0 ? (
          <Label
            label="Item available in stock"
            className={`${cmpStyle.productAvailability}`}
          />
        ) : (
          <Label
            label="This item is currently out of stock"
            className={`${cmpStyle.productAvailability} ${cmpStyle.productNotAvailable}`}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    if (isProduct) {
      setItems(product[0]);
    } else if (isSearch) {
      setItems(searchItem[0]);
    }
  }, [product, searchItem, isProduct, isSearch]);

  useEffect(() => {
    const category = items?.category?._id;

    if (category !== null && category !== undefined && category !== '') {
      dispatch(getRelatedProducts(`${productId}/${category}`));
    }
  }, [dispatch, productId, items]);

  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      style={customStyles}
      timeout={500}>
      <div>
        <div className={cmpStyle.imgAlignment}>
          <img
            src="/icons/close.svg"
            alt="close"
            onClick={closeModal}
            className={cmpStyle.closeBtn}
          />
        </div>
        <div className={cmpStyle.modalContent}>
          <div>
            <img src={items?.photo} alt="product" className={cmpStyle.img} />
          </div>
          <div className={cmpStyle.productDetails}>
            <h1>{items?.name}</h1>
            <h2>{items?.description}</h2>
            <div className={cmpStyle.review}>
              {items?.totalReviews === 0 ? (
                <span>There are no reviews for this product</span>
              ) : (
                <>
                  <Stars starrating={items?.reviews} />
                  <span>{items?.totalReviews}</span>
                </>
              )}
            </div>
            <h3 className={cmpStyle.productPrice}>Price: £{items?.price}</h3>
            {items?.quantity > 0 ? (
              <DisplayButtons inCart={productInCart} />
            ) : (
              <Button
                label="Not Available"
                className={`${cmpStyle.buyBtn} ${cmpStyle.buyBtnDeactivated}`}
              />
            )}
            <DisplayLabel stock={items?.quantity} />
          </div>
        </div>
        <div className={cmpStyle.relatedProducts}>
          <div className={cmpStyle.relatedProductsTitle}>
            Customers also bought
          </div>
          <div className={cmpStyle.productDisplay}>
            {data?.products.map((items) => (
              <div className={cmpStyle.relatedProductContainer} key={items._id}>
                {loading ? (
                  <div className={cmpStyle.loader}></div>
                ) : (
                  <>
                    <img
                      src={items.photo}
                      alt="product"
                      className={cmpStyle.relatedProductImg}
                    />
                    <span className={cmpStyle.relatedProductsBrand}>
                      {items.brand}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
