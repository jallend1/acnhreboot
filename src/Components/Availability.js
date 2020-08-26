import React from "react";

const Availability = (props) => {
  const availability = props.item.availability;
  return (
    <div>
      <div>
        Time: {availability.isAllDay ? "Available all day" : availability.time}
      </div>
      <div>
        Months:{" "}
        {availability.isAllYear ? (
          "Year-round"
        ) : (
          <>
            <p>Northern Hemisphere: {availability["month-northern"]}</p>
            <p>Southern Hemisphere: {availability["month-southern"]}</p>
          </>
        )}
      </div>
      <p>Location: {availability.location}</p>
      <p>Rarity: {availability.rarity}</p>
    </div>
  );
};

export default Availability;
