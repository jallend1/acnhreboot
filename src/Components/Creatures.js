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
        <tr>
          <td>{this.renderDetails(item)}</td>
        </tr>
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
      <>
        <img
          src={`../images/${this.props.activeItem}/${item["file-name"]}.png`}
          alt={item.name["name-USen"]}
        />
        <table>
          <thead>
            <tr>
              <th>Pricing</th>
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
                {item["price-cj"] ? item["price-cj"] : item["price-flick"]}{" "}
                bells
              </td>
            </tr>
          </tbody>
        </table>
        {this.props.activeItem === "fossils" ? null : ( //Anything other than fossils, display availability
          <table>
            <thead>
              <tr>
                <th>Availability</th>
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
                <th colSpan="2">Months</th>
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
        )}
        <table>
          <thead>
            <tr>
              <th>Catch Phrase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item["catch-phrase"]}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>
                <span role="img" aria-label="owl emoji">
                  🦉
                </span>
                Blathers' Take
                <span role="img" aria-label="owl emoji">
                  🦉
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item["museum-phrase"]}</td>
            </tr>
          </tbody>
        </table>
      </>
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
              <th>Expand</th>
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
