import React from 'react';

const Attributes = ({ item }) => {
  // Only sea creatures and fish have
  const shadowSize = () => {
    if (item.shadow) {
      return (
        <tr>
          <td>Shadow-size:</td>
          <td>{item.shadow}</td>
        </tr>
      );
    }
  };
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
            ? 'Available all day'
            : item.availability.time}
        </td>
      </tr>
      {shadowSize()}
    </>
  );
};

export default Attributes;
