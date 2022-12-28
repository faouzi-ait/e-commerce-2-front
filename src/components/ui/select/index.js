import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

function SelectWrapper({
  options,
  style,
  classname,
  value,
  onChange,
  defaultValue,
  classNamePrefix,
  ...rest
}) {
  return (
    <Select
      options={options}
      styles={style}
      className={classname}
      value={value}
      classNamePrefix={classNamePrefix}
      onChange={onChange}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}

SelectWrapper.propTypes = {
  options: PropTypes.array,
  onClose: PropTypes.func,
  style: PropTypes.object,
  classname: PropTypes.object,
  // defaultValue: PropTypes.string,
  rest: PropTypes.shape({}),
};

SelectWrapper.defaultProps = {
  options: [],
  onClose: () => {},
  style: {},
  classname: {},
  // defaultValue: 'react-select',
  rest: {},
};

export default SelectWrapper;
