import React from "react";
import Header from "./Components/Header";
import Creatures from "./Components/Creatures";
import Music from "./Components/Music";
import Villagers from "./Components/Villagers";
import Art from "./Components/Art";
import Completed from "./Components/Completed";
import Welcome from "./Components/Welcome";
import Filter from "./Components/Filter";
import Player from "./Components/Player";
import { properCase } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "fish",
      activeItems: [],
      allItems: {
        fish: [],
        bugs: [],
        sea: [],
        fossils: [],
        villagers: [],
        music: [],
        art: [],
        completed: [],
      },
      descending: false,
      limitToAvailable: false,
      sortBy: "alpha",
      types: [
        "fish",
        "bugs",
        "sea",
        "fossils",
        "music",
        "villagers",
        "art",
        "completed",
      ],
      time: "",
      completed: {
        fish: [],
        bugs: [],
        sea: [],
        fossils: [],
        villagers: [],
        music: [],
        art: [],
      },
      searchValue: "",
    };
  }

  componentDidMount() {
    this.state.types.forEach((item) => this.populateData(item)); //Populates all items into state on load
    const now = new Date();
    if (localStorage.getItem("completed") !== null) {
      //If any completed items exist in localStorage, makes them active
      const savedCompleted = localStorage.getItem("completed");
      this.setState({ completed: JSON.parse(savedCompleted) });
    }
    this.setState({ time: now });
  }

  populateData = (dataType) => {
    if (dataType !== "completed") {
      fetch(`./${dataType}.json`)
        .then((data) => data.json())
        .then((results) => {
          const itemList = Object.values(results);
          itemList.forEach((item) => (item.collapsed = true));
          const currentState = this.state.allItems;
          currentState[dataType] = itemList;
          this.setState(
            {
              allItems: currentState,
              activeItems: currentState[this.state.activeItem],
            },
            this.sortAlpha
          );
        });
    }
  };

  calculateAvailability = (availability) => {
    const northernMonths = availability["month-array-northern"];
    const currentMonth = this.state.time.getMonth() + 1; // API keeps months according to calendar, JS starts at 0;
    return northernMonths.includes(currentMonth); // If current month is incluced in array of availibility, true
  };

  changeActiveItem = (newType) => {
    this.setState({
      activeItem: newType,
      activeItems: this.state.allItems[newType],
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
      art: [],
    };
    localStorage.removeItem("completed");
    this.setState({ completed: clearedState });
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

  handleReset = (e) => {
    e.preventDefault();
  };

  markComplete = (e) => {
    console.log(e);
    const currentState = this.state.completed;
    if (e.target.checked) {
      currentState[this.state.activeItem].push(e.target.value);
      this.setState(
        { completed: currentState },
        localStorage.setItem("completed", JSON.stringify(this.state.completed))
      );
    } else {
      const index = currentState[this.state.activeItem].indexOf(e.target.value);
      currentState[this.state.activeItem].splice(index, 1);
      this.setState(
        { completed: currentState },
        localStorage.setItem("completed", JSON.stringify(this.state.completed))
      );
    }
  };

  populateComplete = () => {
    const currentState = this.state.allItems;
    const completed = this.state.completed;
    const itemArrays = Object.keys(completed); // Extracts all the item types from the completed object list
    itemArrays.forEach((itemArray) => {
      //Runs through item types, and retrieves full item details
      currentState.completed[itemArray] = [];
      if (completed[itemArray]) {
        // If this item type has anything in it, process it
        completed[itemArray].forEach((item) => {
          const itemDeets = this.state.allItems[itemArray].find(
            (element) => element.name["name-USen"] === item
          ); // All the JSON info on this current item
          const fileLocation =
            itemArray === "fossils" ||
            itemArray === "music" ||
            itemArray === "art"
              ? `./images/${itemArray}/${itemDeets["file-name"]}.png`
              : `images/icons/${itemArray}/${itemDeets["file-name"]}.png`;
          itemDeets.fileLocation = fileLocation;
          itemDeets.key = `completed${itemDeets.name["name-USen"]}`;
          itemDeets.type = itemArray;
          if (
            !currentState.completed.find(
              (item) => item.name["name-USen"] === itemDeets.name["name-USen"]
            )
          ) {
            currentState.completed.push(itemDeets);
          }
        });
      }
      this.setState({ allItems: currentState });
    });
  };
  renderTypes = (types) => {
    // Generates list of item types for NavBar
    return types.map((type) => {
      return (
        <NavLink
          to={`/${type}`}
          key={type}
          data-id={type}
          onClick={this.changeToNew}
        >
          {properCase(type)}
        </NavLink>
      );
    });
  };

  searchField = (e) => {
    if (e.currentTarget.value) {
      const searchValue = e.currentTarget.value.toLowerCase();
      this.setState({ searchValue }, this.searchResults);
    } else {
      this.setState({
        searchValue: "",
        activeItems: this.state.allItems[this.state.activeItem],
      });
    }
  };

  searchResults = () => {
    const currentData = this.state.allItems[this.state.activeItem];
    const activeItems = currentData.filter((item) =>
      item.name["name-USen"].toLowerCase().includes(this.state.searchValue)
    );
    this.setState({ activeItems }, this.showAvailable);
  };
  showAvailable = () => {
    const currentState = this.state.activeItems;
    let activeItems = [];
    // If only looking at today, filters it so
    if (this.state.availableToday) {
      activeItems = currentState.filter((item) => {
        return this.calculateAvailability(item.availability);
        // console.log(item);
        // return item.availableToday;
      });
      // If not, checks to see if search field has value, and restores array matching that criteria
    } else {
      if (this.state.searchValue) {
        activeItems = this.state.allItems[
          this.state.activeItem
        ].filter((item) =>
          item.name["name-USen"].toLowerCase().includes(this.state.searchValue)
        );
        // If no search values, restores the original item list
      } else {
        activeItems = this.state.allItems[this.state.activeItem];
      }
    }
    this.setState({ activeItems });
  };

  sortAlpha = () => {
    const activeItems = this.state.activeItems;
    const criteria = this.state.sortBy;
    if (criteria === "alpha") {
      activeItems.sort((a, b) =>
        a.name["name-USen"].toLowerCase() > b.name["name-USen"].toLowerCase()
          ? 1
          : -1
      );
    } else {
      activeItems.sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1));
    }
    if (this.state.descending) activeItems.reverse();
    this.setState({ activeItems }, this.showAvailable);
  };

  toggleAvailable = (e) => {
    if (e.target.checked) {
      this.setState({ availableToday: true }, this.showAvailable);
    } else {
      this.setState({ availableToday: false }, this.showAvailable);
    }
  };

  toggleCollapse = (item, creatureType) => {
    const currentState = this.state.allItems;
    const itemIndex = currentState[creatureType].findIndex(
      (creature) => creature["file-name"] === item
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
  // TODO : Universal active state? Allow filtering from main page, drying out code pretty dramatically; Routes in own file?
  render() {
    return (
      <div className="container">
        <Header />
        <Filter
          activeItem={this.state.activeItem}
          searchField={this.searchField}
          handleReset={this.handleReset}
          changeSort={this.changeSort}
          collapseAll={this.collapseAll}
          expandAll={this.expandAll}
          toggleAvailable={this.toggleAvailable}
          toggleDescending={this.toggleDescending}
          descending={this.props.descending}
        />
        <Router>
          <nav>
            <ul>{this.renderTypes(this.state.types)}</ul>
          </nav>
          <button onClick={this.clearCollected}>
            Clear ALL completed items
          </button>
          <Switch>
            <Route path="/fish">
              <Creatures
                activeItem="fish"
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
              />
            </Route>
            <Route path="/bugs">
              <Creatures
                activeItem="bugs"
                activeItems={this.state.activeItems}
                toggleCollapse={this.toggleCollapse}
                changeActiveItem={this.changeActiveItem}
                time={this.state.time}
                markComplete={this.markComplete}
                sortBy={this.state.sortBy}
                completed={this.state.completed}
                allItems={this.state.allItems}
                showAvailable={this.showAvailable}
              />
            </Route>
            <Route path="/sea">
              <Creatures
                activeItem="sea"
                activeItems={this.state.activeItems}
                toggleCollapse={this.toggleCollapse}
                changeActiveItem={this.changeActiveItem}
                time={this.state.time}
                markComplete={this.markComplete}
                completed={this.state.completed}
                allItems={this.state.allItems}
                showAvailable={this.showAvailable}
              />
            </Route>
            <Route path="/fossils">
              <Creatures
                activeItem="fossils"
                activeItems={this.state.activeItems}
                toggleCollapse={this.toggleCollapse}
                changeActiveItem={this.changeActiveItem}
                time={this.state.time}
                markComplete={this.markComplete}
                completed={this.state.completed}
                allItems={this.state.allItems}
                showAvailable={this.showAvailable}
              />
            </Route>
            <Route path="/music">
              <Music
                allItems={this.state.allItems}
                activeItem="music"
                changeActiveItem={this.changeActiveItem}
                playSong={this.playSong}
                filtered={this.state.filtered}
                toggleCollapse={this.toggleCollapse}
                markComplete={this.markComplete}
                completed={this.state.completed}
              />
            </Route>
            <Route path="/villagers">
              <Villagers
                allItems={this.state.allItems}
                activeItem="villagers"
                changeActiveItem={this.changeActiveItem}
                filtered={this.state.filtered}
                toggleCollapse={this.toggleCollapse}
                time={this.state.time}
                markComplete={this.markComplete}
                completed={this.state.completed}
              />
            </Route>
            <Route path="/art">
              <Art
                activeItem="art"
                changeActiveItem={this.changeActiveItem}
                toggleCollapse={this.toggleCollapse}
                markComplete={this.markComplete}
                completed={this.state.completed}
                allItems={this.state.allItems}
              />
            </Route>
            <Route path="/completed">
              <Completed
                activeItem="completed"
                changeActiveItem={this.changeActiveItem}
                completed={this.state.completed}
                allItems={this.state.allItems}
                populateComplete={this.populateComplete}
              />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
