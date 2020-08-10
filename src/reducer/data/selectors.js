import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;


const getAllMovies = (state) => {
  return state[NAME_SPACE].allMovies;
};

const getFavoriteMovies = (state) => {
  return state[NAME_SPACE].favoriteMovies;
};

const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export {getAllMovies, getFavoriteMovies, getPromoMovie, getReviews};
