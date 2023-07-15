import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { type Movie } from '~/entities/movie';
import { LinkedMovieMovieCard } from '~/shared/ui/MovieCard/MovieCard';

import recommendatiosStyles from './Recommendations.module.scss';

export const Recommendations = ({
  movies
}: {
  movies: Movie['similarMovies'];
}) => {
  return (
    <div className={recommendatiosStyles.swiperWrap}>
      <Swiper
        navigation={true}
        slidesPerView={1}
        modules={[Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <LinkedMovieMovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
