import React, { useContext } from 'react';
import { properCase } from '../utils';
import Details from './Creature/Details';
import ItemContext from '../contexts/ItemContext';

const DetailsCreature = ({ creature }) => {
  const allItems = useContext(ItemContext);
  const determineCreatureType = () => {
    const name = creature.name['name-USen'];
    allItems.find((item) => item.name['name-USen'] === name);
  };
  console.log(creature);
  return (
    <div>
      <h5>{properCase(creature.name['name-USen'])}</h5>
      <div>
        <Details item={creature} />
      </div>
    </div>
  );
};

export default DetailsCreature;
