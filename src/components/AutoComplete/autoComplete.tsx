import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

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
  const [hightlightIndex, setHightlightIndex] = useState(-1);
  /**判断是否进行搜索 */
  const triggerSearch = useRef(false);
  /**autocomplete ref */
  const autoCompleteElementRef = useRef<HTMLDivElement>(null);
  /**防抖 */
  const debounceValue = useDebounce(inputValue, 500);

  /**绑定点击外部事件 */
  useClickOutside(autoCompleteElementRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
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
    setHightlightIndex(-1);
  }, [debounceValue]);

  /**
   * 处理 input value 改变事件
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
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
    triggerSearch.current = false;
  };

  /**
   * 设置高亮 index
   * @param index
   */
  const hightlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHightlightIndex(index);
  };

  /**
   * 处理键盘事件
   * @param e
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        /**回车 */
        suggestions[hightlightIndex] && handleSelected(suggestions[hightlightIndex]);
        break;
      case 38:
        /**向上 */
        hightlight(hightlightIndex - 1);
        break;
      case 40:
        /**向下 */
        hightlight(hightlightIndex + 1);
        break;
      case 27:
        /**esc */
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  /**
   * 处理下拉项自定义模板
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
          const itemCLasses = classNames('jinle-suggestion-item', {
            'jinle-suggestion-item-hightlighted': index === hightlightIndex,
          });
          return (
            <li key={index} className={itemCLasses} onClick={() => handleSelected(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="jinle-auto-complete" ref={autoCompleteElementRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {loading && <Icon icon="spinner" spin />}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
