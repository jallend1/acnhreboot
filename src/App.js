import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';
import Filter from './Components/Filter';

class App extends React.Component {
  state = {
    activeItem: 'fish',
    fish: [],
    bugs: [],
    fossils: [],
    music: [],
    villagers: [],
    art: [],
    sortBy: 'alpha',
    types: ['fish', 'bugs', 'fossils', 'music', 'villagers', 'art']
  }
  componentDidMount(){
    this.state.types.forEach(item => this.populateData(item))
  }

  changeType = (newType) => {
    this.setState({activeItem: newType}, this.sortItems)
  }

  populateData = dataType => {
    fetch(`./${dataType}.json`)
      .then(data => data.json())
      .then(results => {
        const itemList = Object.values(results);
        itemList.forEach(item => item.collapsed = true);
        this.setState({[dataType]: itemList}, () => this.sortItems(this.state.sortBy))
      })
  }

  changeSort = change => {
    this.setState({sortBy: change.target.value}, () => this.sortItems(this.state.sortBy))
  }

  sortItems = () => {
    const unsortedState = this.state[this.state.activeItem];
    let sortedState = [];
    if(this.state.sortBy === 'alpha'){
      sortedState = unsortedState.sort((a, b) => a.name["name-en"].toLowerCase() > b.name["name-en"].toLowerCase() ? 1 : -1);
    }else if(this.state.sortBy === 'nook'){
      sortedState = unsortedState.sort((a, b) => a.price - b.price);
    }
    this.setState({[unsortedState]: sortedState})
  }

  toggleCollapse = item => {
    const currentState = this.state[this.state.activeItem];
    const itemIndex = currentState.findIndex(creature => creature["file-name"] === item);
    let isCollapsed = currentState[itemIndex].collapsed;
    isCollapsed = !isCollapsed;
    currentState[itemIndex].collapsed = isCollapsed;
    this.setState({[this.state.activeItem]: currentState})
  }

  render() {
    const activeItem = this.state.activeItem;
    let displayArea;
    if(activeItem === 'fish' || activeItem === 'bugs' || activeItem === 'fossils'){
      displayArea = <Creatures 
        activeItem={this.state.activeItem} 
        creatures={this.state[activeItem]}
        toggleCollapse = {this.toggleCollapse}
        sortItems = {this.sortItems}
        changeSort = {this.changeSort} />
    }
    else if(activeItem === 'music'){
      displayArea = <Music 
        activeItem={this.state.activeItem} 
        music={this.state.music} 
        toggleCollapse = {this.toggleCollapse} />
    }
    else if(activeItem === 'villagers'){
      displayArea = <Villagers 
        activeItem={this.state.activeItem} 
        villagers={this.state.villagers} 
        toggleCollapse = {this.toggleCollapse} />
    }
    else if(activeItem === 'art'){
      displayArea = <Art 
        activeItem={this.state.activeItem} 
        art={this.state.art} 
        toggleCollapse = {this.toggleCollapse} />
    }
    return (  
    <div className="container">
      <Header />
      <Navbar activeItem={this.state.activeItem} changeType={this.changeType} />
      <Filter changeSort={this.changeSort} />
      {displayArea}
    </div>
    );
  }
}

export default App;