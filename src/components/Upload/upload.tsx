import React, { useRef } from 'react';
import axios from 'axios';

import Button from '../Button/button';

export interface UploadProps {
  /**上传的地址 */
  action: string;
  /**上传进行中回调函数 */
  onProgress?: (percentage: number, file: File) => void;
  /**上传成功回调函数 */
  onSuccess?: (data: any, file: File) => void;
  /**上传失败回调函数 */
  onError?: (err: any, file: File) => void;
}

const Upload: React.FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  /**
   * 处理点击事件
   */
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  /**
   * 处理上传文件内容变化事件
   * @param e
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    UploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  /**
   * 上传文件
   * @param files
   */
  const UploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios.post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (e) => {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              onProgress && onProgress(percentage, file);
            }
          },
        })
        .then((res) => {
          console.log(res);
          onSuccess && onSuccess(res.data, file);
        })
        .catch((err) => {
          console.log(err);
          onError && onError(err, file);
        });
    });
  };

  return (
    <div className="jinle-upload">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input style={{ display: 'none' }} type="file" ref={fileInput} onChange={handleFileChange} />
    </div>
  );
};

export default Upload;
