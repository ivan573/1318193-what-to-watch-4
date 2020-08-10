import moment from "moment";
import "moment-duration-format";

import React, {createRef} from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

describe(`Videoplayer renders in both modes`, () => {
  const ref = createRef();
  it(`Videoplayer renders in preview mode`, () => {
    const tree = renderer
    .create(
        <VideoPlayer
          movie={{
            title: `Fantastic Beasts: The Crimes of Grindelwald`,
            poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
          }}
          isPlaying={true}
          isMuted={true}
          isPreviewMode={true}
          progress={0}
          timeValue={moment.duration(4000, `seconds`).format(moment.TIME_SECONDS)}
          videoRef={ref}
          onPlayButtonClick={() => {}}
          onExitClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Videoplayer renders in movie playback mode`, () => {
    const tree = renderer
    .create(
        <VideoPlayer
          movie={{
            title: `Fantastic Beasts: The Crimes of Grindelwald`,
            poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
          }}
          isPlaying={true}
          isMuted={false}
          isPreviewMode={false}
          progress={0}
          timeValue={moment.duration(4000, `seconds`).format(moment.TIME_SECONDS)}
          videoRef={ref}
          onPlayButtonClick={() => {}}
          onExitClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
