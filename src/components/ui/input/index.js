import React from 'react';
import PropTypes from 'prop-types';
// import * as cmpStyle from './styles.module.scss';

function Input({
  type,
  onChange,
  label,
  value,
  classname,
  labelClassName,
  labelStyle,
  style,
  containerClass,
  placeholder,
  disabled,
  ...rest
}) {
  return (
    <div className={containerClass}>
      <label className={labelClassName} style={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className={classname}
        style={style}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  classname: PropTypes.object,
  style: PropTypes.object,
  containerClass: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  value: undefined || '',
  disabled: false,
  classname: {},
  style: {},
  containerClass: {},
  onChange: () => {},
  placeholder: '',
  rest: {},
};

export default Input;
