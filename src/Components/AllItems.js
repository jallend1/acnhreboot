import React from 'react';
import { ItemContext } from '../contexts/ItemContext';

class AllItems extends React.Component {
  static contextType = ItemContext;
  state = {
    everything: [],
    allItemsLoaded: false
  };
  componentDidMount() {
    console.log(this.props);
    console.log(this.context);
    this.populateAll();
  }
  componentDidUpdate(prevProps) {}

  //   TODO Yeah, none of this working
  populateAll = () => {
    if (this.state.allItemsLoaded === false) {
      const types = Object.keys(this.context.allItems);
      const everything = this.state.everything;
      console.log(types);
      types.forEach((type) => {
        if (type !== 'home') {
          console.log('hello');
          console.log(type);
          console.log(this.context.allItems);
          this.context.allItems[type].forEach((item) => {
            console.log(item);
            const itemDetails = {
              name: item.name['name-USen'],
              type: type
            };
            console.log(itemDetails);
            everything.push(itemDetails);
          });
          console.log(everything);
        }
      });
      this.setState({ everything, allItemsLoaded: true });
    }
  };

  render() {
    console.log(this.context.allItems);
    return (
      <>
        {this.context.allItems.fish.length > 0 ? this.populateAll() : 'Nothing'}
        <p>Hello</p>
      </>
    );
  }
}

export default AllItems;
