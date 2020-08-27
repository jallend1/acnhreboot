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
        <li className={type === props.activeItem ? "active" : null}>
          <NavLink
            to={url}
            key={type}
            data-id={type}
            onClick={props.changeToNew}
          >
            {properCase(type)}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <nav>
      <div class="nav-wrapper">
        <ul className="green accent-2">{renderTypes(props.types)}</ul>
      </div>
    </nav>
  );
};

export default NavBar;
