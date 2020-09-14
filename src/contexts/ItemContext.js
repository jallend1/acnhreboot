import React, { Component, createContext } from 'react';

export const ItemContext = createContext();

export default class ItemContextProvider extends Component {
  state = {
    activeItem: 'fish',
    activeItems: [],
    allItems: {
      home: [],
      fish: [],
      bugs: [],
      sea: [],
      fossils: [],
      villagers: [],
      music: [],
      art: [],
      completed: []
    },
    availableToday: false,
    completed: [],
    searchValue: '',
    time: ''
  };

  componentDidMount() {
    const types = Object.keys(this.state.allItems);
    types.forEach((item) => this.populateData(item)); //Populates all items into state on load
    const now = new Date();
    this.extractLocalStorage();
    this.setState({
      time: now
    });
    this.extractLocalStorage();
  }

  // Called under showAvailable to determine if current active items have limited availability
  calculateAvailability = (availability) => {
    const northernMonths = availability['month-array-northern'];
    const currentMonth = this.state.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };
  compareAvailabilityToTime = () => {
    const currentState = this.state.activeItems;
    // Only these creatures have limited availability
    if (
      this.state.activeItem === 'fish' ||
      this.state.activeItem === 'bugs' ||
      this.state.activeItem === 'sea'
    ) {
      return currentState.filter((item) => {
        return this.calculateAvailability(item.availability);
      });
      // Everything else has full availability
    } else {
      return this.state.allItems[this.state.activeItem];
    }
  };

  collapseAll = (activeItem) => {
    const activeItemList = this.state.allItems;
    activeItemList[activeItem].forEach((item) => (item.collapsed = true));
    this.setState({ allItems: activeItemList });
  };

  expandAll = (activeItem) => {
    const activeItemList = this.state.allItems;
    activeItemList[activeItem].forEach((item) => (item.collapsed = false));
    this.setState({ allItems: activeItemList });
  };

  //If any completed items exist in localStorage, makes them active
  extractLocalStorage = () => {
    if (localStorage.getItem('completed') !== null) {
      const savedCompleted = localStorage.getItem('completed');
      this.setState({ completed: JSON.parse(savedCompleted) });
    }
  };

  populateData = (dataType) => {
    if (dataType !== 'completed' && dataType !== 'home') {
      let jsonPath = `../${dataType}.json`;
      fetch(jsonPath)
        .then((data) => data.json())
        .then((results) => {
          const itemList = Object.values(results);
          itemList.forEach((item) => (item.collapsed = true));
          const currentState = this.state.allItems;
          currentState[dataType] = itemList;
          this.setState(
            {
              allItems: currentState,
              activeItems: currentState[this.state.activeItem]
            },
            this.sortAlpha
          );
        });
    }
  };

  showAvailable = () => {
    let activeItems = [];
    // If show only available was just clicked, filters it so
    if (this.state.availableToday) {
      activeItems = this.compareAvailabilityToTime();
    } else {
      // If just unclicked, checks to see if search field has value, and restores array matching that criteria
      if (this.state.searchValue) {
        activeItems = this.state.allItems[
          this.state.activeItem
        ].filter((item) =>
          item.name['name-USen'].toLowerCase().includes(this.state.searchValue)
        );
        // If no filtering criteria, restores the original item list
      } else {
        activeItems = this.state.allItems[this.state.activeItem];
      }
    }
    this.setState({ activeItems });
  };

  toggleAvailable = (e) => {
    e.target.checked
      ? this.setState({ availableToday: true }, this.showAvailable)
      : this.setState({ availableToday: false }, this.showAvailable);
  };
  render() {
    return (
      <ItemContext.Provider
        value={{
          ...this.state,
          expandAll: this.expandAll,
          collapseAll: this.collapseAll,
          showAvailable: this.showAvailable,
          toggleAvailable: this.toggleAvailable
        }}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}
