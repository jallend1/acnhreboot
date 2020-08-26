import React from "react";

const Pricing = ({ item }) => {
  if (item["price-flick"]) {
    return (
      <>
        <p>Nook: {item.price} bells</p>
        <p id="flick">Flick: {item["price-flick"]} bells</p>
      </>
    );
  } else if (item["price-cj"]) {
    return (
      <>
        <p>Nook: {item.price} bells</p>
        <p id="cj">CJ: {item["price-cj"]} bells</p>
      </>
    );
  } else {
    return <p>Nook: {item.price} bells</p>;
  }
};

export default Pricing;
