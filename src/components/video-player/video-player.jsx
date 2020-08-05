import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {

  render() {
    const {title, poster, isPlaying, isMuted, isPreviewMode, progress, timeValue, videoRef, onPlayButtonClick, onExitClick} = this.props;

    const playerElement = (
      <video
        src="#"
        className="player__video"
        poster={poster}
        muted={isMuted}
        ref={videoRef}>
      </video>
    );

    const button = {
      PLAY: (
        <button type="button" className="player__play" onClick={onPlayButtonClick}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
      ),
      PAUSE: (
        <button type="button" className="player__play" onClick={onPlayButtonClick}>
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </button>
      )
    };

    return isPreviewMode ? playerElement : (
      <div className="player">
        {playerElement}

        <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler" style={{left: progress + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timeValue}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ? button.PAUSE : button.PLAY}
            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick={() => this._setFullScreen()}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  _setFullScreen() {
    const player = this.props.videoRef.current;
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  }
}

VideoPlayer.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  timeValue: PropTypes.string.isRequired,
  videoRef: PropTypes.object.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onExitClick: PropTypes.func
};

export {VideoPlayer as default};
