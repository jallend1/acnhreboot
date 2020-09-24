import React from 'react';
import DetailsHeader from './DetailsHeader';
import Blathers from './Blathers';
import Pricing from './Pricing';
import Availability from './Availability';

const Details = ({ item, activeItem }) => {
  // Returns quote if creature isn't a fossil (Fossils don't have catch phrases!)

  const catchPhrase = () => {
    return item['catch-phrase'] ? (
      <caption>
        <q>{item['catch-phrase']}</q>
      </caption>
    ) : null;
  };

  return (
    <>
      <table className="detailsTable">
        {catchPhrase()}
        <DetailsHeader item={item} activeItem={activeItem} />
        <tbody>
          <Blathers item={item} />
          <Pricing item={item} />
          {/* If 'fossils' is included in the image path, don't display availability (because there is none)   */}
          {item['image_uri'].includes('fossils') ? null : (
            <Availability item={item} activeItem={activeItem} />
          )}
        </tbody>
      </table>
    </>
  );
};
export default Details;
