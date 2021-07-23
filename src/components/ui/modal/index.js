import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function index({ modalIsOpen, closeModal }) {
  const customStyles = {
    content: {
      width: '75%',
      height: '60%',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}>
      <button onClick={closeModal}>close</button>
    </Modal>
  );
}

export default index;
