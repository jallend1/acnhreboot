  import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';

class App extends React.Component {
  state = {
    activeItem: 'fish',
    fish: [],
    bugs: [],
    fossils: [],
    music: [],
    villagers: [],
    art: [],
  }
  componentDidMount(){
    this.populateData(this.state.activeItem)
  }

  changeType = (newType) => {
    this.setState({activeItem: newType})
    this.populateData(newType);
  }

  populateData = dataType => {
    if(this.state[dataType].length === 0){
      fetch(`./${dataType}.json`)
        .then(data => data.json())
        .then(results => {
          const itemList = Object.values(results);
          itemList.forEach(item => item.collapsed = true);
          this.setState({[dataType]: itemList})
        })
    }else{
      console.log(this.state[dataType]);
    }
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
    if(activeItem === 'fish'){
      displayArea = <Creatures 
        activeItem={this.state.activeItem} 
        fish={this.state.fish} 
        toggleCollapse = {this.toggleCollapse} />
    }else if(activeItem === 'bugs'){
      displayArea = <Creatures 
        activeItem={this.state.activeItem} 
        bugs={this.state.bugs} 
        toggleCollapse = {this.toggleCollapse} />
    }
    else if(activeItem === 'fossils'){
      displayArea = <Creatures 
        activeItem={this.state.activeItem} 
        fossils={this.state.fossils} 
        toggleCollapse = {this.toggleCollapse} />
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
      {displayArea}
    </div>
    );
  }
}

export default App;