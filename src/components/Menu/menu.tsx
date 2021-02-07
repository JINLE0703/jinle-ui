import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical'; // 水平 | 垂直
type SelectCallback = (selectedIndex: string) => void; // 被选中时调用函数

export interface MenuProps {
  className?: string; // 类名
  defaultIndex?: string; // 默认 active 菜单索引
  mode?: MenuMode; // 菜单类型
  style?: React.CSSProperties; // 根节点样式
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[]; // 垂直菜单默认展开项数组
}

interface IMenuContext {
  currentIndex: string; // 当前被选中 index
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]; // 垂直菜单默认展开项数组
}

// 初始化一个 context
export const MenuContext = createContext<IMenuContext>({ currentIndex: '0' });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex = '0', mode = 'horizontal', style, children, onSelect, defaultOpenSubMenus = [] } = props;
  const [currentActive, setActive] = useState(defaultIndex); // 存储当前被选中的索引
  const classes = classNames('jinle-menu', className, {
    [`jinle-menu-${mode}`]: mode,
  });
  // 处理被点击事件
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  // 实例化 context
  const passedContext: IMenuContext = {
    currentIndex: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  // 限制子节点
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
        // 默认赋值 index
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Warning: Menu has a child with is not a MenuItem component');
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

export default Menu;
