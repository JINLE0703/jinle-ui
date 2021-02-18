import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import Upload, { UploadFile } from './upload';
import Button from '../Button/button';

export default {
  title: '数据录入/Upload',
  component: Upload,
} as Meta;

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('error');
    return false;
  } else {
    return true;
  }
};

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name', { type: file.type });
  return Promise.resolve(newFile);
};

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
];

export const defaultUpload: React.VFC<{}> = () => {
  return (
    <div style={{ width: '500px' }}>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        onSuccess={action('success')}
        onError={action('error')}
        onProgress={action('progress')}
        onChange={action('change')}
        defaultFileList={defaultFileList}
        onRemove={action('remove')}
        name="new_file"
        data={{ key: 'value' }}
        headers={{ 'X-POWER-BY': 'jinle' }}
        accept={'image/*'}
        multiple
        drag
      />
    </div>
  );
};
