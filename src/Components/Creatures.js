import React from 'react';
import { properCase } from '../utils';
import Details from './Creature/Details';
import { ItemContext } from '../contexts/ItemContext';

class Creatures extends React.Component {
  static contextType = ItemContext;
  componentDidMount() {
    this.context.changeActiveItem(this.props.match.params.creature);
  }

  calculateAvailability = (availability) => {
    const northernMonths = availability['month-array-northern'];
    const currentMonth = this.context.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  displayItems = (item) => {
    return (
      <React.Fragment key={item['file-name']}>
        <tr>{this.renderHeader(item)}</tr>
        {this.renderDetails(item)}
      </React.Fragment>
    );
  };
  displayPrice = (item) => {
    if (this.context.sortBy === 'cj') {
      return <h6>{item['price-cj']} bells</h6>;
    } else if (this.context.sortBy === 'flick') {
      return <h6>{item['price-flick']} bells</h6>;
    } else {
      return <h6>{item.price} bells</h6>;
    }
  };

  renderAvailability = ({ availability }) => {
    let availableToday;
    this.context.activeItem === 'fossils'
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
          this.context.toggleCollapse(
            item['file-name'],
            this.context.activeItem
          )
        }
      >
        expand_more
      </i>
    ) : (
      <i
        className="material-icons"
        onClick={() =>
          this.context.toggleCollapse(
            item['file-name'],
            this.context.activeItem
          )
        }
      >
        expand_less
      </i>
    );
  };

  renderComplete = (item) => {
    return (
      <label>
        <input
          type="checkbox"
          name="markcomplete"
          value={item.name['name-USen']}
          onChange={this.props.markComplete}
          // If item included in Completed, renders the box to the page already checked
          checked={this.props.completed[this.context.activeItem].includes(
            item.name['name-USen']
          )}
        />
        <span>Mark Complete</span>
      </label>
    );
  };

  renderDetails = (item) => {
    if (item.collapsed === false) {
      return (
        <>
          <tr>
            {/* Makes the single cell containing the new table span the width of the parent table  */}
            <td colSpan="6">
              <Details item={item} activeItem={this.context.activeItem} />
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
        <td>{this.renderComplete(item)}</td>

        <td>
          <h5>{properCase(item.name['name-USen'])}</h5>
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
          this.context.activeItem === 'fossils'
            ? `../images/icons/fossil.png`
            : `../images/icons/${this.context.activeItem}/${item['file-name']}.png`
        }
        alt={item.name['name-USen']}
      />
    );
  };
  tableBody = () => {
    return this.context.activeItems.map((item) => this.displayItems(item));
  };

  render() {
    return (
      <>
        <div className="container">
          <h5>{this.context.activeItem.toUpperCase()}</h5>
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
            <tbody>{this.tableBody()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Creatures;
