import React from 'react';
import Button from './components/Button/button';
// import alertDemo from './demos/alert';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <h1>Menu</h1>
      <Menu defaultIndex="0" onSelect={(index) => alert(index)}>
        <MenuItem>menu-item-1</MenuItem>
        <MenuItem disabled>menu-item-2</MenuItem>
        <MenuItem>menu-item-3</MenuItem>
        <SubMenu title="sub-menu">
          <MenuItem>menu-item-4</MenuItem>
          <MenuItem>menu-item-5</MenuItem>
        </SubMenu>
      </Menu>
      <Menu defaultIndex="0" mode="vertical" onSelect={(index) => alert(index)} defaultOpenSubMenus={['3']}>
        <MenuItem>menu-item-1</MenuItem>
        <MenuItem disabled>menu-item-2</MenuItem>
        <MenuItem>menu-item-3</MenuItem>
        <SubMenu title="sub-menu">
          <MenuItem>menu-item-4</MenuItem>
          <MenuItem>menu-item-5</MenuItem>
          <SubMenu title="sub-menu-2">
            <MenuItem>menu-item-6</MenuItem>
            <MenuItem>menu-item-7</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>

      <h1>Button</h1>
      <Button></Button>
      <Button btnType="danger" disabled size="sm">
        Hello
      </Button>
      <Button btnType="primary" size="lg">
        Hello
      </Button>
      <Button btnType="link" size="lg" href="https://cn.bing.com/" target="_blank">
        Hello
      </Button>
      <Button btnType="link" disabled href="www.baidu.com">
        Hello
      </Button>

      <h1>Alert</h1>
      <Alert message="this is msg" />
      <Alert message="this is msg" title="this is title" type="danger" />
      <Alert message="this is msg" type="warning" closable={false} />
      <Alert message="this is msg" title="this is title" type="success" />
    </div>
  );
}

export default App;
