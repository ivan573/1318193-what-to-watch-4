import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {

  render() {
    const {poster, isMuted, videoRef/* , onPlayButtonClick*/} = this.props;

    return (
      <video
        src="#"
        className="player__video"
        poster={poster}
        muted={isMuted}
        ref={videoRef}
      />
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  videoRef: PropTypes.object.isRequired,
  // isPlaying: PropTypes.bool.isRequired,
};

export {VideoPlayer as default};
