import React from "react";

const Phrases = (props) => {
  return (
    <>
      <p>{props.item["catch-phrase"]}</p>
      <div>
        <p>
          <span role="img" aria-label="owl emoji">
            🦉
          </span>
          Blathers' Take
          <span role="img" aria-label="owl emoji">
            🦉
          </span>
        </p>
        <p>{props.item["museum-phrase"]}</p>
      </div>
    </>
  );
};

export default Phrases;
