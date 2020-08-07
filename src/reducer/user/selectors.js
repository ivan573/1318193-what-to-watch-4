import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;


const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export {getAuthorizationStatus};
