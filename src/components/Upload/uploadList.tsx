import React from 'react';
import { UploadFile } from './upload';

import Icon from '../Icon/icon';
import Progress from '../Progress/progress';
export interface UploadListProps {
  /**上传文件列表 */
  fileList: UploadFile[];
  /**移除文件回调函数 */
  onRemove: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="jinle-upload-list">
      {fileList.map((item) => {
        return (
          <li className="jinle-upload-list-item" key={item.uid}>
            <span className={`jinle-file-name jinle-file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="jinle-file-status">
              {item.status === 'uploading' && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="jinle-file-actions">
              <Icon icon="times" onClick={() => onRemove(item)} />
            </span>
            {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
