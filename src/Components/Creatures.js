import React from "react";
import { properCase } from "../utils";

class Creatures extends React.Component {
  componentDidMount() {
    this.props.changeActiveItem(this.props.match.params.creature);
  }
  alternateBuyer = (item) => {
    // In item details, shows Flick prices for bugs, CJ for fish
    if (this.props.activeItem === "bugs") {
      return <h4 id="flick">Flick's Price: {item["price-flick"]} bells</h4>;
    } else if (item["price-cj"]) {
      return <h4 id="cj">CJ's Price: {item["price-cj"]} bells</h4>;
    }
  };
  annualAvailability = (availability) => {
    return (
      <>
        <p>Northern Hemisphere: {availability["month-northern"]}</p>
        <p>Southern Hemisphere: {availability["month-southern"]}</p>
      </>
    );
  };

  calculateAvailability = (availability) => {
    const northernMonths = availability["month-array-northern"];
    const currentMonth = this.props.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  displayAvailability = (availability) => {
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
            : this.annualAvailability(availability)}
        </div>
        <p>Location: {availability.location}</p>
        <p>Rarity: {availability.rarity}</p>
      </div>
    );
  };

  displayItems = (item) => {
    return (
      <tr key={item["file-name"]}>
        {this.renderHeader(item)}
        {this.renderDetails(item)}
      </tr>
    );
  };
  displayPrice = (item) => {
    if (this.props.sortBy === "cj") {
      return <h6>{item["price-cj"]} bells</h6>;
    } else if (this.props.sortBy === "flick") {
      return <h6>{item["price-flick"]} bells</h6>;
    } else {
      return <h6>{item.price} bells</h6>;
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
      <>
        <td>
          <label>
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
            <span>Mark Complete</span>
          </label>
        </td>
        <td>
          <h5>{properCase(item.name["name-USen"])}</h5>
        </td>
        <td>{this.displayPrice(item)}</td>
        <td>{this.renderIcon(item)}</td>
        <td>{this.renderCollapse(item)}</td>
        <td>{this.renderAvailability(item)}</td>
      </>
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
      <>
        <h5>{this.props.activeItem.toUpperCase()}</h5>
        <table>
          <thead>
            <tr>
              <th>Complete?</th>
              <th>Name</th>
              <th>Price</th>
              <th>Icon</th>
              <th>Available Now</th>
            </tr>
          </thead>
          <tbody>
            {this.props.activeItems.map((item) => this.displayItems(item))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Creatures;
