import React, { Component, createContext } from 'react';
import { properCase } from '../utils';
export const ItemContext = createContext();

export default class ItemContextProvider extends Component {
  state = {
    activeItem: 'home',
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
      completed: [],
      everything: []
    },
    availableToday: false,
    completed: [],
    searchValue: '',
    time: '',
    descending: false,
    sortBy: 'alpha',
    activeSong: ''
  };

  componentDidMount() {
    const types = Object.keys(this.state.allItems);
    types.forEach((item) => this.populateData(item)); //Populates all items into state on load
    this.extractLocalStorage();
    const now = new Date();
    this.setState({
      time: now
    });
  }

  pickSong = (songList) => {
    if (this.state.activeSong === '') {
      const randomNum = Math.floor(Math.random() * songList.length);
      this.setState({ activeSong: songList[randomNum]['file-name'] });
    }
  };

  // Called under showAvailable to determine if current active items have limited availability
  calculateAvailability = (availability) => {
    const northernMonths = availability['month-array-northern'];
    const currentMonth = this.state.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  changeActiveItem = (newType) => {
    this.setState({
      activeItem: newType,
      activeItems: this.state.allItems[newType]
    });
  };

  changeSort = (change) => {
    const target = change.target.value;
    this.setState({ sortBy: target }, this.sortAlpha);
  };

  changeToNew = (e) => {
    const newType = e.target.dataset.id; // Takes the type of creature from the dataset name included in HTML
    const newCreatures = this.state.allItems[newType];
    this.setState(
      { activeItem: newType, activeItems: newCreatures },
      this.sortAlpha
    ); //Sets the new type as active, loads appropriate array, and checks to see if display should be limited to available
  };

  clearCollected = () => {
    const currentState = this.state.allItems;
    currentState.completed = [];
    localStorage.removeItem('completed');
    this.setState({ allItems: currentState });
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
      const currentState = this.state.allItems;
      const savedCompleted = localStorage.getItem('completed');
      currentState.completed = JSON.parse(savedCompleted);
      this.setState({ allItems: currentState });
    }
  };

  // Used in MarkComplete to accommodate 'Marking an item complete' from within different components
  locateItemType = (name) => {
    const types = Object.keys(this.state.allItems);
    for (let i = 0; i < types.length; i++) {
      //   If the item type isn't home or completed, search the array
      if (
        (this.state.allItems[types[i]] !== 'home') &
        (this.state.allItems[types[i]] !== 'completed')
      ) {
        if (
          this.state.allItems[types[i]].some(
            (item) => item.name['name-USen'] === name
          )
        ) {
          return types[i];
        }
      }
    }
  };

  markComplete = (e) => {
    const currentState = this.state.allItems;
    // Determines item type
    const itemType = this.locateItemType(e.target.value);
    if (e.target.checked) {
      const itemDetails = currentState[itemType].find(
        (item) => item.name['name-USen'] === e.target.value
      );
      const imageLocation =
        itemType === 'fossils' || itemType === 'music' || itemType === 'art'
          ? `./images/${itemType}/${itemDetails['file-name']}.png`
          : `images/icons/${itemType}/${itemDetails['file-name']}.png`;
      itemDetails.type = itemType;
      itemDetails.imageLocation = imageLocation;
      currentState.completed.push(itemDetails);
    } else {
      const index = currentState.completed.findIndex(
        (item) => item.name['name-USen'] === e.target.value
      );
      currentState.completed.splice(index, 1);
    }
    this.setState(
      { allItems: currentState },
      localStorage.setItem(
        'completed',
        JSON.stringify(this.state.allItems.completed)
      )
    );
  };

  playSong = (e) => {
    const activeSong = e.target.dataset.song;
    this.setState({ activeSong });
  };

  populateData = (dataType) => {
    if (dataType !== 'completed' && dataType !== 'home') {
      let jsonPath = `../${dataType}.json`;
      fetch(jsonPath)
        .then((data) => data.json())
        .then((results) => {
          const typeInProperCase = properCase(dataType);
          const everything = this.state.allItems.everything;
          const itemList = Object.values(results);
          itemList.forEach((item) => {
            item.collapsed = true;
            const newItem = {
              name: item.name,
              type: typeInProperCase,
              fileName: item['file-name']
            };
            if (
              dataType === 'fish' ||
              dataType === 'bugs' ||
              dataType === 'sea' ||
              dataType === 'fossils'
            ) {
              newItem.price = item.price;
            } else if (dataType === 'music') {
              newItem.price = 800;
            } else if (dataType === 'art') {
              newItem.price = 1245;
            }
            everything.push(newItem);
          });

          const currentState = this.state.allItems;
          currentState[dataType] = itemList;
          currentState.everything = everything;
          if (dataType === 'music') {
            this.pickSong(itemList);
          }
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

  // When the search field receives input, update state and call function to filter results
  searchField = (e) => {
    const searchValue = e.target.value.toLowerCase();
    this.setState({ searchValue }, this.searchResults());
  };

  //
  searchResults = () => {
    const currentData = this.state.allItems[this.state.activeItem];
    const activeItems = currentData.filter((item) =>
      item.name['name-USen'].toLowerCase().includes(this.state.searchValue)
    );
    this.setState({ activeItems }, this.showAvailable);
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

  sortAlpha = () => {
    const activeItems = this.state.activeItems;
    const criteria = this.state.sortBy;
    // If alphabetical is clicked, convert to lowercase and sort alphabetically
    if (criteria === 'alpha') {
      activeItems.sort((a, b) =>
        a.name['name-USen'].toLowerCase() > b.name['name-USen'].toLowerCase()
          ? 1
          : -1
      );

      // If not alpha, sort numerically by either Nook's price or special purhcaser price
    } else {
      activeItems.sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1));
    }
    // If descending is active, reverse the order
    if (this.state.descending) activeItems.reverse();
    this.setState({ activeItems }, this.showAvailable);
  };

  toggleAvailable = (e) => {
    e.target.checked
      ? this.setState({ availableToday: true }, this.showAvailable)
      : this.setState({ availableToday: false }, this.showAvailable);
  };

  toggleCollapse = (item, creatureType) => {
    const currentState = this.state.allItems;
    const itemIndex = currentState[creatureType].findIndex(
      (creature) => creature['file-name'] === item
    );
    let isCollapsed = currentState[creatureType][itemIndex].collapsed;
    isCollapsed = !isCollapsed;
    currentState[creatureType][itemIndex].collapsed = isCollapsed;
    this.setState({ [creatureType]: currentState });
  };

  toggleDescending = (e) => {
    let descending = this.state.descending;
    descending = !descending;
    this.setState({ descending }, this.sortAlpha);
  };
  render() {
    return (
      <ItemContext.Provider
        value={{
          ...this.state,
          expandAll: this.expandAll,
          collapseAll: this.collapseAll,
          showAvailable: this.showAvailable,
          toggleAvailable: this.toggleAvailable,
          changeToNew: this.changeToNew,
          changeActiveItem: this.changeActiveItem,
          changeSort: this.changeSort,
          toggleCollapse: this.toggleCollapse,
          toggleDescending: this.toggleDescending,
          playSong: this.playSong,
          markComplete: this.markComplete,
          clearCollected: this.clearCollected,
          searchField: this.searchField
        }}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}
