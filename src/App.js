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
  static contextType = ItemContext;

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
                  onClick={this.context.clearCollected}
                >
                  Clear ALL completed items
                </button>
              </>
            ) : null}
            <Route path="/music" component={Music} />
            <Route path="/villagers" component={Villagers} />
            <Route path="/art" component={Art} />
            <Route path="/completed" component={Completed} />
            <Route
              path="/creatures/:creature"
              render={(props) => {
                return <Creatures {...props} />;
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
