import React, { useContext } from 'react';
import { properCase } from '../utils';
import { ItemContext } from '../contexts/ItemContext';
import DetailsArt from './DetailsArt';

const Details = (props) => {
  const { allItems } = useContext(ItemContext);
  const displayItem = () => {
    // Locates the item details in the allItems context and returns array including item type and item object itself
    const itemDetails = findItem();
    // Waits until there's a match, then returns that item
    if (itemDetails) {
      const [type, item] = itemDetails;
      if (type === 'art') {
        return <DetailsArt art={item} type={type} />;
      }
      return (
        <div>
          <h4>{properCase(item.name['name-USen'])}</h4>
        </div>
      );
    } else {
      return null;
    }
  };
  const findItem = () => {
    // Takes the props from the URL
    const fileName = props.match.params.filename;
    // Takes the keys from the allItems object to generate a list of item types
    const types = Object.keys(allItems);
    for (let i = 0; i < types.length; i++) {
      //   If the item type isn't home or completed, search the array
      if ((types[i] !== 'home') & (types[i] !== 'completed')) {
        const desiredItem = allItems[types[i]].filter(
          (item) => item['file-name'] === fileName
        );
        // If it finds a match, returns it
        if (desiredItem.length > 0) {
          return [types[i], desiredItem[0]];
        }
      }
    }
  };
  return <div>{displayItem()}</div>;
};

export default Details;
