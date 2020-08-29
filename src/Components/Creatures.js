import React from "react";
import { properCase } from "../utils";

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

  // Returns pricing information portion of Creature details
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
            <tr>
              <td>Location:</td>
              <td>{item.availability.location}</td>
            </tr>
            <tr>
              <td>Rarity:</td>
              <td>{item.availability.rarity}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>
                {item.availability.isAllDay
                  ? "Available all day"
                  : item.availability.time}
              </td>
            </tr>
            <tr>
              <th colSpan="2" className="center">
                Months
              </th>
            </tr>
            <tr>
              <td>Northern Hempishere:</td>
              <td>
                {item.availability.isAllYear
                  ? "Available year-round"
                  : item.availability["month-northern"]}
              </td>
            </tr>
            <tr>
              <td>Southern Hemisphere:</td>
              <td>
                {item.availability.isAllYear
                  ? "Available year-round"
                  : item.availability["month-southern"]}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  };
  tableInfo = (item) => {
    return (
      <table className="detailsTable">
        <caption>
          <q>{item["catch-phrase"]}</q>
        </caption>
        <thead>
          <tr>
            <th colSpan="2" className="image">
              <img
                src={`../images/${this.props.activeItem}/${item["file-name"]}.png`}
                alt={item.name["name-USen"]}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="../images/blathers.png"
                alt="Blathers the Owl"
                className="blathers"
              />
            </td>
            <td>
              <h5 className="center">
                <span role="img" aria-label="owl emoji">
                  🦉
                </span>
                Blathers' Take
                <span role="img" aria-label="owl emoji">
                  🦉
                </span>
              </h5>
              <blockquote>{item["museum-phrase"]}</blockquote>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  tablePricing = (item) => {
    return (
      <table className="centered detailsTable">
        <thead>
          <tr>
            <th colSpan="2" className="center">
              Pricing
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nook's Price: </td>
            <td>{item.price} bells</td>
          </tr>
          <tr>
            <td>{item["price-cj"] ? "CJ's Price:" : "Flick's Price"}</td>
            <td>
              {item["price-cj"] ? item["price-cj"] : item["price-flick"]} bells
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  renderDetails = (item) => {
    if (item.collapsed === false) {
      return (
        <>
          <tr>
            {/* Makes the single cell containing the new table span the width of the parent table  */}
            <td colSpan="6">
              {this.tableInfo(item)}
              {this.tablePricing(item)}
              {this.tableAvailability(item)}
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
