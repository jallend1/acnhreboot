// TODO Possibility: Single page to list _all_ items?
// TODO Possibility: Universal search?
// TODO Possibility: Dedicated page for each item; Linked to from Completed Page for expanded details unique to each type
// TODO Possibility: Randomly pick song to have loaded into player on pageload (If there is no activeSong)
// TODO Possibility: What is going on with my routes. It is too ugly to bear.

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';
import Completed from './Components/Completed';
import Welcome from './Components/Welcome';
import Filter from './Components/Filter';
import NavBar from './Components/NavBar';
import Player from './Components/Player';
import { ItemContext } from './contexts/ItemContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      activeItems: [],
      activeSong: '',
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
      descending: false,
      availableToday: false,
      sortBy: 'alpha',
      time: '',
      completed: {
        fish: [],
        bugs: [],
        sea: [],
        fossils: [],
        villagers: [],
        music: [],
        art: [],
        home: []
      },
      searchValue: ''
    };
  }

  static contextType = ItemContext;
  componentDidMount() {
    // Extracts the types of objects from State
    const types = Object.keys(this.state.allItems);
    types.forEach((item) => this.populateData(item)); //Populates all items into state on load
    const now = new Date();
    this.extractLocalStorage();
    this.setState({
      time: now
    });
  }

  extractLocalStorage = () => {
    if (localStorage.getItem('completed') !== null) {
      //If any completed items exist in localStorage, makes them active
      const savedCompleted = localStorage.getItem('completed');
      this.setState(
        { completed: JSON.parse(savedCompleted) },
        this.populateComplete()
      );
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
    this.extractLocalStorage();
  };

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
    const clearedState = {
      fish: [],
      bugs: [],
      sea: [],
      fossils: [],
      villagers: [],
      music: [],
      art: []
    };
    localStorage.removeItem('completed');
    this.setState({ completed: clearedState });
  };

  compareAvailabilityToTime = () => {
    // Called under showAvailable to determine if current active items have limited availability
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

  markComplete = (e) => {
    // TODO Instead of just dumping the item name into a weird array, why not just dump all of the details at the same time?
    const currentState = this.state.completed;
    if (e.target.checked) {
      currentState[this.state.activeItem].push(e.target.value);
      this.setState(
        { completed: currentState },
        localStorage.setItem('completed', JSON.stringify(this.state.completed))
      );
    } else {
      const index = currentState[this.state.activeItem].indexOf(e.target.value);
      currentState[this.state.activeItem].splice(index, 1);
      this.setState(
        { completed: currentState },
        localStorage.setItem('completed', JSON.stringify(this.state.completed))
      );
    }
  };

  playSong = (e) => {
    const activeSong = e.target.dataset.song;
    this.setState({ activeSong });
  };
  populateComplete = () => {
    const currentState = this.state.allItems;
    const completed = this.state.completed;
    const itemArrays = Object.keys(completed); // Extracts all the item types from the completed object list
    itemArrays.forEach((itemArray) => {
      //Runs through item types, and retrieves full item details

      if (itemArray !== 'home') {
        currentState.completed[itemArray] = [];
        if (completed[itemArray].length > 0) {
          // If this item type has anything in it, process it

          completed[itemArray].forEach((item) => {
            const itemDeets = this.state.allItems[itemArray].find(
              (element) => element.name['name-USen'] === item
            ); // All the JSON info on this current item
            const fileLocation =
              itemArray === 'fossils' ||
              itemArray === 'music' ||
              itemArray === 'art'
                ? `./images/${itemArray}/${itemDeets['file-name']}.png`
                : `images/icons/${itemArray}/${itemDeets['file-name']}.png`;
            itemDeets.fileLocation = fileLocation;
            itemDeets.key = `completed${itemDeets.name['name-USen']}`;
            itemDeets.type = itemArray;
            if (
              !currentState.completed.find(
                (item) => item.name['name-USen'] === itemDeets.name['name-USen']
              )
            ) {
              currentState.completed.push(itemDeets);
            }
          });
        }
      }
      this.setState({ allItems: currentState });
    });
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
      <BrowserRouter>
        <div className="container">
          <Header />
          {this.state.activeSong ? (
            <Player activeSong={this.state.activeSong} />
          ) : null}
          <NavBar
            activeItem={this.state.activeItem}
            changeToNew={this.changeToNew}
            types={Object.keys(this.state.allItems)}
          />
          <div className="main-content">
            {this.state.activeItem !== 'home' ? (
              <>
                <Filter
                  activeItem={this.state.activeItem}
                  searchField={this.searchField}
                  changeSort={this.changeSort}
                  collapseAll={this.collapseAll}
                  expandAll={this.expandAll}
                  toggleAvailable={this.toggleAvailable}
                  toggleDescending={this.toggleDescending}
                  descending={this.props.descending}
                />
                <button
                  className="btn green accent-4"
                  onClick={this.clearCollected}
                >
                  Clear ALL completed items
                </button>
              </>
            ) : null}
            <Route
              path="/music"
              render={(props) => (
                <Music
                  activeItem="music"
                  activeItems={this.state.activeItems}
                  searchValue={this.state.searchValue}
                  changeActiveItem={this.changeActiveItem}
                  playSong={this.playSong}
                  toggleCollapse={this.toggleCollapse}
                  markComplete={this.markComplete}
                  completed={this.state.completed}
                  {...props}
                />
              )}
            />
            <Route
              path="/villagers"
              render={(props) => (
                <Villagers
                  activeItem="villagers"
                  activeItems={this.state.activeItems}
                  allItems={this.state.allItems}
                  searchValue={this.state.searchValue}
                  changeActiveItem={this.changeActiveItem}
                  filtered={this.state.filtered}
                  toggleCollapse={this.toggleCollapse}
                  time={this.state.time}
                  markComplete={this.markComplete}
                  completed={this.state.completed}
                  {...props}
                />
              )}
            />
            <Route
              path="/art"
              render={(props) => (
                <Art
                  activeItem="art"
                  searchValue={this.state.searchValue}
                  changeActiveItem={this.changeActiveItem}
                  toggleCollapse={this.toggleCollapse}
                  markComplete={this.markComplete}
                  completed={this.state.completed}
                  allItems={this.state.allItems}
                  {...props}
                />
              )}
            />
            <Route
              path="/completed"
              render={(props) => (
                <Completed
                  activeItem="completed"
                  changeActiveItem={this.changeActiveItem}
                  completed={this.state.completed}
                  allItems={this.state.allItems}
                  populateComplete={this.populateComplete}
                  {...props}
                />
              )}
            />
            <Route
              path="/creatures/:creature"
              render={(props) => {
                return (
                  <Creatures
                    activeItem={props.match.params.creature}
                    activeItems={this.state.activeItems}
                    changeActiveItem={this.changeActiveItem}
                    toggleCollapse={this.toggleCollapse}
                    time={this.state.time}
                    availableToday={this.state.availableToday}
                    markComplete={this.markComplete}
                    sortBy={this.state.sortBy}
                    completed={this.state.completed}
                    allItems={this.state.allItems}
                    showAvailable={this.showAvailable}
                    {...props}
                  />
                );
              }}
            />
            <Route exact path="/">
              <Welcome />
            </Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
