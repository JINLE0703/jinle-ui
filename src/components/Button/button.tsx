import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

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
    disabled,
    size,
    btnType,
    children,
    href,
    ...restProps // 剩余属性
  } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });
  if (btnType === ButtonType.Link && href) {
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
  btnType: ButtonType.Default,
  children: '按钮',
};

export default Button;
