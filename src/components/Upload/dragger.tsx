import React, { useState } from 'react';
import classNames from 'classnames';

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

  const handleDrag = (e: DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over)
  }

  return (
    <div className={classes} onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)}>

    </div>
  )
};

export default Dragger;
