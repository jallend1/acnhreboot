import React from "react";

const Player = (props) => {
  return (
    <div id="player">
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
