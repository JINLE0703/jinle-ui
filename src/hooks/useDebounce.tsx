import { useState, useEffect } from 'react';

/**
 * 防抖函数
 * @param value 改变的值 
 * @param delay 延时时间
 */
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
