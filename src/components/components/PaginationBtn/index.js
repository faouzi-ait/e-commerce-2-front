import React from 'react';
import PropType from 'prop-types';

const NavigationBtn = ({ pageNb, label, className, onClick }) => {
  return (
    <>
      {pageNb ? (
        <span onClick={onClick} className={className}>
          {label}
        </span>
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
