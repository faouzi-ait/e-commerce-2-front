import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import Stars from '../../ui/product_display/sidebar/stars/Stars';
import { addItem, addOne } from '../../ui/product_display/row/actions';
import { getRelatedProducts } from './actions';
import {
  basketSelector,
  productSelector,
  relatedProductSelector,
} from './selectors';
import * as cmpStyle from './styles.module.scss';

Modal.setAppElement('#root');

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

function ProductModal({ modalIsOpen, closeModal, productId }) {
  const dispatch = useDispatch();
  const { cart } = useSelector(basketSelector);
  const { products } = useSelector(productSelector);
  const { data, loading } = useSelector(relatedProductSelector);

  const product = products.data.items.filter((item) => item._id === productId);
  const productInCart = cart.find((item) => item._id === productId);
  const item = product[0];

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
            onClick={() => dispatch(addItem(item))}
            className={cmpStyle.buyBtn}
          />
        ) : (
          <Button
            label="+ 1 More"
            onClick={() => dispatch(addOne(item._id))}
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
    const category = item?.category?._id;
    dispatch(getRelatedProducts(`${productId}/${category}`));
  }, [dispatch, productId, item]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}>
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
            <img src={item?.photo} alt="product" className={cmpStyle.img} />
          </div>
          <div className={cmpStyle.productDetails}>
            <h1>{item?.name}</h1>
            <h2>{item?.description}</h2>
            <div className={cmpStyle.review}>
              {item?.totalReviews === 0 ? (
                <span>There are no reviews for this product</span>
              ) : (
                <>
                  <Stars starrating={item?.reviews} />
                  <span>{item?.totalReviews}</span>
                </>
              )}
            </div>
            <h3 className={cmpStyle.productPrice}>Price: £{item?.price}</h3>
            {item?.quantity > 0 ? (
              <DisplayButtons inCart={productInCart} />
            ) : (
              <Button
                label="Not Available"
                className={`${cmpStyle.buyBtn} ${cmpStyle.buyBtnDeactivated}`}
              />
            )}
            <DisplayLabel stock={item?.quantity} />
          </div>
        </div>
        <div className={cmpStyle.relatedProducts}>
          <div className={cmpStyle.relatedProductsTitle}>
            Customers also bought
          </div>
          <div className={cmpStyle.productDisplay}>
            {data?.products.map((item) => (
              <div className={cmpStyle.relatedProductContainer} key={item._id}>
                {loading ? (
                  <div className={cmpStyle.loader}></div>
                ) : (
                  <>
                    <img
                      src={item.photo}
                      alt="product"
                      className={cmpStyle.relatedProductImg}
                    />
                    <span className={cmpStyle.relatedProductsBrand}>
                      {item.brand}
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
