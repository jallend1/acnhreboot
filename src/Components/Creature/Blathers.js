import React from "react";

const Blathers = ({ item }) => {
  return (
    <tbody>
      <tr>
        <td>
          <img
            src="../images/blathers.png"
            alt="Blathers the Owl"
            className="blathers"
          />
        </td>
        <td>
          <h5 className="center">
            <span role="img" aria-label="owl emoji">
              🦉
            </span>
            Blathers' Take
            <span role="img" aria-label="owl emoji">
              🦉
            </span>
          </h5>
          <blockquote>{item["museum-phrase"]}</blockquote>
        </td>
      </tr>
    </tbody>
  );
};

export default Blathers;
