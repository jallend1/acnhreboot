import React from 'react';
import { ItemContext } from '../contexts/ItemContext';

class Everything extends React.Component {
  static contextType = ItemContext;

  displayItem = (item) => {
    return (
      <tr key={item.fileName}>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.price ? item.price : 'N/A'}</td>
      </tr>
    );
  };
  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Type</th>
              <th>Item Price</th>
            </tr>
          </thead>
          <tbody>
            {this.context.allItems.everything.map((item) =>
              this.displayItem(item)
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default Everything;
