import React from 'react';
import { ItemContext } from '../contexts/ItemContext';
import DetailsArt from './DetailsArt';

class Art extends React.Component {
  static contextType = ItemContext;

  componentDidMount() {
    this.context.changeActiveItem('art');
  }

  filterArt = () => {
    const searchValue = this.context.searchValue;
    const displayedArt = this.context.allItems.art.filter((art) =>
      art.name['name-USen'].includes(searchValue)
    );
    return displayedArt.map((art) => (
      <DetailsArt art={art} type={this.context.activeItem} />
    ));
  };
  render() {
    return (
      <>
        <h2>Art</h2>
        <div id="artretail">
          <p>
            <img
              className="icon"
              src="./images/Redd.png"
              alt="Our Foxy Friend Redd"
            />
            Redd sells all art for 4980 bells
          </p>
          <p>
            <img
              className="icon"
              src="./images/TomNook.png"
              alt="Our Boy Tom Nook"
            />{' '}
            Nook buys all art for 1245 bells
          </p>
        </div>
        <div id="artdisplay">{this.filterArt()}</div>
      </>
    );
  }
}

export default Art;
