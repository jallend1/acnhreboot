import React from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { properCase } from '../utils';

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
            onClick={this.context.playSong}
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
              checked={
                this.context.allItems.completed.filter(
                  (item) => item.name['name-USen'] === name
                ).length > 0
              }
              onChange={this.context.markComplete}
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
        <div>
          <h2>
            <i className="material-icons orange-text">music_note</i>
            {properCase(this.context.activeItem)}
            <i className="material-icons orange-text">music_note</i>
          </h2>
        </div>
        <div id="artdisplay">{this.displaySelection()}</div>
      </>
    );
  }
}

export default Music;
