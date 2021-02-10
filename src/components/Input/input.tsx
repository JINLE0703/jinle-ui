import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

// Omit 忽略某个属性
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  /**类名 */
  className?: string;
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**提示信息 */
  placeholder?: string;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | React.ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | React.ReactElement;
  /**内容改变触发事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**icon 点击事件 */
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, className, style, placeholder, onIconClick, ...restProps } = props;
  const classes = classNames('jinle-input-wrapper', className, {
    'jinle-input-disabled': disabled,
    [`jinle-input-${size}`]: size,
    'jinle-input-group': prepend || append,
    'jinle-input-group-append': append,
    'jinle-input-group-prepend': prepend,
  });
  return (
    <div className={classes} style={style}>
      {prepend && <div className="jinle-input-prepend">{prepend}</div>}
      {icon && (
        <div className="jinle-input-icon-wrapper" onClick={onIconClick}>
          <Icon icon={icon} />
        </div>
      )}
      <input className="jinle-input-inner" disabled={disabled} placeholder={placeholder} {...restProps} />
      {append && <div className="jinle-input-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
