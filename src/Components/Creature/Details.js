import React from "react";
import DetailsHeader from "./DetailsHeader";
import Blathers from "./Blathers";
import Pricing from "./Pricing";
import Location from "./Location";
import Months from "./Months";

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
          <Location item={item} />
          <Months item={item} />
        </tbody>
      </table>
    </>
  );
};
export default Details;
