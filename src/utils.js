import {ALL_GENRES} from "./const.js";

const getUniqueGenres = (movies) => {

  const genres = movies.reduce((unique, item) => {
    return unique.includes(item.genre) ? unique : [...unique, item.genre];
  }, []);

  genres.unshift(ALL_GENRES);

  return genres;
};

export {getUniqueGenres};
