import React from "react";
import DetailsHeader from "./DetailsHeader";
import Blathers from "./Blathers";
import Pricing from "./Pricing";
import Availability from "./Availability";

const Details = ({ item, activeItem }) => {
  // Returns quote if creature isn't a fossil (Fossils don't have catch phrases!)
  const catchPhrase = () => {
    return item["catch-phrase"] ? (
      <caption>
        <q>{item["catch-phrase"]}</q>
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
          {activeItem !== "fossils" ? (
            <Availability item={item} activeItem={activeItem} />
          ) : null}
        </tbody>
      </table>
    </>
  );
};
export default Details;
