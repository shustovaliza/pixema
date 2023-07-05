import { useSearchParams } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { MovieCard } from '~/shared/ui/MovieCard/MovieCard';
import { useGetMoviesQuery } from '~/store/api/movies/movies.api';

import mainPageStyles from './Main.module.scss';

export const MainPage = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const page = +(searchParameters.get('page') || 1);
  const { data, status } = useGetMoviesQuery({ page: page, limit: 12 });

  return (
    <div className={mainPageStyles.container}>
      {status === 'rejected' && (
        <div className={mainPageStyles.error}>Oops! Something went wrong!</div>
      )}
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
        disabled={status === 'pending'}
        text={status === 'pending' ? 'Loading...' : 'Show more'}
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
