import searchBarStyles from './SearchBar.module.scss';

export const SearchBar = () => {
  return (
    <form
      className={searchBarStyles.container}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input placeholder="Поиск" />
    </form>
  );
};
