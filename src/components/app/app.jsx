import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {headerMovie} = props;

  return (
    <Main
      headerMovie={headerMovie}
    />
  );
};

export {App as default};
