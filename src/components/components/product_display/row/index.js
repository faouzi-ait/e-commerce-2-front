import React from 'react';
import ProductDisplay from './ProductDisplay';
import Modal from '../../../ui/modal';

import { container, gridContainer } from './styles.module.scss';

function Row({ products, /* category, */ isRow }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
  const { items } = products.data;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className={container}></div>
      <div className={`${isRow ? gridContainer : ''}`}>
        {(items || []).map((item) => (
          <ProductDisplay
            key={item._id}
            isRow={isRow}
            item={item}
            openModal={openModal}
            setProductId={setProductId}
          />
        ))}
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        productId={productId}
      />
    </>
  );
}

export default Row;
