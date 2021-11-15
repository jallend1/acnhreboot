import React from "react";
import { ItemContext } from "../contexts/ItemContext";
import { properCase } from "../utils";
import DetailsSong from "./DetailsSong";
import Filter from "./Filter";

class Music extends React.Component {
  static contextType = ItemContext;
  componentDidMount() {
    this.context.changeActiveItem("music");
  }
  componentDidUpdate(prevProps) {
    if (this.context.searchValue !== prevProps.searchValue) {
      this.displaySelection();
    }
  }
  displaySelection = () => {
    if (this.context.searchValue) {
      // If there's a search term, return the filtered array
      return this.context.activeItems
        .filter((song) =>
          song.name["name-USen"].includes(this.context.searchValue)
        )
        .map((item) => this.displaySongs(item));
    } else {
      // If not, go with the original state
      return this.context.activeItems.map((item) => this.displaySongs(item));
    }
  };

  displaySongs = (song) => {
    return <DetailsSong song={song} key={song["file-name"]} />;
  };

  render() {
    return (
      <>
        <div>
          <h2>
            <i className="material-icons orange-text">music_note</i>
            {properCase(this.context.activeItem)}
            <i className="material-icons orange-text">music_note</i>
          </h2>
        </div>
        <Filter />
        <div id="artdisplay">{this.displaySelection()}</div>
      </>
    );
  }
}

export default Music;
