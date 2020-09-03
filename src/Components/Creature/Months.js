import React from "react";

const Months = ({ item }) => {
  return (
    <>
      <tr>
        <th colSpan="2" className="center">
          Months
        </th>
      </tr>
      <tr>
        <td>Northern Hempishere:</td>
        <td>
          {item.availability.isAllYear
            ? "Available year-round"
            : item.availability["month-northern"]}
        </td>
      </tr>
      <tr>
        <td>Southern Hemisphere:</td>
        <td>
          {item.availability.isAllYear
            ? "Available year-round"
            : item.availability["month-southern"]}
        </td>
      </tr>
    </>
  );
};

export default Months;
