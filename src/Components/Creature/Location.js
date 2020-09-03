import React from "react";

const Location = ({ item }) => {
  return (
    <>
      <tr>
        <td>Location:</td>
        <td>{item.availability.location}</td>
      </tr>
      <tr>
        <td>Rarity:</td>
        <td>{item.availability.rarity}</td>
      </tr>
      <tr>
        <td>Time:</td>
        <td>
          {item.availability.isAllDay
            ? "Available all day"
            : item.availability.time}
        </td>
      </tr>
      <tr>
        <th colSpan="2" className="center">
          Months
        </th>
      </tr>
    </>
  );
};

export default Location;
