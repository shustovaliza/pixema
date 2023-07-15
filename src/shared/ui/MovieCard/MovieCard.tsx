import { Link } from 'react-router-dom';

import { type Movie } from '~/entities/movie';

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
        {movie.genres.length > 1 ? (
          <p>{`${movie.genres[0].name}, ${movie.genres[1]?.name}`}</p>
        ) : (
          <p>{`${movie.genres[0].name}`}</p>
        )}
      </div>
      <div className={movieCardStyles.rating}>{movie.rating.kp.toFixed(1)}</div>
    </div>
  );
};
