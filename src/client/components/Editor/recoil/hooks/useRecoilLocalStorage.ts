import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { localStorageState } from "../atoms";

export function useRecoilLocalStorage<T>(
  key: string,
  initialValue: () => T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useRecoilState(localStorageState(key));
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValueRef.current());
    } catch (error) {
      if (initialValueRef.current) {
        setStoredValue(initialValueRef.current());
      }
    }
  }, [key, setStoredValue]);

  const setValue = useCallback(
    (value) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      const _valueToStore = JSON.stringify(valueToStore);

      if (JSON.stringify(storedValue) !== _valueToStore) {
        setStoredValue(valueToStore);

        window.localStorage.setItem(key, _valueToStore);
      }
    },
    [key, storedValue, setStoredValue]
  );

  return [storedValue, setValue];
}
