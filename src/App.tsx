import React from 'react';
import Button from './components/Button/button';
// import alertDemo from './demos/alert';
import Alert from './components/Alert/alert'

function App() {
  return (
    <div className="App">
      <Button></Button>
      <Button btnType='danger' disabled size='sm'> Hello </Button>
      <Button btnType='primary' size='lg'> Hello </Button>
      <Button btnType='link' size='lg' href='https://cn.bing.com/' target="_blank"> Hello </Button>
      <Button btnType='link' disabled href='www.baidu.com'> Hello </Button>
      <Alert message="this is msg" />
      <Alert message="this is msg" title="this is title" type="danger" />
      <Alert message="this is msg" type="warning" closable={false} />
      <Alert message="this is msg" title="this is title" type="success" />
    </div>
  );
}

export default App;
