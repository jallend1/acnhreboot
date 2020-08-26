import React from "react";
import { properCase } from "../utils";
import Pricing from "./Pricing";
import Availability from "./Availability";
import Phrases from "./Phrases";

class Creature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDetails: "pricing"
    };
  }

  calculateAvailability = (availability) => {
    const northernMonths = availability["month-array-northern"];
    const currentMonth = this.props.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  cardAction = () => {
    return (
      <div className="card-action input-field">
        <label>
          <input
            type="checkbox"
            name="markcomplete"
            value={this.props.item.name["name-USen"]}
            onChange={this.props.markComplete}
            // If item included in Completed, renders the box to the page already checked
            checked={this.props.completed[this.props.activeItem].includes(
              this.props.item.name["name-USen"]
            )}
          />
          <span>Completed?</span>
        </label>
      </div>
    );
  };
  cardTabs = () => {
    return (
      <>
        <div className="card-tabs">
          <ul className="tabs tabs-fixed-width">
            <li className="tab" data-details="pricing" onClick={this.tabClick}>
              Pricing
            </li>
            <li
              className="tab"
              data-details="availability"
              onClick={this.tabClick}
            >
              Availability
            </li>
            <li className="tab" data-details="phrases" onClick={this.tabClick}>
              Phrases
            </li>
          </ul>
        </div>
      </>
    );
  };

  cardTabContent = () => {
    let activeTab = "";
    if (this.state.activeDetails === "pricing") {
      activeTab = <Pricing item={this.props.item} />;
    } else if (this.state.activeDetails === "availability") {
      activeTab = <Availability item={this.props.item} />;
    } else {
      activeTab = <Phrases item={this.props.item} />;
    }
    return <div className="card-content blue accent-1">{activeTab}</div>;
  };
  compileCard = (item) => {
    return (
      <div className="card creature">
        <header className="card-content">
          <div>
            <h5 className="card-title">{properCase(item.name["name-USen"])}</h5>
            {this.renderAvailability(item)}
          </div>
          <div className="card-image">
            <img
              src={`../images/${this.props.activeItem}/${item["file-name"]}.png`}
              alt={item.name["name-USen"]}
            />
          </div>
          {this.props.displayPrice(item)}
        </header>
        {this.cardTabs()}
        {this.cardTabContent()}
        {this.cardAction()}
      </div>
    );
  };

  renderAvailability = ({ availability }) => {
    let availableToday;
    this.props.activeItem === "fossils"
      ? (availableToday = true)
      : (availableToday = this.calculateAvailability(availability));
    if (availableToday) {
      return <i className="material-icons">thumb_up</i>;
    } else {
      return <i className="material-icons">thumb_down</i>;
    }
  };

  tabClick = (e) => {
    this.setState({ activeDetails: e.target.dataset.details });
  };

  render() {
    return this.compileCard(this.props.item);
  }
}

export default Creature;
