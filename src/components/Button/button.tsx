import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  /**设置类名 */
  className?: string;
  /**设置禁用状态 */
  disabled?: boolean;
  /**设置 button 尺寸，支持 lg、sm */
  size?: ButtonSize;
  /**设置 button 类型，支持 primary、default、danger、link  */
  btnType?: ButtonType;
  /**设置子属性 */
  children: React.ReactNode;
  /**设置 link 状态下的链接地址 */
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>; // 加入 btn 默认属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>; // 加入 a 默认属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // 合并类型并去除必选项

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, children, href, ...restProps } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  children: '按钮',
};

export default Button;
