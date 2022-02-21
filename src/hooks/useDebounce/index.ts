import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceHandler = debounce(setDebouncedValue, delay);
    debounceHandler(value);
    return () => {
      debounceHandler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}
