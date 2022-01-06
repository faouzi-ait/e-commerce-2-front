import { useEffect, useState, useRef, useCallback } from 'react';

function useSticky() {
  const [isSticky, setSticky] = useState(false);
  const element = useRef(null);

  // This function handles the scroll performance issue
  // eslint-disable-next-line
  const debounce = useCallback((func, wait = 10, immediate = true) => {
    let timeOut;
    return () => {
      let context = this,
        args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }, []);

  const handleScroll = useCallback(() => {
    window.scrollY > element?.current?.getBoundingClientRect()?.top + 100
      ? setSticky(true)
      : setSticky(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [debounce, handleScroll]);

  return { isSticky, element };
}

export default useSticky;
