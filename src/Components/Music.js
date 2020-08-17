import React from "react";
import Player from "./Player";

const Music = (props) => {
  const displaySelection = () => {
    if (props.searchValue) {
      // If there's a search term, return the filtered array
      return props.filtered.map((item) => displaySongs(item));
    } else {
      // If not, go with the original state
      return props.allItems[props.activeItem].map((item) => displaySongs(item));
    }
  };

  const displaySongs = (song) => {
    const {
      "file-name": fileName,
      "buy-price": buyPrice,
      "sell-price": sellPrice,
      name: { "name-USen": name },
    } = song;
    return (
      <div className="item song" key={fileName}>
        <h3>{name}</h3>
        <img
          src={`./images/${props.activeItem}/${fileName}.png`}
          data-song={fileName}
          alt={name}
          // onClick={playSong}
        />
        <div>
          <label htmlFor="markcomplete">Mark complete?</label>
          <input
            type="checkbox"
            name="markcomplete"
            value={name}
            checked={props.completed[props.activeItem].includes(name)}
            onChange={props.markComplete}
          />
        </div>
        <p>
          Purchase Price:{" "}
          {buyPrice ? `${buyPrice} bells` : "Not available for purchase."}
        </p>
        <p>Sell Value: {sellPrice} bells</p>
      </div>
    );
  };

  // TODO: Restore playing functionality on main App page
  // const playSong = (e) => {
  //   const activeSong = e.target.dataset.song;
  //   this.setState({ activeSong });
  // };

  return (
    <>
      <h2>{props.activeItem.toUpperCase()}</h2>
      <div id="songplayer">
        {/* <Player activeSong={this.state.activeSong} /> */}
      </div>
      <div id="songdisplay">{displaySelection()}</div>
    </>
  );
};

export default Music;
