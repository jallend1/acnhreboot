import React from 'react';
import { ItemContext } from '../contexts/ItemContext';

class Music extends React.Component {
  static contextType = ItemContext;
  componentDidMount() {
    this.context.changeActiveItem('music');
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
          song.name['name-USen'].includes(this.context.searchValue)
        )
        .map((item) => this.displaySongs(item));
    } else {
      // If not, go with the original state
      return this.context.activeItems.map((item) => this.displaySongs(item));
    }
  };

  displaySongs = (song) => {
    const {
      'file-name': fileName,
      'buy-price': buyPrice,
      'sell-price': sellPrice,
      name: { 'name-USen': name }
    } = song;
    return (
      <div className="card song center" key={fileName}>
        <div className="card-image">
          <img
            src={`./images/${this.context.activeItem}/${fileName}.png`}
            data-song={fileName}
            alt={name}
            onClick={this.props.playSong}
          />
          <div className="clicktoplay">Click to play</div>
        </div>
        <span className="card-title">{name}</span>
        <div className="card-content">
          <p>
            Purchase Price:{' '}
            {buyPrice ? `${buyPrice} bells` : 'Not available for purchase.'}
          </p>
          <p>Sell Value: {sellPrice} bells</p>
        </div>
        <div className="card-action">
          <label>
            <input
              type="checkbox"
              name="markcomplete"
              value={name}
              checked={this.props.completed[this.context.activeItem].includes(
                name
              )}
              onChange={this.props.markComplete}
            />
            <span>Mark Complete</span>
          </label>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <h2>{this.context.activeItem.toUpperCase()}</h2>
        <div className="container" id="songdisplay">
          {this.displaySelection()}
        </div>
      </>
    );
  }
}

export default Music;
