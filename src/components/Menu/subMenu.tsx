import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const { currentIndex, mode, defaultOpenSubMenus } = useContext(MenuContext); // 接收父级 context
  const openedSubMenus = defaultOpenSubMenus as Array<string>; // 默认展开项数组
  const isOpened = index && mode === 'vertical' ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened); // 菜单展开状态
  const classes = classNames('jinle-menu-item jinle-submenu-item', className, {
    'jinle-menu-item-selected': currentIndex === index,
  });
  // 点击次级菜单
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  // 点击事件集合
  const clickEvents = mode === 'vertical' ? { onClick: handleClick } : {};
  let timer: any;
  // 鼠标移动进出次级菜单
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  // 鼠标进出次级菜单事件集合
  const hoverEvents =
    mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};
  const renderChildren = () => {
    const submenuClasses = classNames('jinle-submenu', {
      'jinle-submenu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error('Warning: Menu has a child with is not a MenuItem component');
      }
    });
    return <ul className={submenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...clickEvents} {...hoverEvents}>
      <div className="jinle-submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
