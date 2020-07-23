import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Video player has playing and non-playing states`, () => {
  it(`Video player has playing state`, () => {
    const player = mount(
        <VideoPlayer
          src = {`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          poster = {`img/aviator.jpg`}
          isMuted = {true}
          isAutoplayed = {true}
          isPlaying = {true}
        />
    );

    expect(player.state(`isPlaying`)).toBe(true);
  });

  it(`Video player has non-playing status`, () => {
    const player = mount(
        <VideoPlayer
          src = {`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          poster = {`img/aviator.jpg`}
          isMuted = {true}
          isAutoplayed = {true}
          isPlaying = {false}
        />
    );

    expect(player.state(`isPlaying`)).toBe(false);
  });
});
