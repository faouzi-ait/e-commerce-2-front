import React from 'react';

const DeliveryAddress = ({ item }) => {
  return (
    <>
      <div>
        <span>
          {item?.firstName} {item?.lastName},&nbsp;
        </span>
        <span>{item?.deliveryAddress}</span>
      </div>
      <div className="spacing">
        <span>{item?.deliveryCity}</span>,&nbsp;
        <span>{item?.deliveryCountry?.label}</span>,&nbsp;
        <span>{item?.deliveryPostcode}</span>
      </div>
      <div>{item?.deliveryPhone}</div>
    </>
  );
};

export default DeliveryAddress;
