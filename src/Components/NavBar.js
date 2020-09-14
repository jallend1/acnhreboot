import React, { useContext } from 'react';
import { properCase } from '../utils';
import { NavLink } from 'react-router-dom';
import { ItemContext } from '../contexts/ItemContext';

const NavBar = (props) => {
  // Generates list of item types for NavBar
  const { changeToNew, activeItem, allItems } = useContext(ItemContext);
  const types = Object.keys(allItems);
  const renderTypes = (types) => {
    return types.map((type) => {
      let url = '';
      type === 'fish' || type === 'bugs' || type === 'sea' || type === 'fossils'
        ? (url = `/creatures/${type}`)
        : (url = `/${type}`);
      return (
        <li className={type === activeItem ? 'active' : null} key={type}>
          <NavLink
            to={type !== 'home' ? url : '/'}
            key={type}
            data-id={type}
            onClick={changeToNew}
          >
            {properCase(type)}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="green accent-4">{renderTypes(types)}</ul>
      </div>
    </nav>
  );
};

export default NavBar;
