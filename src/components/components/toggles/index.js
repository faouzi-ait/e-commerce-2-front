import React, { useState } from 'react';
import { LOCALES } from '../../../i18n/constants';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../pages/login/actions';

import { setLanguage } from '../header/actions';

import { switchTheme } from '../../components/toggles/actions';
import { selectedTheme } from '../../components/toggles/selectors';
// import { loginStatus } from '../../route-access/selectors';

import sun from '../../../images/sun.svg';
import night from '../../../images/night.svg';

import * as cmpStyles from './styles.module.scss';

const ToggleButton = (props) => {
  return (
    <button
      type="button"
      tabIndex="0"
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      className={props.classes}
      {...props}>
      {props.content}
    </button>
  );
};

function ToggleLanguage() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isDark } = useSelector(selectedTheme);
  // const loggedIn = useSelector(loginStatus);

  return (
    <>
      {show && (
        <>
          <ToggleButton
            onClick={() => dispatch(switchTheme())}
            classes={`${cmpStyles.btn} ${cmpStyles.leftRadius}`}
            content={
              <img
                src={isDark ? sun : night}
                alt={isDark ? 'dark' : 'light'}
                width="30"
              />
            }
          />
          <ToggleButton
            onClick={() => dispatch(setLanguage(LOCALES.ENGLISH))}
            classes={`${cmpStyles.btn} ${cmpStyles.right}`}
            content={<img src="/flags/UK_2.png" alt="english" width="25" />}
          />
          <ToggleButton
            onClick={() => dispatch(setLanguage(LOCALES.FRENCH))}
            classes={cmpStyles.btn}
            content={<img src="/flags/FR_2.png" alt="french" width="21" />}
          />
        </>
      )}
      <ToggleButton
        onClick={() => setShow(!show)}
        classes={`${cmpStyles.btn} ${!show && cmpStyles.leftRadius}`}
        content={<img src="/flags/translate.png" alt="translate" width="30" />}
      />
    </>
  );
}

export default ToggleLanguage;
