import React, { useState } from 'react';
import classNames from 'classnames';

import Icon from '../Icon/icon';

export interface DraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;

  /**拖拽进入范围容器标志 */
  const [dragOver, setDragOver] = useState(false);

  const classes = classNames('jinle-upload-dragger', {
    'jinle-upload-dragover': dragOver,
  });

  /**
   * 处理文件拖拽函数
   * @param e
   * @param over
   */
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  /**
   * 处理文件拖拽至目标区域放置触发函数
   * @param e 
   */
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }

  return (
    <div className={classes} onDragOver={(e) => handleDrag(e, true)} onDragLeave={(e) => handleDrag(e, false)} onDrop={handleDrop}>
      {children ? (
        children
      ) : (
        <>
          <Icon icon="upload" size="5x" theme="secondary" style={{ marginTop: '10px' }} />
          <br />
          <p style={{ marginTop: '10px' }}>Drag file over to upload</p>
        </>
      )}
    </div>
  );
};

export default Dragger;
