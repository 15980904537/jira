import { useEffect, useState, useRef } from "react";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  let result = { ...obj };
  Object.keys(result).forEach((item) => {
    let val = result[item];
    if (val === "" || val === undefined || val === null) {
      delete result[item];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T,>(value: T, delay?: number) => {
  let [debounceValue, setdebounceValue] = useState(value);
  useEffect(() => {
    let time = setTimeout(() => {
      setdebounceValue(value);
    }, delay);
    return () => clearTimeout(time);
  }, [value, delay]);
  return debounceValue;
};

export const useDocumentTitle = (
  title: string,
  keepOnmount: boolean = true
) => {
  let oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};

export const resetRoute = () => (window.location.href = window.location.origin);
