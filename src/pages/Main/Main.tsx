import { useEffect } from 'react';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
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
      {movies.map((movie, index) => (
        <div key={movie.id}>{`${index} ${movie.id} ${movie.name}`}</div>
      ))}
      <Button
        text={'Show more'}
        appearance={ButtonAppearance.Primary}
      ></Button>
    </div>
  );
};
