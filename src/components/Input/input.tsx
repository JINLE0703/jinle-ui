import React from 'react';
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
  prepand?: string | React.ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | React.ReactElement;
}

const Input: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, prepand, append, className, style, placeholder, ...restProps } = props;
  const classes = classNames('jinle-input-wrapper', className, {
    'jinle-input-disabled': disabled,
    [`jinle-input-${size}`]: size,
    'jinle-input-group': prepand || append,
    'jinle-input-group-append': append,
    'jinle-input-group-prepand': prepand,
  });
  return (
    <div className={classes} style={style}>
      {prepand && <div className="jinle-input-prepend">{prepand}</div>}
      {icon && (
        <div className="jinle-input-icon-wrapper">
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
