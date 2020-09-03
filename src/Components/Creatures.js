import React from "react";
import { properCase } from "../utils";
import Location from "./Creature/Location";
import Months from "./Creature/Months";
import Details from "./Creature/Details";

class Creatures extends React.Component {
  componentDidMount() {
    this.props.changeActiveItem(this.props.match.params.creature);
  }

  calculateAvailability = (availability) => {
    const northernMonths = availability["month-array-northern"];
    const currentMonth = this.props.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  displayItems = (item) => {
    return (
      <>
        <tr key={item["file-name"]}>{this.renderHeader(item)}</tr>
        {this.renderDetails(item)}
      </>
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
    return availableToday ? (
      <i className="material-icons green-text">check_circle</i>
    ) : (
      <i className="material-icons red-text">cancel</i>
    );
  };
  renderCollapse = (item) => {
    return item.collapsed ? (
      <i
        className="material-icons"
        onClick={() =>
          this.props.toggleCollapse(item["file-name"], this.props.activeItem)
        }
      >
        expand_more
      </i>
    ) : (
      <i
        className="material-icons"
        onClick={() =>
          this.props.toggleCollapse(item["file-name"], this.props.activeItem)
        }
      >
        expand_less
      </i>
    );
  };

  tableAvailability = (item) => {
    if (this.props.activeItem !== "fossils") {
      return (
        // this.props.activeItem === "fossils" ? null : ( //Anything other than fossils, display availability
        <table className="detailsTable centered">
          <thead>
            <tr>
              <th colSpan="2">Availability</th>
            </tr>
          </thead>
          <tbody>
            <Location item={item} />
            <Months item={item} />
          </tbody>
        </table>
      );
    }
  };

  renderDetails = (item) => {
    if (item.collapsed === false) {
      return (
        <>
          <tr>
            {/* Makes the single cell containing the new table span the width of the parent table  */}
            <td colSpan="6">
              <Details item={item} activeItem={this.props.activeItem} />
            </td>
          </tr>
        </>
      );
    } else {
      return null;
    }
  };

  renderHeader = (item) => {
    return (
      <>
        <td key={item.name["name-USen"] + "header"}>
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

  render() {
    return (
      <>
        <div className="container">
          <h5>{this.props.activeItem.toUpperCase()}</h5>
          <table className="highlight">
            <thead>
              <tr>
                <th>Complete?</th>
                <th>Name</th>
                <th>Price</th>
                <th>Icon</th>
                <th>Expand</th>
                <th>Available Now</th>
              </tr>
            </thead>
            <tbody>
              {this.props.activeItems.map((item) => this.displayItems(item))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Creatures;
