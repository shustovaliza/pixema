import { Link } from 'react-router-dom';

import { type Movie } from '~/entities/movie';
import { dateFormatter, urlFormatter } from '~/shared/utils/utils';

import movieCardStyles from './MovieCard.module.scss';

const certainMovieURL = (name: Movie['name']) => {
  const formattedMovieName = urlFormatter(name);
  return `/movies/${formattedMovieName}`;
};

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className={movieCardStyles.container}>
      <div className={movieCardStyles.imageWrap}>
        <img
          src={movie.poster}
          alt={movie.name}
        />
      </div>
      <div className={movieCardStyles.text}>
        <Link to={certainMovieURL(movie.name)}>{movie.name}</Link>
        <p>{dateFormatter(movie.release_date)}</p>
      </div>
    </div>
  );
};
