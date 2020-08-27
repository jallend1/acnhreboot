import React from "react";
class Filter extends React.Component {
  determineSearchFields() {
    if (this.props.activeItem === "fish") {
      return (
        <>
          <p>
            <label>
              <input type="radio" id="nook" name="sortby" value="price" />
              <span>Nook's Price</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio" id="cj" name="sortby" value="price-cj" />
              <span>CJ's Price</span>
            </label>
          </p>
        </>
      );
    } else if (this.props.activeItem === "bugs") {
      return (
        <>
          <p>
            <label>
              <input type="radio" id="nook" name="sortby" value="price" />
              <span>Nook's Price</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                id="flick"
                name="sortby"
                value="price-flick"
              />
              <span>Flick's Price</span>
            </label>
          </p>
        </>
      );
    } else if (
      this.props.activeItem === "fossils" ||
      this.props.activeItem === "sea"
    ) {
      return (
        <>
          <p>
            <label>
              <input type="radio" id="nook" name="sortby" value="price" />
              <span>Nook's Price</span>
            </label>
          </p>
        </>
      );
    } else if (this.props.activeItem === "villagers") {
      return (
        <>
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
        </>
      );
    }
  }
  render() {
    return (
      <>
        <form id="searchForm">
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <label htmlFor="search" className="active">
              Search for items...
            </label>
            <input
              id="search"
              type="text"
              // placeholder="Search for item..."
              onChange={this.props.searchField}
            />
          </div>
        </form>
        <div id="filters">
          <form onChange={this.props.changeSort}>
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
            {this.determineSearchFields()}
          </form>
          <label>
            <input
              type="checkbox"
              id="descending"
              name="descending"
              onChange={this.props.toggleDescending}
            />
            <span>Descending order</span>
          </label>
          <div>
            <button
              onClick={() => this.props.collapseAll(this.props.activeItem)}
            >
              Collapse All
            </button>
            <button onClick={() => this.props.expandAll(this.props.activeItem)}>
              Expand All
            </button>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                id="available"
                name="available"
                onClick={this.props.toggleAvailable}
              />
              <span>Limit to creatures available today</span>
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
