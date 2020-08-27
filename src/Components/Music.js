import React from "react";

class Music extends React.Component {
  componentDidMount() {
    this.props.changeActiveItem("music");
  }
  componentDidUpdate(prevProps) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.displaySelection();
    }
  }
  displaySelection = () => {
    if (this.props.searchValue) {
      // If there's a search term, return the filtered array
      return this.props.activeItems
        .filter((song) =>
          song.name["name-USen"].includes(this.props.searchValue)
        )
        .map((item) => this.displaySongs(item));
    } else {
      // If not, go with the original state
      return this.props.activeItems.map((item) => this.displaySongs(item));
    }
  };

  displaySongs = (song) => {
    const {
      "file-name": fileName,
      "buy-price": buyPrice,
      "sell-price": sellPrice,
      name: { "name-USen": name }
    } = song;
    return (
      <div className="item song" key={fileName}>
        <h3>{name}</h3>
        <img
          src={`./images/${this.props.activeItem}/${fileName}.png`}
          data-song={fileName}
          alt={name}
          onClick={this.props.playSong}
        />
        <div>
          <label htmlFor="markcomplete">Mark complete?</label>
          <input
            type="checkbox"
            name="markcomplete"
            value={name}
            checked={this.props.completed[this.props.activeItem].includes(name)}
            onChange={this.props.markComplete}
          />
<<<<<<< HEAD
=======
        </div>
        <span className="card-title">{name}</span>
        <div className="card-content">
          <p>
            Purchase Price:{" "}
            {buyPrice ? `${buyPrice} bells` : "Not available for purchase."}
          </p>
          <p>Sell Value: {sellPrice} bells</p>
        </div>
        <div className="card-action">
          <label>
            <input
              type="checkbox"
              name="markcomplete"
              value={name}
              checked={this.props.completed[this.props.activeItem].includes(
                name
              )}
              onChange={this.props.markComplete}
            />
            <span>Mark Complete</span>
          </label>
>>>>>>> parent of 53d3ba4... Continues basic Materialize CSS integration and adds notes to features to repair
        </div>
        <p>
          Purchase Price:{" "}
          {buyPrice ? `${buyPrice} bells` : "Not available for purchase."}
        </p>
        <p>Sell Value: {sellPrice} bells</p>
      </div>
    );
  };

  render() {
    return (
      <>
        <h2>{this.props.activeItem.toUpperCase()}</h2>
        <div id="songdisplay">{this.displaySelection()}</div>
      </>
    );
  }
}

export default Music;
