import { SWITCH_THEME } from './constants';

export const initialState = {
  isDark: false,
};

export const theme = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      const newTheme = !state.isDark;
      return {
        isDark: newTheme,
      };
    default:
      return state;
  }
};
