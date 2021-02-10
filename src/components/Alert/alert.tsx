import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';

export type AlertType = 'primary' | 'success' | 'danger' | 'warning';

interface BaseAlertProps {
  /**设置类名 */
  className?: string;
  /**设置类型，支持 primary、success、danger、warning */
  type?: AlertType;
  /**设置显示隐藏关闭按钮 */
  closable?: boolean;
  /**设置标题 */
  title?: string;
  /**设置内容，必填项 */
  message: string;
  /**关闭事件回调函数 */
  onClose?: () => void;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { className, type, closable, title, message, onClose } = props;

  // 控制组件显示隐藏
  const [show, setShow] = useState(true);

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  });

  const handleClick = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {show ? (
        <div className={classes}>
          {title ? <h4 className="alert-title">{title}</h4> : null}
          <p className="alert-msg">{message}</p>
          {closable ? <Icon icon="times" className="alert-close" onClick={handleClick} /> : null}
        </div>
      ) : null}
    </>
  );
};

Alert.defaultProps = {
  type: 'primary',
  closable: true,
};

export default Alert;
