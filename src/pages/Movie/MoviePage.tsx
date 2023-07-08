import { useParams } from 'react-router-dom';

import { useGetMovieQuery } from '~/store/api/moviesApi/movies.api.injections';

import moviePageStyles from './MoviePage.module.scss';

export const MoviePage = () => {
  const { id } = useParams<'id'>();
  const { data, status } = useGetMovieQuery({ id: id || '' });

  if (status === 'pending') {
    return <div className={moviePageStyles.error}>Loading...</div>;
  }

  if (status === 'rejected') {
    return (
      <div className={moviePageStyles.error}>Oops! Something went wrong!</div>
    );
  }

  return (
    <div className={moviePageStyles.container}>
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};
