import React from 'react';
import PropTypes from 'prop-types';
// import * as cmpStyle from './styles.module.scss';

function Input({
  type,
  onChange,
  label,
  value,
  classname,
  style,
  containerClass,
  placeholder,
  ...rest
}) {
  return (
    <div className={containerClass}>
      <label>{label}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className={classname}
        style={style}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  classname: PropTypes.object,
  style: PropTypes.object,
  containerClass: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  type: 'text',
  value: null,
  classname: {},
  style: {},
  containerClass: {},
  onChange: () => {},
  placeholder: '',
  rest: {},
};

export default Input;
