import React from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { Link } from 'react-router-dom';
import { properCase } from '../utils';

class Everything extends React.Component {
  static contextType = ItemContext;

  componentDidMount() {
    this.context.changeActiveItem('everything');
  }
  displayItem = (item) => {
    return (
      <tr key={item.fileName}>
        <td>
          <Link to={`/details/${item.fileName}`}>
            {properCase(item.name['name-USen'])}
          </Link>
        </td>
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
              <th onClick={this.context.sortEverything} data-sort="name">
                Item Name
              </th>
              <th onClick={this.context.sortEverything} data-sort="type">
                Item Type
              </th>
              <th onClick={this.context.sortEverything} data-sort="price">
                Item Price
              </th>
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
