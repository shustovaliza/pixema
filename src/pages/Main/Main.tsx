import { useEffect } from 'react';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { MovieCard } from '~/shared/ui/MovieCard/MovieCard';
import { fetchMovies } from '~/store/movies/movies.api';
import { selectMovies } from '~/store/movies/movies.selector';
import { useAppDispatch, useAppSelector } from '~/store/store.types';

import mainPageStyles from './Main.module.scss';

export const MainPage = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchMovies({ perPage: 10, page: 1 }));

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div className={mainPageStyles.container}>
      <div className={mainPageStyles.cardsWrap}>
        {movies.map((movie) => (
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
