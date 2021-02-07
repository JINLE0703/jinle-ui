import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  className?: string; // 类名
  style?: React.CSSProperties; // 样式
  index?: string; // 索引
  disabled?: boolean; // 禁用
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, index, disabled = false, children } = props;
  const { currentIndex, onSelect } = useContext(MenuContext); // 接收父级 context
  const classes = classNames('jinle-menu-item', className, {
    'jinle-menu-item-disabled': disabled,
    'jinle-menu-item-selected': currentIndex === index && !disabled,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect && !disabled && typeof index === 'string') {
      onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
