import React from 'react';

const DetailsHeader = ({ item, activeItem }) => {
  return (
    <>
      <thead>
        <tr>
          <th colSpan="2" className="image">
            <img
              src={`../images/${activeItem}/${item['file-name']}.png`}
              alt={item.name['name-USen']}
            />
          </th>
        </tr>
      </thead>
    </>
  );
};

export default DetailsHeader;
