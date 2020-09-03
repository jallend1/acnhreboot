import React from "react";

const Pricing = ({ item }) => {
  return (
    <table className="centered detailsTable">
      <thead>
        <tr>
          <th colSpan="2" className="center">
            Selling Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nook's Price: </td>
          <td>{item.price} bells</td>
        </tr>
        <tr>
          <td>{item["price-cj"] ? "CJ's Price:" : "Flick's Price"}</td>
          <td>
            {item["price-cj"] ? item["price-cj"] : item["price-flick"]} bells
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Pricing;
