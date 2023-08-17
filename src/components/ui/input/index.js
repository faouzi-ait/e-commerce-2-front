import React from 'react';
import PropTypes from 'prop-types';

function Input({
  type,
  onChange,
  label,
  labelId,
  name,
  id,
  value,
  classname,
  labelClassName,
  labelStyle,
  style,
  containerClass,
  placeholder,
  disabled,
  checked,
  errorMessage,
  isContrast = false,
  styleInline,
  ...rest
}) {
  return (
    <div className={containerClass}>
      <label
        htmlFor={name}
        aria-label={name}
        id={name}
        className={labelClassName}
        style={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        aria-labelledby={name}
        value={value}
        style={style}
        className={classname}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        checked={checked}
        {...rest}
      />
      {errorMessage && (
        <div
          style={styleInline}
          className={`${
            !isContrast ? 'form-field-error' : 'form-field-error_contrast'
          }`}
          role="alert">
          {errorMessage}
        </div>
      )}
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
