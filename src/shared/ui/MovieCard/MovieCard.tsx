import { Link } from 'react-router-dom';

import { ReactComponent as FavoritesIcon } from '~/assets/icons/Favorites.svg';
import { type FoundMovie } from '~/entities/foundMovie';
import { type LinkedMovie, type Movie } from '~/entities/movie';
import { nameFormatter } from '~/shared/utils/utils';
import { moviesApi } from '~/store/api/moviesApi/movies.api';
import { moviesActions } from '~/store/slices/moviesSlice';
import { useAppDispatch, useAppSelector } from '~/store/store.types';

import movieCardStyles from './MovieCard.module.scss';
import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.types';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const isFavorite = useAppSelector((state) =>
    state.movies.favoriteMovies.includes(movie.id)
  );
  const dispatch = useAppDispatch();

  return (
    <div className={movieCardStyles.container}>
      <div className={movieCardStyles.imageWrap}>
        <img
          src={
            movie.poster.url ??
            'https://yastatic.net/s3/kinopoisk-frontend/special-static-www/release-608/dist/branding/dist/static/images/icons/icon-kp.png'
          }
          alt={movie.name}
        />
      </div>
      <div className={movieCardStyles.text}>
        <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
        <p>
          {movie.genres.map((genre) => nameFormatter(genre.name)).join(' • ')}
        </p>
      </div>
      <div className={movieCardStyles.rating}>{movie.rating.kp.toFixed(1)}</div>
      {isFavorite && (
        <Button
          className={movieCardStyles.addMovieToFavoritesButton}
          appearance={ButtonAppearance.SecondaryActive}
          icon={<FavoritesIcon />}
          onClick={() => {
            dispatch(moviesActions.addMovieToFavorites(movie.id));
            dispatch(moviesApi.util.resetApiState());
          }}
        />
      )}
    </div>
  );
};

export const LinkedMovieMovieCard = ({ movie }: { movie: LinkedMovie }) => {
  return (
    <div className={movieCardStyles.container}>
      <div className={movieCardStyles.imageWrap}>
        <img
          src={
            movie.poster.url ??
            'https://yastatic.net/s3/kinopoisk-frontend/special-static-www/release-608/dist/branding/dist/static/images/icons/icon-kp.png'
          }
          alt={movie.name}
        />
      </div>
      <div className={movieCardStyles.text}>
        <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
      </div>
    </div>
  );
};

export const MovieCardSearch = ({ movie }: { movie: FoundMovie }) => {
  const isFavorite = useAppSelector((state) =>
    state.movies.favoriteMovies.includes(movie.id)
  );
  const dispatch = useAppDispatch();

  return (
    <div className={movieCardStyles.container}>
      <div className={movieCardStyles.imageWrap}>
        <img
          src={
            movie.poster ??
            'https://yastatic.net/s3/kinopoisk-frontend/special-static-www/release-608/dist/branding/dist/static/images/icons/icon-kp.png'
          }
          alt={movie.name}
        />
      </div>
      <div className={movieCardStyles.text}>
        <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
        <p>{movie.genres.map((genre) => nameFormatter(genre)).join(' • ')}</p>
      </div>
      <div className={movieCardStyles.rating}>{movie.rating.toFixed(1)}</div>
      {isFavorite && (
        <Button
          className={movieCardStyles.addMovieToFavoritesButton}
          appearance={ButtonAppearance.SecondaryActive}
          icon={<FavoritesIcon />}
          onClick={() => {
            dispatch(moviesActions.addMovieToFavorites(movie.id));
          }}
        />
      )}
    </div>
  );
};
