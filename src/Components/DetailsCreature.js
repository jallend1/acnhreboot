import React, { useContext } from 'react';
import { properCase } from '../utils';

const DetailsCreature = ({ creature }) => {
  console.log(creature);
  return (
    <div>
      <h5>{properCase(creature.name['name-USen'])}</h5>
    </div>
  );
};

export default DetailsCreature;
