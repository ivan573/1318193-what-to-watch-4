import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {areAllMoviesShown, onShowMoreClick} = props;
  return areAllMoviesShown ? null : (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => onShowMoreClick()}>Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  areAllMoviesShown: PropTypes.bool.isRequired,
  onShowMoreClick: PropTypes.func.isRequired
};

export {ShowMore as default};
