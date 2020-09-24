import React from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { properCase } from '../utils';

class Everything extends React.Component {
  static contextType = ItemContext;

  componentDidMount() {
    this.context.changeActiveItem('everything');
  }
  displayItem = (item) => {
    return (
      <tr key={item.fileName}>
        <td>{properCase(item.name['name-USen'])}</td>
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
            {this.context.activeItems.map((item) => this.displayItem(item))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Everything;
