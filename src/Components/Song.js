import React from "react";
import { useParams } from "react-router-dom";

const Song = (props) => {
  console.log(props.song);
  const {
    "file-name": fileName,
    "buy-price": buyPrice,
    "sell-price": sellPrice
  } = props.song;
  // name: { "name-USen": name }
  const name = props.song.name["nameUSen"];
  return (
    <div className="item song" key={fileName}>
      <h3>{name}</h3>
      <img
        src={`./images/${props.activeItem}/${fileName}.png`}
        data-song={fileName}
        alt={name}
        onClick={props.playSong}
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

export default Song;
