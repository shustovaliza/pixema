interface Name {
  name: string;
  language: string;
  type: string;
}
interface Video {
  url: string;
  name: string;
  site: string;
  type: string;
  size: number;
}

interface ItemName {
  name: string;
}

interface CurrencyValue {
  value: number;
  currency: string;
}

interface Person {
  id: number;
  photo: string;
  name: string;
  enName: string;
  description: string;
  profession: string;
  enProfession: string;
}

export interface LinkedMovie {
  id: number;
  name: string;
  enName: string;
  alternativeName: string;
  type: string;
  poster: ShortImage;
}

interface Logo {
  url: string;
}

interface WatchabilityItem {
  name: string;
  logo: Logo;
  url: string;
}

interface Fact {
  value: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention -- This data comes from server, I can't change the name
  spoiler: boolean;
}

interface SeasonsInfo {
  number: number;
  episodesCount: number;
}

interface ProductionCompany {
  name: string;
  url: string;
  previewUrl: string;
}

interface Audience {
  count: number;
  country: string;
}

interface ExternalId {
  kpHD: string;
  imdb: string;
  tmdb: number;
}

interface Rating {
  kp: number;
  imdb: number;
  tmdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

interface Votes {
  kp: number;
  imdb: number;
  tmdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

interface ShortImage {
  url: string;
  previewUrl: string;
}

interface YearRange {
  start: number;
  end: number;
}

export interface Movie {
  id: number;
  externalId: ExternalId;
  name: string;
  alternativeName: string;
  enName: string;
  names: Name[];
  type:
    | 'movie'
    | 'tv-series'
    | 'cartoon'
    | 'anime'
    | 'animated-series'
    | 'tv-show';
  typeNumber: 1 | 2 | 3 | 4 | 5 | 6;
  year: number;
  description: string;
  shortDescription: string;
  slogan: string;
  status:
    | 'filming'
    | 'pre-production'
    | 'completed '
    | 'announced'
    | 'post-production';
  rating: Rating;
  votes: Votes;
  movieLength: number;
  ratingMpaa: string;
  ageRating: number;
  poster: ShortImage;
  backdrop: ShortImage;
  genres: ItemName[];
  countries: ItemName[];
  persons: Person[];
  budget: CurrencyValue;
  fees: {
    world: CurrencyValue;
    usa: CurrencyValue;
    russia: CurrencyValue;
  };
  sequelsAndPrequels: LinkedMovie[];
  watchability: {
    items: WatchabilityItem[];
  };
  top10: number;
  top250: number;
  facts: Fact[];
  seasonsInfo: SeasonsInfo[];
  productionCompanies: ProductionCompany[];
  similarMovies: LinkedMovie[];
  releaseYears: YearRange[];
  videos: {
    trailers: Video[];
    teasers: Video[];
  };
  premiere: {
    country: string;
    world: string;
    russia: string;
    digital: string;
    cinema: string;
    bluray: string;
    dvd: string;
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention -- This data comes from server, I can't change the name
  ticketsOnSale: boolean;
  audience: Audience[];
  isSeries: boolean;
  seriesLength: number;
  totalSeriesLength: number;
  logo: Logo;
}
