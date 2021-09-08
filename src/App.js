import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Creatures from "./Components/Creatures";
import Music from "./Components/Music";
import Villagers from "./Components/Villagers";
import Art from "./Components/Art";
import Completed from "./Components/Completed";
import Welcome from "./Components/Welcome";
import Filter from "./Components/Filter";
import NavBar from "./Components/NavBar";
import Player from "./Components/Player";
import Details from "./Components/Details";
import Everything from "./Components/Everything";
import { ItemContext } from "./contexts/ItemContext";

class App extends Component {
  static contextType = ItemContext;

  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Header />
          {this.context.activeSong ? (
            <Player activeSong={this.context.activeSong} />
          ) : null}
          <div className="main-content">
            {this.context.activeItem !== "home" ? (
              <>
                <Filter />
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
