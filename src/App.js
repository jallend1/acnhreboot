// ! App breaks on MarkComplete as it hasn't been moved over to the Context component yet
// TODO Expand context to include Completed component

// TODO Possibility: Single page to list _all_ items?
// TODO Possibility: Universal search?
// TODO Possibility: Dedicated page for each item; Linked to from Completed Page for expanded details unique to each type
// TODO Possibility: Randomly pick song to have loaded into player on pageload (If there is no activeSong)

import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: {
        fish: [],
        bugs: [],
        sea: [],
        fossils: [],
        villagers: [],
        music: [],
        art: [],
        home: []
      }
    };
  }

  static contextType = ItemContext;
  componentDidMount() {
    // Extracts the types of objects from State
    this.extractLocalStorage();
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

  markComplete = (e) => {
    // TODO Instead of just dumping the item name into a weird array, why not just dump all of the details at the same time?
    console.log(e.target.value);
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

  populateComplete = () => {
    const currentState = this.context.allItems;
    const completed = this.state.completed;
    const itemArrays = Object.keys(completed); // Extracts all the item types from the completed object list
    itemArrays.forEach((itemArray) => {
      //Runs through item types, and retrieves full item details

      if (itemArray !== 'home') {
        currentState.completed[itemArray] = [];
        if (completed[itemArray].length > 0) {
          // If this item type has anything in it, process it

          completed[itemArray].forEach((item) => {
            const itemDeets = this.context.allItems[itemArray].find(
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

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          {this.context.activeSong ? (
            <Player activeSong={this.context.activeSong} />
          ) : null}
          <NavBar />
          <div className="main-content">
            {this.context.activeItem !== 'home' ? (
              <>
                <Filter />
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
                  playSong={this.playSong}
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
                  markComplete={this.markComplete}
                  completed={this.state.completed}
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
                  allItems={this.context.allItems}
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
                    time={this.state.time}
                    markComplete={this.markComplete}
                    completed={this.state.completed}
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
