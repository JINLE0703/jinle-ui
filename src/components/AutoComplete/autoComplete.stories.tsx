import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import AutoComplete, { DataSourceType } from './autoComplete';

export default {
  title: '数据录入/AutoComplete',
  component: AutoComplete,
} as Meta;

// interface lakerPlayersProps {
//   value: string;
//   number?: number;
// }

interface githubProps {
  value: string;
  url: string;
}

export const DefaultAutoComplete: React.VFC<{}> = () => {
  // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
  // const lakersWithNumber = [
  //   { value: 'bradley', number: 11 },
  //   { value: 'pope', number: 1 },
  //   { value: 'caruso', number: 4 },
  //   { value: 'cook', number: 2 },
  //   { value: 'cousins', number: 15 },
  //   { value: 'james', number: 23 },
  //   { value: 'AD', number: 3 },
  //   { value: 'green', number: 14 },
  //   { value: 'howard', number: 39 },
  //   { value: 'kuzma', number: 0 },
  // ];
  // const handleFetch = (str: string) => {
  //   return lakers.filter((name) => name.includes(str)).map((item) => ({ value: item }));
  // };
  // const handleFetch = (str: string) => {
  //   return lakersWithNumber.filter((item) => item.value.includes(str));
  // };
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  };
  const handleSelected = (item: DataSourceType) => {
    console.log(item);
  };
  // const renderOption = (item: DataSourceType<lakerPlayersProps>) => {
  //   return (
  //     <>
  //       <p>player: {item.value}</p>
  //       <p>number: {item.number}</p>
  //     </>
  //   );
  // };
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<githubProps>
    return (
      <>
        <h3>name: {itemWithGithub.value}</h3>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  }
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={handleSelected} renderOption={renderOption} />;
};
