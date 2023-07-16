import { useSearchParams } from 'react-router-dom';

import { MovieCardSearch } from '~/shared/ui/MovieCard/MovieCard';
import { useSearchMoviesQuery } from '~/store/api/moviesApi/movies.api.injections';

import searchPageStyles from './Search.module.scss';

export const SearchPage = () => {
  const [searchParameters] = useSearchParams();
  const searchQuery = searchParameters.get('query') || undefined;

  const { data, status } = useSearchMoviesQuery({
    query: searchQuery,
    limit: '8'
  });

  if (status === 'rejected') {
    return (
      <div className={searchPageStyles.error}>Упс! Что-то пошло не так!</div>
    );
  }

  if (status === 'pending') {
    return <div className={searchPageStyles.error}>Загрузка...</div>;
  }

  if (data?.docs.length === 0) {
    return (
      <div className={searchPageStyles.container}>
        <h1>По вашему запросу ничего не найдено</h1>
      </div>
    );
  }

  return (
    searchQuery && (
      <div className={searchPageStyles.container}>
        <h1>{`Результаты поиска по запросу "${searchQuery}"`}</h1>
        <div className={searchPageStyles.cardsWrap}>
          {data &&
            data.docs.map((movie) => (
              <MovieCardSearch
                key={movie.id}
                movie={movie}
              />
            ))}
        </div>
      </div>
    )
  );
};
