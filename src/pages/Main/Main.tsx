import { useSearchParams } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { MovieCard } from '~/shared/ui/MovieCard/MovieCard';
import { nameFormatter } from '~/shared/utils/utils';
import { useGetMoviesQuery } from '~/store/api/moviesApi/movies.api.injections';

import mainPageStyles from './Main.module.scss';

export const MainPage = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const page = +(searchParameters.get('page') || 1);
  const genre = searchParameters.get('genres.name') || undefined;
  const { data, status } = useGetMoviesQuery({
    page: page,
    limit: 12,
    'genres.name': genre
  });

  return status === 'rejected' ? (
    <div className={mainPageStyles.error}>Упс! Что-то пошло не так!</div>
  ) : (
    <div className={mainPageStyles.container}>
      {genre && <h1>{`Жанр "${nameFormatter(genre)}"`}</h1>}
      <div className={mainPageStyles.cardsWrap}>
        {data &&
          data.docs.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            ></MovieCard>
          ))}
      </div>
      <Button
        className={mainPageStyles.showMoreButton}
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
