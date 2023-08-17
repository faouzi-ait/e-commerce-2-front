import React from 'react';
import PropType from 'prop-types';

const NavigationBtn = ({ pageNb, label, className, onClick, ...rest }) => {
  return (
    <>
      {pageNb ? (
        <button
          type="button"
          onClick={onClick}
          className={className}
          tabIndex={0}
          {...rest}>
          {label}
        </button>
      ) : null}
    </>
  );
};

NavigationBtn.propTypes = {
  pageNb: PropType.number,
  label: PropType.oneOfType([
    PropType.string,
    PropType.number,
    PropType.element,
  ]),
  className: PropType.oneOfType([PropType.string, PropType.object]),
  onClick: PropType.func,
};

NavigationBtn.defaultProps = {
  pageNb: null,
  label: null,
  className: null,
  onClick: () => {},
};

export default NavigationBtn;
