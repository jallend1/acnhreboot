import React from "react";
import DetailsHeader from "./DetailsHeader";
import Blathers from "./Blathers";
import Pricing from "./Pricing";
import Availability from "./Availability";

const Details = ({ item, activeItem }) => {
  return (
    <>
      <table className="detailsTable">
        <caption>
          <q>{item["catch-phrase"]}</q>
        </caption>
        <DetailsHeader item={item} activeItem={activeItem} />
        <tbody>
          <Blathers item={item} />
          <Pricing item={item} />
          {/* TODO Add Table Availability Here */}
          {activeItem !== "fossils" ? <Availability item={item} /> : null}
        </tbody>
      </table>
    </>
  );
};
export default Details;
