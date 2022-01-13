import React from 'react';
import PropTypes from 'prop-types';

function Button({ label, onClick, className, style, type, value, ...rest }) {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      className={className}
      style={style}
      {...rest}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: '',
  type: 'button',
  value: '',
  className: {},
  style: {},
  onClick: () => {},
  rest: {},
};

export default Button;
