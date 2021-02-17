import React from 'react';
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
  /**进度百分比 */
  percent: number;
  /**整体高度 */
  storkeHight?: number;
  /**是否显示内容 */
  showText?: boolean;
  /**样式 */
  styles?: React.CSSProperties;
  /**主题 */
  theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { percent, storkeHight, showText, styles, theme } = props;
  return (
    <div className="jinle-progress" style={styles}>
      <div className="jinle-progress-outer" style={{ height: `${storkeHight}px` }}>
        <div className={`jinle-progress-inner jinle-progress-color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="jinle-progress-inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  storkeHight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;
