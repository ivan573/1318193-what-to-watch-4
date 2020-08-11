import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ACTORS_TO_SHOW = 3;

const MINUTES_IN_AN_HOUR = 60;

const COLUMN_LENGTH = 3;
const REVIEWS_TO_SHOW = 6;

const TabOption = {
  OVERVIEW: `OVERVIEW`,
  DETAILS: `DETAILS`,
  REVIEWS: `REVIEWS`
};

const getRatingScore = (score) => {
  if (score < 3) {
    return `Bad`;
  } else if (score < 5) {
    return `Normal`;
  } else if (score < 8) {
    return `Good`;
  } else if (score < 10) {
    return `Very good`;
  }
  return `Awesome`;
};

const getDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_AN_HOUR);
  const minutes = duration % MINUTES_IN_AN_HOUR;

  return hours.toString().concat(`h `, minutes, `m`);
};

const getOverviewTab = (movie) => {
  const {rating, scoresCount, description, director, actors} = movie;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingScore(rating)}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actors.slice(0, ACTORS_TO_SHOW).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

const getDetailsTab = (movie) => {
  const {director, actors, duration, genre, year} = movie;

  return (
    <React.Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {actors.map((actor, i) => {
                return (
                  <React.Fragment key={actor}>
                    {actor}
                    {i === actors.length - 1 ? `` : (<>, <br /></>)}
                  </React.Fragment>
                );
              })}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{getDuration(duration)}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{year}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const getReviewsTab = (reviews) => {

  const getReviewsColumn = (reviewsSlice) => {
    return reviewsSlice.map((review) => {
      return (
        <div className="review" key={review.id}>
          <blockquote className="review__quote">
            <p className="review__text">{review.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{review.user.name}</cite>
              <time className="review__date" dateTime={moment(review.date).format(`YYYY-MM-DD`)}>{moment(review.date).format(`LL`)}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>);
    });
  };

  const movieReviews = reviews ? reviews : [];

  const firstColumn = movieReviews.slice(0, COLUMN_LENGTH);
  const secondColumn = movieReviews.slice(COLUMN_LENGTH, REVIEWS_TO_SHOW);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {getReviewsColumn(firstColumn)}
      </div>
      <div className="movie-card__reviews-col">
        {getReviewsColumn(secondColumn)}
      </div>
    </div>
  );
};

const Tabs = (props) => {
  const {activeTab, movie, getReviews} = props;

  const reviews = getReviews(movie.id);

  let tab = null;

  switch (activeTab) {
    case (TabOption.OVERVIEW):
      tab = getOverviewTab(movie);
      break;
    case (TabOption.DETAILS):
      tab = getDetailsTab(movie);
      break;
    case (TabOption.REVIEWS):
      tab = getReviewsTab(reviews);
      break;
  }

  return tab;
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  movie: PropTypes.shape({

  }).isRequired,
  getReviews: PropTypes.func.isRequired
};

export {Tabs as default, TabOption};
