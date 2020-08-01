import React, {PureComponent, Fragment/* , createRef*/} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  // constructor(props) {
  //   super(props);

  //   this._videoRef = createRef();

  //   this.state = {
  //     progress: 0,
  //     isLoading: true,
  //     isPlaying: props.isPlaying
  //   };
  // }

  // componentDidMount() {
  //   const {src} = this.props;
  //   const video = this._videoRef.current;

  //   video.src = src;

  //   video.oncanplaythrough = () => this.setState({
  //     isLoading: false,
  //   });

  //   video.onplay = () => {
  //     this.setState({
  //       isPlaying: true,
  //     });
  //   };

  //   video.onpause = () => this.setState({
  //     isPlaying: false,
  //   });

  //   video.ontimeupdate = () => this.setState({
  //     progress: video.currentTime
  //   });
  // }

  // componentWillUnmount() {
  //   const video = this._videoRef.current;

  //   video.oncanplaythrough = null;
  //   video.onplay = null;
  //   video.onpause = null;
  //   video.ontimeupdate = null;
  //   video.src = ``;
  // }

  render() {
    // const {isLoading, isPlaying} = this.state;
    const {poster, isMuted, isAutoplayed, children/* , onPlayButtonClick*/} = this.props;

    // const {isLoading, isPlaying, onPlayButtonClick, children} = this.props;

    const child = React.cloneElement(children, {
      src: `#`,
      className: `player__video`,
      poster,
      muted: isMuted,
      autoPlay: isAutoplayed
    });

    return (
      <Fragment>
        {/* <video
          src="#"
          className="player__video"
          poster={poster}
          muted={isMuted}
          autoPlay={isAutoplayed}
          ref={this._videoRef}
        /> */}
        {child}
      </Fragment>
    );
  }

  // componentDidUpdate() {
  //   const video = this._videoRef.current;

  //   if (this.props.isPlaying) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  // }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isAutoplayed: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export {VideoPlayer as default};
