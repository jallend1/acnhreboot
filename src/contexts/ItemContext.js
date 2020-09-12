import React, { Component, createContext } from 'react';

export const ItemContext = createContext();

export default class ItemContextProvider extends Component {
  state = {
    activeItem: 'fish',
    allItems: {
      home: [],
      fish: [],
      bugs: [],
      sea: [],
      fossils: [],
      villagers: [],
      music: [],
      art: [],
      completed: []
    }
  };

  populateData = (dataType) => {
    if (dataType !== 'completed' && dataType !== 'home') {
      let jsonPath = `../${dataType}.json`;
      fetch(jsonPath)
        .then((data) => data.json())
        .then((results) => {
          const itemList = Object.values(results);
          itemList.forEach((item) => (item.collapsed = true));
          const currentState = this.state.allItems;
          currentState[dataType] = itemList;
          this.setState(
            {
              allItems: currentState,
              activeItems: currentState[this.state.activeItem]
            },
            this.sortAlpha
          );
        });
    }
    // this.extractLocalStorage();
  };
  render() {
    this.populateData(this.state.activeItem);
    return (
      <ItemContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}
