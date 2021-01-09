import React from 'react';
import { LOCALES } from '../../i18n/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/actions/language';

import { switchTheme } from '../../redux/actions/theme';
import { selectedTheme } from '../../redux/selectors';

// import ToggleButton from '../ui/ToggleButton';
import { logout } from '../../redux/actions/login';

import sun from '../../images/sun.svg';
import night from '../../images/night.svg';

import {
  theme,
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
  const { isDark } = useSelector(selectedTheme);
  const { loggedIn } = useSelector((state) => state.login);

  return (
    <>
      {loggedIn && (
        <ToggleButton
          onClick={() => dispatch(logout())}
          classes={`${theme} ${leftRadius} ${rightRadius} ${marginRight}`}
          content={<img src="./flags/logout.png" alt="logout" width="25" />}
        />
      )}
      <ToggleButton
        onClick={() => dispatch(setLanguage(LOCALES.ENGLISH))}
        classes={`${theme} ${leftRadius} ${right}`}
        content={<img src="./flags/UK_1.png" alt="UK" width="25" />}
      />
      <ToggleButton
        onClick={() => dispatch(setLanguage(LOCALES.FRENCH))}
        classes={theme}
        content={<img src="./flags/FR_2.png" alt="UK" width="21" />}
      />
      <ToggleButton
        onClick={() => dispatch(switchTheme())}
        classes={`${theme} ${rightRadius}`}
        content={
          <img
            src={isDark ? sun : night}
            alt={isDark ? 'dark' : 'light'}
            width="30"
          />
        }
      />
    </>
  );
}

export default ToggleLanguage;
