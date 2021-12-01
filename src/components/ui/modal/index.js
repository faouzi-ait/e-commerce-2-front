import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import Stars from '../../ui/product_display/sidebar/stars/Stars';
import { addItem, addOne } from '../../ui/product_display/row/actions';
import { getRelatedProducts } from './actions';
import {
  img,
  relatedProducts,
  relatedProductsTitle,
  modalContent,
  review,
  productDetails,
  closeBtn,
  buyBtn,
  imgAlignment,
  productPrice,
  productAvailability,
  productNotAvailable,
  buyBtnDeactivated,
  relatedProductContainer,
  relatedProductImg,
  relatedProductsBrand,
} from './styles.module.scss';

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
  const { cart } = useSelector((state) => state?.basket);
  const { products } = useSelector((state) => state?.products);
  const { data } = useSelector((state) => state?.relatedProducts);

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
            className={buyBtn}
          />
        ) : (
          <Button
            label="+ 1 More"
            onClick={() => dispatch(addOne(item._id))}
            className={buyBtn}
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
            className={`${productAvailability}`}
          />
        ) : (
          <Label
            label="This item is no longer available"
            className={`${productAvailability} ${productNotAvailable}`}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    const category = item?.category?._id;
    dispatch(getRelatedProducts(`${productId}/${category}`));
  }, [dispatch, productId, item]);

  // console.log(product);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}>
      <div>
        <div className={imgAlignment}>
          <img
            src="/icons/close.svg"
            alt="close"
            onClick={closeModal}
            className={closeBtn}
          />
        </div>
        <div className={modalContent}>
          <div>
            <img src={item?.photo} alt="product" className={img} />
          </div>
          <div className={productDetails}>
            <h1>{item?.name}</h1>
            <h2>{item?.description}</h2>
            <div className={review}>
              {item?.totalReviews === 0 ? (
                <span>There are no reviews for this product</span>
              ) : (
                <>
                  <Stars starrating={item?.reviews} />
                  <span>{item?.totalReviews}</span>
                </>
              )}
            </div>
            <h3 className={productPrice}>Price: £{item?.price}</h3>
            {item?.quantity > 0 ? (
              <DisplayButtons inCart={productInCart} />
            ) : (
              <Button
                label="Not Available"
                className={`${buyBtn} ${buyBtnDeactivated}`}
              />
            )}
            <DisplayLabel stock={item?.quantity} />
          </div>
        </div>
        <div className={relatedProducts}>
          <div className={relatedProductsTitle}>Customers also bought</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
            {data?.products.map((item) => (
              <div className={relatedProductContainer}>
                <img
                  src={item.photo}
                  alt="product"
                  className={relatedProductImg}
                />
                <span className={relatedProductsBrand}>{item.brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
