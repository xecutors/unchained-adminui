/* eslint-disable no-console */
import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const { localStorage } = window;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (localStorage) {
        const item = localStorage.getItem(key);
        return item || initialValue;
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      if (localStorage) {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        console.log('localStorage is not available');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
