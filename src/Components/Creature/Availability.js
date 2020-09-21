import React from 'react';
import Attributes from './Attributes';
import Months from './Months';

const Availability = ({ item }) => {
  return (
    <tr>
      <td colSpan="6">
        <table className="detailsTable centered">
          <thead>
            <tr>
              <th colSpan="2">
                <div>
                  <i className="material-icons">fact_check</i>
                </div>
                Attributes
              </th>
            </tr>
          </thead>
          <tbody>
            <Attributes item={item} />
            <Months item={item} />
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default Availability;
