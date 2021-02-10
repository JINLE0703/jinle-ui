import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  /**设置主题颜色，支持 primary、secondary、success、info、warning、danger、light、dark */
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = classNames('jinle-icon', className, {
    [`jinle-icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
