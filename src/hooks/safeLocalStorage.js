const setItem = (key, value) => {
  try {
    return localStorage.setItem(key, value);
  } catch (e) {
    console.warn(e);
  }
};

const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(e);
  }
};

const removeItem = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    console.warn(e);
  }
};

const setItemWithExpiration = (key, value, minutes) => {
  const expirationMS = minutes * 60 * 1000;
  const data = { value, timestamp: new Date().getTime() + expirationMS };
  return setItem(key, JSON.stringify(data));
};

const getItemWithExpiration = (key) => {
  const data = getItem(key);
  if (!data) return;
  const { value, timestamp } = JSON.parse(data);
  if (!timestamp || !value) return;
  if (new Date().getTime() < timestamp) {
    return value;
  }
  removeItem(key);
};

/**
 * Sometimes, accessing Storage throws
 * an error for those with ad blockers. We need to
 * wrap each usage of it in a try/catch
 */

export const safeStorage = {
  setItem,
  getItem,
  removeItem,
  setItemWithExpiration,
  getItemWithExpiration,
};
