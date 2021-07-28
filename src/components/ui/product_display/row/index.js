import React from 'react';
import ProductDisplay from './ProductDisplay';
import Modal from '../../modal';

function Row({ products, category, isRow }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { items } = products?.data;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="container">{category.label}</div>
      <div className={`${isRow ? 'grid-container' : ''}`}>
        {(items || []).map((item) => (
          <ProductDisplay
            isRow={isRow}
            openModal={openModal}
            item={item}
            key={item._id}
          />
        ))}
      </div>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
}

export default Row;
