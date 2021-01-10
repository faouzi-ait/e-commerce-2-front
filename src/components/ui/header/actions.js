import { SET_LANGUAGE } from "./constants";

const setLanguage = (lang) => {
  return {
    type: SET_LANGUAGE,
    lang,
  };
};

export { setLanguage };
