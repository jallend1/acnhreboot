import React from "react";

function Details(props) {
  return (
    <div className={props.item.collapsed ? "collapsed details" : "details"}>
      <img
        src={`./images/${props.activeItem}/${props.item["file-name"]}.png`}
        alt={props.item.name["name-USen"]}
      />
      {props.alternateBuyer(props.item)}
      <p>{props.item["catch-phrase"]}</p>
      <div>
        <p>
          <span role="img" aria-label="owl emoji">
            🦉
          </span>{" "}
          Blathers' Take{" "}
          <span role="img" aria-label="owl emoji">
            🦉
          </span>
        </p>
        <p>{props.item["museum-phrase"]}</p>
      </div>
      {props.activeItem === "fossils"
        ? null
        : props.displayAvailability(props.item.availability)}
    </div>
  );
}

export default Details;
