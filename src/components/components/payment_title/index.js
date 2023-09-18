import React from 'react';
import PropTypes from 'prop-types';

import * as localStyles from './styles.module.scss';
import * as cmpStyles from '../../pages/login/styles.module.scss';

function Title({ title, currentLabel, currentStep }) {
  return (
    <section className={localStyles.titleAlignment}>
      <p className={cmpStyles.h3}>{title}</p>
      <p className={cmpStyles.h3}>
        {currentLabel} {currentStep}
      </p>
    </section>
  );
}

Title.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  currentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  currentStep: PropTypes.string,
};

Title.defaultProps = {
  title: undefined,
  currentLabel: undefined,
  currentStep: '1',
};

export default Title;
