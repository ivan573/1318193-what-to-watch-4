import moment from "moment";
import "moment-duration-format";

import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const PERCENTS = 100;

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        progress: 0,
        timeElapsed: 0,
        isLoading: true,
        isPlaying: true,
        isFullScreen: false
      };
    }

    componentDidMount() {
      const src = this.props.isPreviewMode ? this.props.movie.preview : this.props.movie.video;
      const video = this._videoRef.current;

      video.src = src;

      video.oncanplaythrough = () => this.setState({isLoading: false});

      video.onplay = () => this.setState({isPlaying: true});

      video.onpause = () => this.setState({isPlaying: false});

      video.ontimeupdate = () => this.setState({
        progress: video.currentTime / video.duration * PERCENTS,
        timeElapsed: video.duration - video.currentTime
      });

      video.onfullscreenchange = () => this.setState({isFullScreen: !this.state.isFullScreen});
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (!this.state.isFullScreen) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.pause();

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.src = ``;
      video.onfullscreenchange = null;
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          progress={this._getProgress()}
          timeValue={this._getTimeElapsed()}
          videoRef={this._videoRef}
          onPlayButtonClick={() => this.setState({isPlaying: !isPlaying})}
        />
      );
    }

    _getProgress() {
      return this.state.progress ? this.state.progress : 0;
    }

    _getTimeElapsed() {
      if (this.state.timeElapsed) {
        const seconds = Math.ceil(this.state.timeElapsed);
        const duration = moment.duration(seconds, `seconds`).format(moment.TIME_SECONDS);
        return duration;
      }
      return moment.duration(0).format(moment.TIME_SECONDS);
    }
  }

  WithVideo.propTypes = {
    isPreviewMode: PropTypes.bool.isRequired,
    movie: PropTypes.shape({
      preview: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired
    })
  };

  return WithVideo;
};

export {withVideo as default};
