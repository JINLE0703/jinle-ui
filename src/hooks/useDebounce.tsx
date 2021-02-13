import { useState, useEffect } from 'react';

export default function useDebounce(value: any, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(()=>{
    const timer = window.setTimeout(()=>{
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceValue;
}
