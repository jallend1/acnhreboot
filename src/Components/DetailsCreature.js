import React from 'react';
import { properCase } from '../utils';
import Details from './Creature/Details';

const DetailsCreature = ({ creature }) => {
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
