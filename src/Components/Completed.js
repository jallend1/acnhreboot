import React from 'react';
import { Link } from 'react-router-dom';
import { properCase } from '../utils';
import { ItemContext } from '../contexts/ItemContext';

class Completed extends React.Component {
  static contextType = ItemContext;
  componentDidMount() {
    this.context.changeActiveItem('completed');
  }

  displayCompleted = () => {
    return this.context.allItems.completed.map((item) => {
      return (
        <div key={item['file-name']}>
          <p>{properCase(item.name['name-USen'])}</p>
          <img
            src={item.imageLocation}
            alt={`Icon of ${item.name['name-USen']}`}
          ></img>
          <p>
            <Link to={`./details/${item['file-name']}`}>
              ...{properCase(item.name['name-USen'])} details
            </Link>
          </p>
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <div className="item center">{this.displayCompleted()}</div>
      </>
    );
  }
}

export default Completed;
