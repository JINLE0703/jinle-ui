import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
// import alertDemo from './demos/alert';
import Alert from './components/Alert/alert'

function App() {
  return (
    <div className="App">
      <Button></Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large} disabled> Hello </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}> Hello </Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.Small} href='https://cn.bing.com/' target="_blank"> Hello </Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.Large} disabled href='www.baidu.com'> Hello </Button>
      <Alert message="this is msg" />
      <Alert message="this is msg" title="this is title" type="danger" />
      <Alert message="this is msg" type="warning" closable={false} />
      <Alert message="this is msg" title="this is title" type="success" />
    </div>
  );
}

export default App;
