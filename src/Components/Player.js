import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';

const posterPath = (currentStatus) => {
  if (
    currentStatus.activeItem === 'fish' ||
    currentStatus.activeItem === 'bugs' ||
    currentStatus.activeItem === 'sea' ||
    currentStatus.activeItem === 'fossils'
  ) {
    return `../images/music/${currentStatus.activeSong}.png`;
  } else {
    return `./images/music/${currentStatus.activeSong}.png`;
  }
};

const songPath = (currentStatus) => {
  if (
    currentStatus.activeItem === 'fish' ||
    currentStatus.activeItem === 'bugs' ||
    currentStatus.activeItem === 'sea' ||
    currentStatus.activeItem === 'fossils'
  ) {
    return `../kk/${currentStatus.activeSong}.mp3`;
  } else {
    return `./kk/${currentStatus.activeSong}.mp3`;
  }
};
const Player = () => {
  const currentStatus = useContext(ItemContext);

  return (
    <div className="player">
      <img id="kk-poster" src="../images/kk.png" alt="Our boy KK Slider" />
      <div id="audiobox">
        <div>
          <img
            id="songposter"
            src={posterPath(currentStatus)}
            alt="Album cover"
          />
        </div>
        {/* Autoplays if on the Music tab, otherwise load silently */}
        {currentStatus.activeItem === 'music' ? (
          <audio
            controls
            src={songPath(currentStatus)}
            type="audio/mpeg"
            autoPlay
          />
        ) : (
          <audio controls src={songPath(currentStatus)} type="audio/mpeg" />
        )}
      </div>
    </div>
  );
};

export default Player;
