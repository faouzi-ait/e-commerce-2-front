import React from 'react';
import Modal from '../../modal';
import {
  rowContainer,
  image,
  productRowDisplay,
  container,
} from './styles.module.scss';

function Card({ products, category }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { items } = products?.data;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className={container}>{category.label}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridRowGap: '1.1rem',
          gridColumnGap: '3rem',
          marginBottom: '5rem',
          padding: '2rem 2rem 0 0',
        }}>
        {(items || []).map((item, i) => (
          <div className={rowContainer} key={item._id}>
            <img src={item.photo} alt="product" className={image} />
            <div className={productRowDisplay}>
              <span>{item.brand}</span>
              <span>{item.description}</span>
              <span>Model: {item.name}</span>
              <span>Price: ${item.price}</span>
              <span>Quantity Available: {item.quantity}</span>
              <div>
                <button onClick={openModal}>
                  View Product <i className="fa fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
}

export default Card;
