import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from 'react-accessible-accordion';

import Input from '../../../ui/input';
import Button from '../../../ui/button';
import Title from '../../../components/payment_title';
import DeliveryAddress from '../billingDetails/DeliveryAddress';
import BillingAddress from '../billingDetails/BillingAddress';

import { AccordionItem, TableHead, TableBody, theadLabels } from './StepsUI';

import { setStep } from '../actions';
import { t } from '../../../../i18n/translate';
import { calculateTotal } from '../../../../utils';

import * as localCmp from '../styles.module.scss';
import * as cmpStyles from '../../login/styles.module.scss';
import 'react-accessible-accordion/dist/fancy-example.css';

function StepThree({ step, billing, basket, delivery }) {
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={localCmp.clentDetails}>
      <div className={`${cmpStyles.form} ${localCmp.form}`}>
        <Title
          title={t('step3')}
          currentLabel={t('step')}
          currentStep={`${step} / 3`}
        />
        <hr />
        <h4 className={localCmp.stepTwoTitle}>{t('OrderPageTitle')}</h4>
        <table>
          <TableHead labels={theadLabels} />
          <TableBody basket={basket} />
        </table>
        <div className={localCmp.stepThreeTotal}>
          {t('Total')}: {calculateTotal(basket?.cart)}$
        </div>
        <hr />
        <UI.Accordion allowMultipleExpanded allowZeroExpanded>
          <AccordionItem label={t('BillingLabel')}>
            <BillingAddress item={billing} />
            <Button
              label={t('backToStep1')}
              onClick={() => dispatch(setStep(1))}
              className="update-btn"
              type="button"
            />
          </AccordionItem>
          <AccordionItem label={t('DeliveryLabel')}>
            <DeliveryAddress item={delivery} />
            <Button
              label={t('backToStep2')}
              onClick={() => dispatch(setStep(2))}
              className="update-btn"
              type="button"
            />
          </AccordionItem>
        </UI.Accordion>
        <div className={localCmp.confirmationBox}>
          <Input
            type="checkbox"
            name="confirmation"
            id="confirmation"
            checked={confirmation}
            onChange={(e) => setConfirmation(!confirmation)}
            disabled={false}
          />
          <label htmlFor="confirmation" className={localCmp.confirmationLabel}>
            {t('confirmation')}
          </label>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
