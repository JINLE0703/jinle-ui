import React from 'react';
import Button from './components/Button/button';
// import alertDemo from './demos/alert';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <h1>Menu</h1>
      <Menu defaultIndex={0} mode='vertical'>
        <MenuItem index={0}>menu-item-1</MenuItem>
        <MenuItem index={1} disabled>
          menu-item-2
        </MenuItem>
        <MenuItem index={2}>menu-item-3</MenuItem>
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
