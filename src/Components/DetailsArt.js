import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { properCase } from '../utils';

const DetailsArt = ({ art, type }) => {
  const { markComplete, allItems } = useContext(ItemContext);
  const {
    'file-name': fileName,
    name: { 'name-USen': name },
    hasFake,
    'museum-desc': desc
  } = art;
  return (
    <div className="center artwork yellow lighten-3" key={name}>
      <img src={`../../images/${type}/${fileName}.png`} alt={name} />
      <h4>{properCase(name)}</h4>
      <div>
        <h6>Museum Description</h6>
        <p>{desc}</p>
      </div>
      <p>Has a fake version? {hasFake ? 'Yes' : 'No'}</p>
      <div>
        <label>
          <input
            name="markcomplete"
            type="checkbox"
            value={name}
            onChange={markComplete}
            checked={
              allItems.completed.findIndex(
                (item) => item.name['name-USen'] === name
              ) !== -1
            }
          />
          <span>Mark Complete</span>
        </label>
      </div>
    </div>
  );
};

export default DetailsArt;
