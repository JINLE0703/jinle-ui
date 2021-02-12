import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import AutoComplete from './autoComplete';

export default {
  title: '数据录入/AutoComplete',
  component: AutoComplete,
} as Meta;

export const DefaultAutoComplete: React.VFC<{}> = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
  const handleFetch = (str: string) => {
    return lakers.filter((name) => name.includes(str));
  };
  const handleSelected = (item: string) => {
    console.log(item)
  } 
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={handleSelected} />;
};
