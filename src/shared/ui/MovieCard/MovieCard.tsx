import { Link } from 'react-router-dom';

import { type Movie } from '~/entities/movie';
import { dateFormatter } from '~/shared/utils/utils';

import movieCardStyles from './MovieCard.module.scss';

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
        <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
        <p>{dateFormatter(movie.release_date)}</p>
      </div>
    </div>
  );
};
