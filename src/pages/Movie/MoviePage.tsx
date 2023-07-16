import { Link, useParams } from 'react-router-dom';

import { ReactComponent as FavoritesIcon } from '~/assets/icons/Favorites.svg';
import { ReactComponent as ImdbIcon } from '~/assets/icons/imdb.svg';
import { Recommendations } from '~/features/Recommendations/Recomendations';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { dateFormatter, nameFormatter } from '~/shared/utils/utils';
import { useGetMovieQuery } from '~/store/api/moviesApi/movies.api.injections';
import { moviesActions } from '~/store/slices/moviesSlice';
import { useAppDispatch, useAppSelector } from '~/store/store.types';

import moviePageStyles from './MoviePage.module.scss';

export const MoviePage = () => {
  const { id } = useParams<'id'>();
  const { data, status } = useGetMovieQuery({ id: id || '' });

  const isFavorite = useAppSelector(
    (state) => id && state.movies.favoriteMovies.includes(+id)
  );
  const dispatch = useAppDispatch();

  if (status === 'pending') {
    return <div className={moviePageStyles.error}>Загрузка...</div>;
  }

  if (status === 'rejected') {
    return (
      <div className={moviePageStyles.error}>Упс! Что-то пошло не так!</div>
    );
  }

  return (
    data && (
      <div className={moviePageStyles.container}>
        <div className={moviePageStyles.imageWrap}>
          <div className={moviePageStyles.image}>
            {data.poster ? (
              <img
                src={data.poster.url}
                alt={data.name}
              />
            ) : (
              <img
                src={
                  'https://yastatic.net/s3/kinopoisk-frontend/special-static-www/release-608/dist/branding/dist/static/images/icons/icon-kp.png'
                }
                alt={data.name}
              />
            )}
          </div>
          <Button
            appearance={
              isFavorite
                ? ButtonAppearance.SecondaryActive
                : ButtonAppearance.Secondary
            }
            icon={<FavoritesIcon />}
            shouldFitContainer
            onClick={() =>
              id && dispatch(moviesActions.addMovieToFavorites(+id))
            }
          />
        </div>
        <div className={moviePageStyles.content}>
          <div className={moviePageStyles.genres}>
            {data.genres.map((genre) => {
              return (
                <Link
                  to={`/?genres.name=${genre.name}`}
                  key={genre.name}
                >
                  {`${nameFormatter(genre.name)} • `}
                </Link>
              );
            })}
          </div>
          <h1>{data.name}</h1>
          <div className={moviePageStyles.ratings}>
            <div className={moviePageStyles.kpRating}>
              {data.rating.kp.toFixed(1)}
            </div>
            <div className={moviePageStyles.imdbRating}>
              <ImdbIcon />
              {` ${data.rating.imdb}`}
            </div>
            <div
              className={moviePageStyles.length}
            >{`${data.movieLength} min`}</div>
          </div>
          <p className={moviePageStyles.description}>{data.description}</p>{' '}
          <table>
            <tbody>
              <tr>
                <td>{'Год'}</td>
                <td>{data.year}</td>
              </tr>
              <tr>
                <td>{'Выпущен'}</td>
                <td>{dateFormatter(data.premiere.world)}</td>
              </tr>
              <tr>
                <td>{'Сборы в мире'}</td>
                <td>
                  {data.fees.world.value
                    ? `$${data.fees.world.value.toLocaleString()}`
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>{'Страна'}</td>
                <td>
                  {data.countries.map((country) => country.name).join(', ')}
                </td>
              </tr>
              <tr>
                <td>{'Производство'}</td>
                <td>
                  {data.productionCompanies
                    .map((company) => company.name)
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <td>{'Актеры'}</td>
                <td>
                  {data.persons
                    .filter((person) => person.enProfession === 'actor')
                    .map((person) => person.name)
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <td>{'Режиссер'}</td>
                <td>
                  {data.persons
                    .filter((person) => person.enProfession === 'director')
                    .map((person) => person.name)
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <td>{'Сценаристы'}</td>
                <td>
                  {data.persons
                    .filter((person) => person.enProfession === 'writer')
                    .map((person) => person.name)
                    .join(', ')}
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Похожие фильмы</h2>
          <div className={moviePageStyles.recommendatiosWrap}>
            <Recommendations movies={data.similarMovies} />
          </div>
        </div>
      </div>
    )
  );
};
