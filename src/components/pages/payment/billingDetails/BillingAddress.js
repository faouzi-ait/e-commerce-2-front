import React from 'react';

const BillingAddress = ({ item, children }) => {
  return (
    <>
      <span>
        {item?.firstName} {item?.lastName}
      </span>
      ,&nbsp;
      <span>{item?.billingAddress}</span>
      <div className="spacing">
        <span>{item?.billingCity}</span>,&nbsp;
        <span>{item?.billingCountry?.label}</span>,&nbsp;
        <span>{item?.billingPostcode}</span>
      </div>
      <div>{item?.billingPhone}</div>
    </>
  );
};

export default BillingAddress;
