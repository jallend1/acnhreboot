import React from "react";
class Filter extends React.Component {
  determineSearchFields() {
    if (this.props.activeItem === "fish") {
      return (
        <>
          <input type="radio" id="nook" name="sortby" value="price" />
          <label htmlFor="nook">Nook's Price </label>
          <input type="radio" id="cj" name="sortby" value="price-cj" />
          <label htmlFor="cj">CJ's Price </label>
        </>
      );
    } else if (this.props.activeItem === "bugs") {
      return (
        <>
          <input type="radio" id="nook" name="sortby" value="price" />
          <label htmlFor="nook">Nook's Price </label>
          <input type="radio" id="flick" name="sortby" value="price-flick" />
          <label htmlFor="flick">Flick's Price</label>
        </>
      );
    } else if (
      this.props.activeItem === "fossils" ||
      this.props.activeItem === "sea"
    ) {
      return (
        <>
          <input type="radio" id="nook" name="sortby" value="price" />
          <label htmlFor="nook">Nook's Price </label>
        </>
      );
    } else if (this.props.activeItem === "villagers") {
      return (
        <>
          <input
            type="radio"
            id="births"
            name="sortby"
            value="birthdayDaysAway"
          />
          <label htmlFor="births">Days Until Birthday</label>
        </>
      );
    }
  }
  render() {
    return (
      <>
        <form id="searchForm">
          <input
            type="text"
            placeholder="Search for item..."
            onChange={this.props.searchField}
          ></input>
          <button onClick={this.props.handleReset}>Clear</button>
        </form>
        <div id="filters">
          <form onChange={this.props.changeSort}>
            <input
              type="radio"
              id="alpha"
              name="sortby"
              value="alpha"
              defaultChecked
            />
            <label htmlFor="alpha">Alphabetical</label>
            {this.determineSearchFields()}
          </form>
          <input
            type="checkbox"
            id="descending"
            name="descending"
            onChange={this.props.toggleDescending}
          />
          <label htmlFor="descending">Sort in descending order</label>
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
            <input
              type="checkbox"
              id="available"
              name="available"
              onClick={this.props.toggleAvailable}
            />
            <label htmlFor="available">
              Limit to creatures available today
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
