import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = (props) => {
  const {data} = props;

  return (
    <Main
      data={data}
    />
  );
};

App.propTypes = {
  data: PropTypes.objectOf(
      PropTypes.shape({
        headerMovie: PropTypes.objectOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              genre: PropTypes.string.isRequired,
              year: PropTypes.number.isRequired,
            })
        ).isRequired,
        moviesList: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired
      })
  ).isRequired
};

export {App as default};
