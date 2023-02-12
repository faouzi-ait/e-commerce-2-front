import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const ModalWrapper = ({
  open,
  onClose,
  style,
  classname,
  overlayClass,
  timeout,
  children,
  ...rest
}) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={style}
      className={classname}
      overlayClassName={overlayClass}
      closeTimeoutMS={timeout}
      {...rest}>
      {children}
    </Modal>
  );
}

ModalWrapper.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.object,
  classname: PropTypes.string,
  overlayClass: PropTypes.string,
  timeout: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  rest: PropTypes.shape({}),
};

ModalWrapper.defaultProps = {
  open: false,
  onClose: () => {},
  style: {},
  classname: 'mymodal',
  overlayClass: 'myoverlay',
  timeout: 500,
  children: '',
  rest: {},
};

export default ModalWrapper;
