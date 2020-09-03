import React from "react";
import Location from "./Location";
import Months from "./Months";

const Availability = ({ item }) => {
  return (
    <tr>
      <td colSpan="6">
        <table className="detailsTable centered">
          <thead>
            <tr>
              <th colSpan="2">Availability</th>
            </tr>
          </thead>
          <tbody>
            <Location item={item} />
            <Months item={item} />
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default Availability;
