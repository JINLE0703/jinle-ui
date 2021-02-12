import React, { useState } from 'react';
import Input, { InputProps } from '../Input/input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**触发自动补全的回调函数 */
  fetchSuggestions: (str: string) => string[];
  /**点击下拉框任意一项回调函数 */
  onSelect?: (item: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  /**
   * 处理 input value 改变事件
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  /**
   * 处理点击下拉框内容事件
   * @param item 选中内容
   */
  const handleSelected = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  /**
   * 渲染下拉菜单内容
   */
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelected(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="jinle-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
