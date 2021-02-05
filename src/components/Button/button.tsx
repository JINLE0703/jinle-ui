import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string; // 类名
  disabled?: boolean; // 禁用
  size?: ButtonSize; // 尺寸
  btnType?: ButtonType; // 类型
  children: React.ReactNode; // 子节点
  href?: string; // link 状态下的链接地址
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>; // 加入 btn 默认属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>; // 加入 a 默认属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // 合并类型并去除必选项

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled = false,
    size,
    btnType = 'default',
    children = '按钮',
    href,
    ...restProps // 剩余属性
  } = props;
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

export default Button;
