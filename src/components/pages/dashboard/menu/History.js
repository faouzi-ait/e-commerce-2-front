import React from 'react';
import { historyLayout, listingDisplay } from '../styles.module.scss';

function History({ orders }) {
  return (
    <div>
      <ul className={listingDisplay}>
        {orders?.map((item, i) => (
          <div className={historyLayout} key={i}>
            <li>
              <span>
                Order Date:{' '}
                {new Date(item.createdAt).toLocaleDateString('en-GB')}
              </span>
              <span style={{ marginLeft: '3rem' }}>
                Payment Method: {item.paymentMethod}
              </span>
              <table style={{ marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Brand</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                {item?.purchasedItems?.map((product, i) => (
                  <tbody key={i}>
                    <tr>
                      <td>
                        <img src={product.photo} alt="product" width="35px" />
                      </td>
                      <td>{product.brand}</td>
                      <td>{product.type}</td>
                      <td>{product.quantity}</td>
                      <td>£{product.unitPrice}</td>
                      <td>£{product.totalPrice}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default History;
