import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Player from "../video-player/video-player.jsx";
import withVideo from "../../hocs/with-video/with-video.js";

const VideoPlayer = withVideo(Player);

class MovieCard extends PureComponent {
  render() {
    const {movie, isActive, onMouseOverCard, onMouseOutOfCard, onCardClick, allMovies} = this.props;

    const onTitleClick = (event) => {
      event.preventDefault();
      onCardClick(movie, allMovies);
    };

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseOver={() => onMouseOverCard(movie)}
        onMouseOut={() => onMouseOutOfCard()}
        onClick={() => onCardClick(movie, allMovies)}
      >
        {isActive ?
          <VideoPlayer
            movie={movie}
            isMuted={true}
            isPreviewMode={true}
          /> :
          <React.Fragment>
            <div className="small-movie-card__image">
              <img src={movie.image} alt={movie.title} width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html" onClick={onTitleClick}>{movie.title}</a>
            </h3>
          </React.Fragment>
        }
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onMouseOverCard: PropTypes.func.isRequired,
  onMouseOutOfCard: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired
};

export {MovieCard as default};
