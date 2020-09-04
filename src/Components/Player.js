import React from "react";

const Player = (props) => {
  return (
    <div id="player">
      <div>
        <img
          id="songposter"
          src={`./images/music/${props.activeSong}.png`}
          alt="Album cover"
        />
      </div>
      <audio
        controls
        autoPlay
        src={`./kk/${props.activeSong}.mp3`}
        type="audio/mpeg"
      />
    </div>
  );
};

export default Player;
