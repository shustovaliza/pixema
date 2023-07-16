import { useSearchParams } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { MovieCard } from '~/shared/ui/MovieCard/MovieCard';
import { useGetMoviesQuery } from '~/store/api/moviesApi/movies.api.injections';

import bestMoviesStyles from './BestMovies.module.scss';

export const BestMoviesPage = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const page = +(searchParameters.get('page') || 1);

  const { data, status } = useGetMoviesQuery({
    page: `${page}`,
    limit: '12',
    sortField: 'rating.kp',
    sortType: '-1'
  });

  if (status === 'rejected') {
    return (
      <div className={bestMoviesStyles.error}>Упс! Что-то пошло не так!</div>
    );
  }

  return (
    <div className={bestMoviesStyles.container}>
      <h1>Лучшие фильмы</h1>
      <div className={bestMoviesStyles.cardsWrap}>
        {data &&
          data.docs.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
      </div>
      <Button
        className={bestMoviesStyles.showMoreButton}
        disabled={status === 'pending'}
        text={status === 'pending' ? 'Загрузка...' : 'Показать больше'}
        appearance={ButtonAppearance.Secondary}
        onClick={() => {
          setSearchParameters((old) => {
            old.set('page', `${page + 1}`);
            return old;
          });
        }}
      ></Button>
    </div>
  );
};
