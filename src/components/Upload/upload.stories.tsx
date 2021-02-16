import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import Upload from './upload';

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

export const defaultUpload: React.VFC<{}> = () => {
  return <Upload action="https://jsonplaceholder.typicode.com/posts" onChange={action('change')} />;
};
