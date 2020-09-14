import React from 'react';
import { properCase } from '../utils';
import { ItemContext } from '../contexts/ItemContext';

class Art extends React.Component {
  static contextType = ItemContext;
  componentDidMount() {
    this.props.changeActiveItem(this.props.activeItem);
  }
  componentDidUpdate(prevProps) {
    // if (this.props.searchValue !== prevProps.searchValue) {
    //   this.filterArt();
    // }
  }
  static contextType = ItemContext;
  displayArt = (art) => {
    const {
      'file-name': fileName,
      name: { 'name-USen': name },
      hasFake
    } = art;
    return (
      <div className="song center" id="artwork" key={name}>
        <h3>{properCase(name)}</h3>
        <img
          src={`./images/${this.props.activeItem}/${fileName}.png`}
          alt={name}
        />
        <div>
          <label>
            <input
              name="markcomplete"
              type="checkbox"
              value={name}
              onChange={this.props.markComplete}
              checked={this.props.completed[this.props.activeItem].includes(
                name
              )}
            />
            <span>Mark Complete</span>
          </label>
        </div>
        <p>Has a fake version? {hasFake ? 'Yes' : 'No'}</p>
      </div>
    );
  };

  filterArt = () => {
    const searchValue = this.props.searchValue;
    const displayedArt = this.context.allItems.art.filter((art) =>
      art.name['name-USen'].includes(searchValue)
    );
    return displayedArt.map((art) => this.displayArt(art));
  };
  render() {
    return (
      <>
        <h2>Art</h2>
        <div id="artretail">
          <p>Redd sells all art for 4980 bells</p>
          <p>Nook buys all art for 1245 bells</p>
        </div>
        <div id="artdisplay">{this.filterArt()}</div>
      </>
    );
  }
}

export default Art;
