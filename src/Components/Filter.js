import React from 'react';
import { ItemContext } from '../contexts/ItemContext';
class Filter extends React.Component {
  // Shows collapse/expand details on only creatures and fossils
  static contextType = ItemContext;
  showCollapse = (isCreature) => {
    if (isCreature || this.context.activeItem === 'fossils') {
      return (
        <div>
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
        </div>
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

  filterAlpha = () => {
    return (
      <p>
        <label>
          <input
            type="radio"
            id="alpha"
            name="sortby"
            value="alpha"
            defaultChecked
          />
          <span>Alphabetical</span>
        </label>
      </p>
    );
  };
  filterBirthday = () => {
    return (
      <p>
        <label>
          <input
            type="radio"
            id="births"
            name="sortby"
            value="birthdayDaysAway"
          />
          <span>Days Until Birthday</span>
        </label>
      </p>
    );
  };
  filterCJ = () => {
    return (
      <p>
        <label>
          <input type="radio" id="cj" name="sortby" value="price-cj" />
          <span>CJ's Price</span>
        </label>
      </p>
    );
  };
  filterFlick = () => {
    return (
      <p>
        <label>
          <input type="radio" id="flick" name="sortby" value="price-flick" />
          <span>Flick's Price</span>
        </label>
      </p>
    );
  };
  filterNook = () => {
    return (
      <p>
        <label>
          <input type="radio" id="nook" name="sortby" value="price" />
          <span>Nook's Price</span>
        </label>
      </p>
    );
  };
  determineSearchFields() {
    if (this.context.activeItem === 'fish') {
      return (
        <>
          {this.filterNook()}
          {this.filterCJ()}
        </>
      );
    } else if (this.context.activeItem === 'bugs') {
      return (
        <>
          {this.filterNook()}
          {this.filterFlick()}
        </>
      );
    } else if (
      this.context.activeItem === 'fossils' ||
      this.context.activeItem === 'sea'
    ) {
      return this.filterNook();
    } else if (this.context.activeItem === 'villagers') {
      return this.filterBirthday();
    }
  }
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
          <input id="search" type="text" onChange={this.context.searchField} />
        </div>
      </form>
    );
  };
  render() {
    // Creatures boolean because fish, bugs, sea creatures all have overlapping filters
    const isCreature =
      this.context.activeItem === 'fish' ||
      this.context.activeItem === 'bugs' ||
      this.context.activeItem === 'sea';
    return (
      <>
        {this.renderSearchBar()}
        <div id="filters">
          <form onChange={this.context.changeSort}>
            {this.filterAlpha()}
            {this.determineSearchFields()}
          </form>
          {this.renderDescending()}
          {this.showCollapse(isCreature)}
          {this.showToday(isCreature)}
        </div>
      </>
    );
  }
}

export default Filter;
