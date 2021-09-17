import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';

import { img } from './styles.module.scss';

Modal.setAppElement('#root');

function ProductModal({ modalIsOpen, closeModal, productId }) {
  const { products } = useSelector((state) => state?.products);
  const customStyles = {
    content: {
      width: '65%',
      height: '70%',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const product = products.data.items.filter((item) => item._id === productId);

  console.log(product[0]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}>
      <div>
        <button onClick={closeModal}>close</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{}}>
          <img src={product[0]?.photo} alt="product" className={img} />
        </div>
        <div style={{ border: '1px solid green', width: '50%' }}>
          content here
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
