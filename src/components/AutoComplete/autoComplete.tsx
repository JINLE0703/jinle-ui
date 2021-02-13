import React, { useState, useEffect } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**触发自动补全的回调函数 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**点击下拉框任意一项回调函数 */
  onSelect?: (item: DataSourceType) => void;
  /**自定义下拉项结构 */
  renderOption?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  /**防抖 */
  const debounceValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((res) => {
          setLoading(false);
          setSuggestions(res);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue]);

  /**
   * 处理 input value 改变事件
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };
  /**
   * 处理点击下拉框内容事件
   * @param item 选中内容
   */
  const handleSelected = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  /**
   * 处理下拉项结构模板
   * @param item
   */
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
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
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="jinle-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {loading && <Icon icon="spinner" spin />}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
