import React, { useState } from 'react';
import { LOCALES } from '../../../i18n/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../pages/login/actions';

import { setLanguage } from '../header/actions';

import { switchTheme } from '../../ui/toggles/actions';
import { selectedTheme } from '../../ui/toggles/selectors';

import sun from '../../../images/sun.svg';
import night from '../../../images/night.svg';

import {
  btn,
  right,
  leftRadius,
  rightRadius,
  marginRight,
} from './styles.module.scss';

function ToggleButton(props) {
  return (
    <button onClick={props.onClick} className={props.classes} {...props}>
      {props.content}
    </button>
  );
}

function ToggleLanguage() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isDark } = useSelector(selectedTheme);
  const { loggedIn } = useSelector((state) => state.login);

  return (
    <>
      {loggedIn && show && (
        <ToggleButton
          onClick={() => dispatch(logout())}
          classes={`${btn} ${leftRadius} ${rightRadius} ${marginRight}`}
          content={<img src="./flags/logout.png" alt="logout" width="25" />}
        />
      )}

      {show && (
        <>
          <ToggleButton
            onClick={() => dispatch(setLanguage(LOCALES.ENGLISH))}
            classes={`${btn} ${leftRadius} ${right}`}
            content={<img src="./flags/UK_1.png" alt="UK" width="25" />}
          />
          <ToggleButton
            onClick={() => dispatch(setLanguage(LOCALES.FRENCH))}
            classes={btn}
            content={<img src="./flags/FR_2.png" alt="UK" width="21" />}
          />
          <ToggleButton
            onClick={() => dispatch(switchTheme())}
            classes={`${btn}`}
            content={
              <img
                src={isDark ? sun : night}
                alt={isDark ? 'dark' : 'light'}
                width="30"
              />
            }
          />
        </>
      )}
      <ToggleButton
        onClick={() => setShow(!show)}
        classes={`${btn} ${!show && leftRadius} ${rightRadius}`}
        content={
          <img
            src={`${!show ? './flags/planet.png' : './flags/planet-full.png'}`}
            alt="UK"
            width="30"
          />
        }
      />
    </>
  );
}

export default ToggleLanguage;
