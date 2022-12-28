import React from 'react';
import * as UI from 'react-accessible-accordion';
import { t } from '../../../../i18n/translate';

export const theadLabels = ['ProductName', 'Quantity', 'Category', 'Price', 'Total'];

export const AccordionItem = ({ label, children }) => {
  return (
    <UI.AccordionItem>
      <UI.AccordionItemHeading>
        <UI.AccordionItemButton>{label}</UI.AccordionItemButton>
      </UI.AccordionItemHeading>
      <UI.AccordionItemPanel>{children}</UI.AccordionItemPanel>
    </UI.AccordionItem>
  );
};

export const TableHead = ({ labels }) => {
  return (
    <>
      <thead>
        <tr>
          {labels?.map((item, i) => (
            <td key={`item-${i}`}>{t(`${item}`)}</td>
          ))}
        </tr>
      </thead>
    </>
  );
};

export const TableBody = ({ basket }) => {
  return (
    <tbody>
      {basket?.cart.map((item, i) => (
        <tr key={`item-${i}`}>
          <td>{item.name}</td>
          <td>x{item.quantity}</td>
          <td>{item.type}</td>
          <td>{item.price}$</td>
          <td>{item.total}$</td>
        </tr>
      ))}
    </tbody>
  );
};
