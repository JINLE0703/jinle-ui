import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import Upload, { UploadProps } from './upload';

export default {
  title: '数据录入/Upload',
  component: Upload,
} as Meta;

export const defaultUpload: React.VFC<{}> = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      onProgress={action('progress')}
      onSuccess={action('sucess')}
      onError={action('error')}
    />
  )
}
