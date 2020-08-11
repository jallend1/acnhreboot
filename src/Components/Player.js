import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div id="player">
        <audio
          controls
          autoPlay
          src={`./kk/${this.props.activeSong}.mp3`}
          type="audio/mpeg"
        />
      </div>
    );
  }
}

export default Player;
