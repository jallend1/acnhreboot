import React, { useContext } from "react";
import { ItemContext } from "../contexts/ItemContext";

const DetailsSong = ({ song }) => {
  const { playSong, allItems, markComplete } = useContext(ItemContext);
  const {
    "file-name": fileName,
    "buy-price": buyPrice,
    "sell-price": sellPrice,
    name: { "name-USen": name },
  } = song;
  return (
    <div className="card song center" key={fileName}>
      <div className="card-image">
        <img
          src={`../images/music/${fileName}.png`}
          data-song={fileName}
          alt={name}
          onClick={playSong}
        />
        <div className="clicktoplay">Click to play</div>
      </div>
      <span className="card-title">{name}</span>
      <div className="card-content">
        <p>
          Purchase Price:{" "}
          {buyPrice ? `${buyPrice} bells` : "Not available for purchase."}
        </p>
        <p>Sell Value: {sellPrice} bells</p>
      </div>
      <div className="card-action">
        <label>
          <input
            type="checkbox"
            name="markcomplete"
            value={name}
            checked={
              allItems.completed.filter(
                (item) => item.name["name-USen"] === name
              ).length > 0
            }
            onChange={markComplete}
          />
          <span>Mark Complete</span>
        </label>
      </div>
    </div>
  );
};

export default DetailsSong;
