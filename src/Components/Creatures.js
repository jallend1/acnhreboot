import React from "react";
import { properCase } from "../utils";
import Creature from "./Creature";

class Creatures extends React.Component {
  componentDidMount() {
    this.props.changeActiveItem(this.props.match.params.creature);
  }
  displayPrice = (item) => {
    if (this.props.sortBy === "cj") {
      return <h4>{item["price-cj"]} bells</h4>;
    } else if (this.props.sortBy === "flick") {
      return <h4>{item["price-flick"]} bells</h4>;
    } else {
      return <h4>{item.price} bells</h4>;
    }
  };

  renderAvailability = ({ availability }) => {
    let availableToday;
    this.props.activeItem === "fossils"
      ? (availableToday = true)
      : (availableToday = this.calculateAvailability(availability));
    return (
      <img
        src={
          availableToday
            ? "../images/available.png"
            : "../images/unavailable.png"
        }
        alt={availableToday ? "Available" : "Unavailable"}
      />
    );
  };
  renderCollapse = (item) => {
    return (
      <img
        src={item.collapsed ? "../images/expand.png" : "../images/collapse.png"}
        alt={item.collapsed ? "Expand" : "Collapse"}
        id="expandtoggle"
        onClick={() =>
          this.props.toggleCollapse(item["file-name"], this.props.activeItem)
        }
      />
    );
  };
  renderDetails = (item) => {
    return (
      <div className={item.collapsed ? "collapsed details" : "details"}>
        <img
          src={`../images/${this.props.activeItem}/${item["file-name"]}.png`}
          alt={item.name["name-USen"]}
        />
        {this.alternateBuyer(item)}
        {this.renderPhrases(item)}
        {this.props.activeItem === "fossils"
          ? null
          : this.displayAvailability(item.availability)}
      </div>
    );
  };
  renderHeader = (item) => {
    return (
      <div className="item">
        <header className="itemhead">
          <input
            type="checkbox"
            name="markcomplete"
            value={item.name["name-USen"]}
            onChange={this.props.markComplete}
            // If item included in Completed, renders the box to the page already checked
            checked={this.props.completed[this.props.activeItem].includes(
              item.name["name-USen"]
            )}
          />
          <h3>{properCase(item.name["name-USen"])}</h3>
          {this.displayPrice(item)}
          {this.renderIcon(item)}
          {this.renderCollapse(item)}
          {this.renderAvailability(item)}
        </header>
      </div>
    );
  };
  renderIcon = (item) => {
    return (
      <img
        src={
          this.props.activeItem === "fossils"
            ? `../images/icons/fossil.png`
            : `../images/icons/${this.props.activeItem}/${item["file-name"]}.png`
        }
        alt={item.name["name-USen"]}
      />
    );
  };

  renderPhrases = (item) => {
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
  render() {
    return (
      <div className="container">
        <h2>{this.props.activeItem.toUpperCase()}</h2>
        <div className="items">
          {/* {this.props.activeItems.map((item) => this.displayItems(item))} */}
          {this.props.activeItems.map((item) => (
            <Creature
              item={item}
              displayPrice={this.displayPrice}
              activeItem={this.props.activeItem}
              key={item.name["name-USen"]}
              time={this.props.time}
              markComplete={this.props.markComplete}
              completed={this.props.completed}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Creatures;
