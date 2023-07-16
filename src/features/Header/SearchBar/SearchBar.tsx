import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import searchBarStyles from './SearchBar.module.scss';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  return (
    <form
      className={searchBarStyles.container}
      onSubmit={(event) => {
        event.preventDefault();
        setSearchValue('');
        navigate(`/search?query=${searchValue}`);
      }}
    >
      <input
        placeholder="Поиск"
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
      />
    </form>
  );
};
