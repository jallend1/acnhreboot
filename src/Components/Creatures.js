import React from "react";
import { properCase } from "../utils";

const Creatures = (props) => {
  const alternateBuyer = (item) => {
    // In item details, shows Flick prices for bugs, CJ for fish
    if (props.activeItem === "bugs") {
      return <h4 id="flick">Flick's Price: {item["price-flick"]} bells</h4>;
    } else if (item["price-cj"]) {
      return <h4 id="cj">CJ's Price: {item["price-cj"]} bells</h4>;
    }
  };
  const annualAvailability = (availability) => {
    return (
      <>
        <p>Northern Hemisphere: {availability["month-northern"]}</p>
        <p>Southern Hemisphere: {availability["month-southern"]}</p>
      </>
    );
  };

  const calculateAvailability = (availability) => {
    const northernMonths = availability["month-array-northern"];
    const currentMonth = props.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  const displayAvailability = (availability) => {
    return (
      <div>
        <h4>Availability</h4>
        <div>
          Time:{" "}
          {availability.isAllDay ? "Available all day" : availability.time}
        </div>
        <div>
          Months:{" "}
          {availability.isAllYear
            ? "Available year-round"
            : annualAvailability(availability)}
        </div>
        <p>Location: {availability.location}</p>
        <p>Rarity: {availability.rarity}</p>
      </div>
    );
  };

  const displayItems = (item) => {
    return (
      <div key={item["file-name"]}>
        {renderHeader(item)}
        {renderDetails(item)}
      </div>
    );
  };
  const displayPrice = (item) => {
    if (props.sortBy === "cj") {
      return <h4>{item["price-cj"]} bells</h4>;
    } else if (props.sortBy === "flick") {
      return <h4>{item["price-flick"]} bells</h4>;
    } else {
      return <h4>{item.price} bells</h4>;
    }
  };

  const renderAvailability = ({ availability }) => {
    let availableToday;
    props.activeItem === "fossils"
      ? (availableToday = true)
      : (availableToday = calculateAvailability(availability));
    return (
      <img
        src={
          availableToday ? "./images/available.png" : "./images/unavailable.png"
        }
        alt={availableToday ? "Available" : "Unavailable"}
      />
    );
  };
  const renderCollapse = (item) => {
    return (
      <img
        src={item.collapsed ? "./images/expand.png" : "./images/collapse.png"}
        alt={item.collapsed ? "Expand" : "Collapse"}
        id="expandtoggle"
        onClick={() =>
          props.toggleCollapse(item["file-name"], props.activeItem)
        }
      />
    );
  };
  const renderDetails = (item) => {
    return (
      <div className={item.collapsed ? "collapsed details" : "details"}>
        <img
          src={`./images/${props.activeItem}/${item["file-name"]}.png`}
          alt={item.name["name-USen"]}
        />
        {alternateBuyer(item)}
        {renderPhrases(item)}
        {props.activeItem === "fossils"
          ? null
          : displayAvailability(item.availability)}
      </div>
    );
  };
  const renderHeader = (item) => {
    return (
      <div className="item">
        <header className="itemhead">
          <input
            type="checkbox"
            name="markcomplete"
            value={item.name["name-USen"]}
            onChange={props.markComplete}
            // If item included in Completed, renders the box to the page already checked
            checked={props.completed[props.activeItem].includes(
              item.name["name-USen"]
            )}
          />
          <h3>{properCase(item.name["name-USen"])}</h3>
          {displayPrice(item)}
          {renderIcon(item)}
          {renderCollapse(item)}
          {renderAvailability(item)}
        </header>
      </div>
    );
  };
  const renderIcon = (item) => {
    return (
      <img
        src={
          props.activeItem === "fossils"
            ? `./images/icons/fossil.png`
            : `./images/icons/${props.activeItem}/${item["file-name"]}.png`
        }
        alt={item.name["name-USen"]}
      />
    );
  };

  const renderPhrases = (item) => {
    return (
      <>
        <p>{item["catch-phrase"]}</p>
        <div>
          <p>
            <span role="img" aria-label="owl emoji">
              🦉
            </span>
            Blathers' Take
            <span role="img" aria-label="owl emoji">
              🦉
            </span>
          </p>
          <p>{item["museum-phrase"]}</p>
        </div>
      </>
    );
  };

  return (
    <>
      <h2>{props.activeItem.toUpperCase()}</h2>
      {props.activeItems.map((item) => displayItems(item))}
    </>
  );
};

export default Creatures;
