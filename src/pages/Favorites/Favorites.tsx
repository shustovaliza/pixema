import { MovieCard } from '~/shared/ui/MovieCard/MovieCard';
import { useGetMoviesQuery } from '~/store/api/moviesApi/movies.api.injections';
import { useAppSelector } from '~/store/store.types';

import favoritesPageStyles from './Favorites.module.scss';

export const FavoritesPage = () => {
  const favoriteMoviesId = useAppSelector(
    (state) => state.movies.favoriteMovies
  ).map((id) => `${id}`);

  const { data, status } = useGetMoviesQuery({
    favoriteMoviesId: favoriteMoviesId
  });

  if (status === 'rejected') {
    return (
      <div className={favoritesPageStyles.error}>Упс! Что-то пошло не так!</div>
    );
  }

  if (status === 'pending') {
    return <div className={favoritesPageStyles.error}>Загрузка...</div>;
  }

  if (favoriteMoviesId.length === 0) {
    return (
      <div className={favoritesPageStyles.container}>
        <h1>Избранное</h1>
        <span>В избранном пока пусто</span>
      </div>
    );
  }

  return (
    <div className={favoritesPageStyles.container}>
      <h1>Избранное</h1>
      <div className={favoritesPageStyles.cardsWrap}>
        {data &&
          data.docs.map(
            (movie) =>
              movie && (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              )
          )}
      </div>
    </div>
  );
};
