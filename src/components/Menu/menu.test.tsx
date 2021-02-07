import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  className: 'test',
  defaultIndex: '0',
  onSelect: jest.fn(),
};

const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: '0',
  defaultOpenSubMenus: ['4']
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .jinle-submenu {
      display: none;
    }
    .jinle-submenu.jinle-submenu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile()); // 添加样式
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  test('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('jinle-menu jinle-menu-horizontal test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5); // 选择本身节点下的li子节点
    expect(activeElement).toHaveClass('jinle-menu-item jinle-menu-item-selected');
    expect(disabledElement).toHaveClass('jinle-menu-item jinle-menu-item-disabled');
  });
  test('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('third');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('jinle-menu-item-selected');
    expect(activeElement).not.toHaveClass('jinle-menu-item-selected');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(activeElement).not.toHaveClass('jinle-menu-item-selected');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  test('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => expect(wrapper.queryByText('drop1')).toBeVisible());
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => expect(wrapper.queryByText('drop1')).not.toBeVisible());
  });
});

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps));
    wrapper2.container.append(createStyleFile());
  });
  test('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu');
    expect(menuElement).toHaveClass('jinle-menu-vertical');
  });
  test('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1');
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(wrapper2.getByText('dropdown'));
    expect(dropDownItem).toBeVisible();
  });
  test('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible();
  });
});
