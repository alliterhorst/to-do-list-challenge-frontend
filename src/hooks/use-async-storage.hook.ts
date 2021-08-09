import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertToPersistStorage } from '../common/util.common';

export function useAsyncStorage<T>(
  key: string,
  parse: (string: string) => T,
  initialValue?: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>();
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value: string) => {
        if (value === null) return initialValue;
        return parse(value);
      })
      .then(setStoredValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = (value: T): void => {
    AsyncStorage.setItem(key, convertToPersistStorage(value)).finally(() =>
      setStoredValue(value),
    );
  };

  return [storedValue as T, setValue];
}
