import React from 'react';
import * as styles from './styles.module.scss';

const PageLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <img src="/images/loading-page.png" alt="load" />
      </div>
    </div>
  );
}

export default PageLoader;
