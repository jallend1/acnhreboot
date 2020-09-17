import React from 'react';
import { ItemContext } from '../contexts/ItemContext';
class Filter extends React.Component {
  // Shows collapse/expand details on only creatures and fossils
  static contextType = ItemContext;
  showCollapse = (isCreature) => {
    if (isCreature || this.context.activeItem === 'fossils') {
      return (
        <>
          <div className="collapse-toggle">
            <button
              className="btn collapse-toggle green accent-4"
              onClick={() => this.context.collapseAll(this.context.activeItem)}
            >
              Collapse All
            </button>
          </div>
          <div className="collapse-toggle">
            <button
              className="btn collapse-toggle green accent-4"
              onClick={() => this.context.expandAll(this.context.activeItem)}
            >
              Expand All
            </button>
          </div>
        </>
      );
    } else {
      return null;
    }
  };
  // Shows 'Limit to creatures available today' to only the creatures pages
  showToday = (isCreature) => {
    if (isCreature) {
      return (
        <div>
          <label>
            <input
              type="checkbox"
              id="available"
              name="available"
              onClick={this.context.toggleAvailable}
            />
            <span>Limit to creatures available today</span>
          </label>
        </div>
      );
    } else {
      return null;
    }
  };

  //The search bar (The same across all types)
  renderDescending = () => {
    return (
      <label>
        <input
          type="checkbox"
          id="descending"
          name="descending"
          onChange={this.context.toggleDescending}
        />
        <span>Descending order</span>
      </label>
    );
  };
  renderSearchBar = () => {
    return (
      <form id="searchForm">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <label htmlFor="search" className="active">
            Search the {this.context.activeItem}...
          </label>
          <input
            id="search"
            type="text"
            // Populates the field with the search value, persisting it across item types
            value={this.context.searchValue}
            onChange={this.context.searchField}
          />
        </div>
      </form>
    );
  };

  showBirthdays = () => {
    if (this.context.activeItem === 'villagers') {
      return <option value="birthdayDaysAway">Days Until Birthday</option>;
    }
  };
  showCJ = () => {
    if (this.context.activeItem === 'fish') {
      return <option value="price-cj">CJ's Price</option>;
    }
  };
  showFlick = () => {
    if (this.context.activeItem === 'bugs') {
      return <option value="price-flick">Flick's Price</option>;
    }
  };
  showNook = () => {
    // Allow sorting by Nook's price for everything other than Villagers, art, and music
    if (
      this.context.activeItem !== 'villagers' &&
      this.context.activeItem !== 'art' &&
      this.context.activeItem !== 'music'
    ) {
      return <option value="price">Nook's Price</option>;
    }
  };

  renderSelectMenu = () => {
    return (
      <label>
        <span>Sort By:</span>
        <select name="sortby" className="browser-default">
          <option value="alpha">Alphabetical</option>
          {this.showNook()}
          {this.showCJ()}
          {this.showFlick()}
          {this.showBirthdays()}
        </select>
      </label>
    );
  };
  render() {
    // Creatures boolean because fish, bugs, sea creatures all have overlapping filters
    const isCreature =
      this.context.activeItem === 'fish' ||
      this.context.activeItem === 'bugs' ||
      this.context.activeItem === 'sea';
    return (
      <div className="filterbar">
        {this.renderSearchBar()}
        <div id="filters">
          <form onChange={this.context.changeSort}>
            {this.renderSelectMenu()}
          </form>
          <div>
            {this.renderDescending()}
            {this.showToday(isCreature)}
          </div>
          <div>
            {this.showCollapse(isCreature)}
            <button
              className="btn red lighten-2"
              onClick={this.context.clearCollected}
            >
              Clear ALL completed items
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
