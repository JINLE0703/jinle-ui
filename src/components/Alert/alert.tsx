import React, { useState } from 'react';
import classNames from 'classnames';

export type AlertType = 'primary' | 'success' | 'danger' | 'warning';

interface BaseAlertProps {
  className?: string; // 类名
  type?: AlertType; // 类型
  closable?: boolean; // 显示关闭按钮
  title?: string; // 标题
  message: string; // 内容
  onClose?: () => void; // 关闭事件
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    type = 'primary',
    closable = true,
    title,
    message,
    onClose,
  } = props;

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
          {closable ? (
            <span className="alert-close" onClick={handleClick}>
              关闭
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Alert;
