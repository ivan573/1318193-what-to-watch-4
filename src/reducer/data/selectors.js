import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;


const getAllMovies = (state) => {
  return state[NAME_SPACE].allMovies;
};

export {getAllMovies};
