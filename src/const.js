const ALL_GENRES = `All genres`;

const MOVIES_TO_SHOW_AT_ONCE = 8;

const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  MAIN: `/main`,
  MY_LIST: `/mylist`,
  MOVIE_INFO: `/films/:id`,
  ADD_REVIEW: `/films/:id/review`,
  VIDEO_PLAYER: `/films/:id/player`,
  getMovieInfo: (id) => `/films/${id}`,
  getAddReview: (id) => `/films/${id}/review`,
  getVideoPlayer: (id) => `/films/${id}/player`
};

export {ALL_GENRES, MOVIES_TO_SHOW_AT_ONCE, AppRoute};
