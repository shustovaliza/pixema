import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { MovieCard } from '~/shared/ui/MovieCard/MovieCard';
import { useGetMoviesQuery } from '~/store/api/movies/movies.api';

import mainPageStyles from './Main.module.scss';

export const MainPage = () => {
  const { data, status } = useGetMoviesQuery({ page: 1, perPage: 10 });

  return (
    <div className={mainPageStyles.container}>
      {status === 'pending' && (
        <div className={mainPageStyles.error}>Loading...</div>
      )}
      {status === 'rejected' && (
        <div className={mainPageStyles.error}>Oops! Something went wrong!</div>
      )}
      <div className={mainPageStyles.cardsWrap}>
        {data &&
          data.pagination.data.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            ></MovieCard>
          ))}
      </div>
      <Button
        text={'Show more'}
        appearance={ButtonAppearance.Secondary}
      ></Button>
    </div>
  );
};
