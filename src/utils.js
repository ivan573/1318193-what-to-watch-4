import {ALL_GENRES} from "./const.js";

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const getUniqueGenres = (movies) => {

  const genres = movies.reduce((unique, item) => {
    return unique.includes(item.genre) ? unique : [...unique, item.genre];
  }, []);

  genres.unshift(ALL_GENRES);

  return genres;
};

export {extend, getUniqueGenres};
