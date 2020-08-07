import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;


const getAllMovies = (state) => {
  return state[NAME_SPACE].allMovies;
};

export {getAllMovies};
