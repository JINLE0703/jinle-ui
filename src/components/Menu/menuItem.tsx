import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  className?: string; // 类名
  style?: React.CSSProperties; // 样式
  index: number; // 索引
  disabled?: boolean; // 禁用
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, index, disabled, children = false } = props;
  const { currentIndex, onSelect } = useContext(MenuContext); // 接收父级 context
  const classes = classNames('jinle-menu-item', className, {
    'jinle-menu-item-disabled': disabled,
    'jinle-menu-item-selected': currentIndex === index && !disabled,
  });
  const handleClick = () => {
    if (onSelect && !disabled) {
      onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
