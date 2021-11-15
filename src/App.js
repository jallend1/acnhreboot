// TODO
// - Shift use of local JSON files to only if ANCHAPI server is non-responsive
// - Restore functionality to Player on Music page when user clicks album cover
// - Shift sorting of items from select menu into clicking on headings
// - Add Furniture / Misc items that have since been added to API
// - Redeisgn art layout
// - Shift images out of public and src

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Creatures from "./Components/Creatures";
import Music from "./Components/Music";
import Villagers from "./Components/Villagers";
import Art from "./Components/Art";
import Completed from "./Components/Completed";
import Welcome from "./Components/Welcome";
import NavBar from "./Components/NavBar";
import Details from "./Components/Details";
import Everything from "./Components/Everything";
import { ItemContext } from "./contexts/ItemContext";

class App extends Component {
  static contextType = ItemContext;

  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="main-container">
          {/* <div className="sidebar">
            <Header />
            {this.context.activeSong ? (
              <Player activeSong={this.context.activeSong} />
            ) : null}
            {this.context.activeItem !== "home" ? (
              <>
                <Filter />
              </>
            ) : null}
          </div> */}
          <div className="main-content">
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
            <Route path="/details/:filename" component={Details} />
            {/* <Route
              path="/details:filename"
              render={(props) => <Details {...props} />}
            /> */}
            <Route path="/everything" component={Everything} />
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
