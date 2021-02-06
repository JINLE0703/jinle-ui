import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  className: 'test',
  defaultIndex: 0,
  onSelect: jest.fn(),
};

const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: 0,
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>third</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  test('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('jinle-menu jinle-menu-horizontal test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('jinle-menu-item jinle-menu-item-selected');
    expect(disabledElement).toHaveClass('jinle-menu-item jinle-menu-item-disabled');
  });
  test('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('third');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('jinle-menu-item-selected');
    expect(activeElement).not.toHaveClass('jinle-menu-item-selected');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(activeElement).not.toHaveClass('jinle-menu-item-selected');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  test('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('jinle-menu-vertical');
  });
});
