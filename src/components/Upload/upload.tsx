import React, { useRef, useState } from 'react';
import axios from 'axios';

import UploadList from './uploadList';
import Button from '../Button/button';

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  /**唯一标识 */
  uid: string;
  /**文件大小 */
  size: number;
  /**文件名称 */
  name: string;
  /**文件状态，支持 ready、uploading、success、error */
  status?: UploadFileStatus;
  /**文件上传百分比 */
  percent?: number;
  /**文件原型 */
  raw?: File;
  /**上传成功返回信息 */
  response?: any;
  /**上传失败返回信息 */
  error?: any;
}

export interface UploadProps {
  /**上传的地址 */
  action: string;
  /**默认上传文件列表 */
  defaultFileList?: UploadFile[];
  /**设置自定义请求头 */
  headers?: { [key: string]: any };
  /**设置自定义文件名 */
  name?: string;
  /**设置自定义上传数据 */
  data?: { [key: string]: any };
  /**设置上传文件是否携带cookie */
  withCookie?: boolean;
  /**上传文件前回调函数 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**上传状态改变回调函数 */
  onChange?: (file: File) => void;
  /**上传进行中回调函数 */
  onProgress?: (percentage: number, file: File) => void;
  /**上传成功回调函数 */
  onSuccess?: (data: any, file: File) => void;
  /**上传失败回调函数 */
  onError?: (err: any, file: File) => void;
  /**移除文件回调函数 */
  onRemove?: (file: UploadFile) => void;
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    headers,
    name,
    data,
    withCookie,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove,
  } = props;

  /**上传文件列表 */
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const fileInput = useRef<HTMLInputElement>(null);

  /**
   * 更新上传文件列表
   * @param updateFile 更新文件
   * @param updateObj 更新文件属性对象
   */
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

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
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => post(processedFile));
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  /**
   * 文件上传异步请求
   * @param file
   */
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + '-upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);

    // 设置请求内容
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    // 异步请求
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: withCookie, // 是否携带cookie
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' });
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        updateFileList(_file, { status: 'success', response: res.data });
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        onError && onError(err, file);
        onChange && onChange(file);
      });
  };

  /**
   * 处理移除文件事件
   * @param file 移除文件
   */
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };

  return (
    <div className="jinle-upload">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input style={{ display: 'none' }} type="file" ref={fileInput} onChange={handleFileChange} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: 'file'
}

export default Upload;
