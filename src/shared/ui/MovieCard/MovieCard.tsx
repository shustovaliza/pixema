import { Link } from 'react-router-dom';

import { type LinkedMovie, type Movie } from '~/entities/movie';
import { nameFormatter } from '~/shared/utils/utils';

import movieCardStyles from './MovieCard.module.scss';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className={movieCardStyles.container}>
      <div className={movieCardStyles.imageWrap}>
        <img
          src={movie.poster.url}
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
    </div>
  );
};

export const LinkedMovieMovieCard = ({ movie }: { movie: LinkedMovie }) => {
  return (
    <div className={movieCardStyles.container}>
      <div className={movieCardStyles.imageWrap}>
        <img
          src={movie.poster.url}
          alt={movie.name}
        />
      </div>
      <div className={movieCardStyles.text}>
        <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
      </div>
    </div>
  );
};
