import React from "react";
import { properCase } from "../utils";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  // Generates list of item types for NavBar
  const renderTypes = (types) => {
    return types.map((type) => {
      let url = "";
      type === "fish" || type === "bugs" || type === "sea" || type === "fossils"
        ? (url = `/creatures/${type}`)
        : (url = `/${type}`);
      return (
        <NavLink to={url} key={type} data-id={type} onClick={props.changeToNew}>
          {properCase(type)}
        </NavLink>
      );
    });
  };
  return (
    <nav>
      <ul>{renderTypes(props.types)}</ul>
    </nav>
  );
};

export default NavBar;
