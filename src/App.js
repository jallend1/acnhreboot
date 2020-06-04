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
    art: []
  }
  componentDidMount(){
    this.populateData(this.state.activeItem)
  }

  changeType = (newType) => {
    this.setState({activeItem: newType})
    this.populateData(newType);
  }

  populateData = dataType => {
    console.log('running populate data')
    if(this.state[dataType].length === 0){
      fetch(`./${dataType}.json`)
        .then(data => data.json())
        .then(results => {
          const itemList = Object.keys(results).map(key => results[key]);
          this.setState({[dataType]: itemList})
        })
    }else{
      console.log(this.state[dataType]);
    }
  }

  render() {
    const activeItem = this.state.activeItem;
    let displayArea;
    if(activeItem === 'fish'){
      displayArea = <Creatures activeItem={this.state.activeItem} fish={this.state.fish} />
    }else if(activeItem === 'bugs'){
      displayArea = <Creatures activeItem={this.state.activeItem} bugs={this.state.bugs} />
    }
    else if(activeItem === 'fossils'){
      displayArea = <Creatures activeItem={this.state.activeItem} fossils={this.state.fossils} />
    }
    else if(activeItem === 'music'){
      displayArea = <Music activeItem={this.state.activeItem} music={this.state.music} />
    }
    else if(activeItem === 'villagers'){
      displayArea = <Villagers activeItem={this.state.activeItem} villagers={this.state.villagers} />
    }
    else if(activeItem === 'art'){
      displayArea = <Art activeItem={this.state.activeItem} art={this.state.art} />
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