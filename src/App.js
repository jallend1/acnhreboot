  import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Creatures from './Components/Creatures';

class App extends React.Component {
  state = {
    activeItem: 'fish',
    fish: [],
    bugs: [],
    fossils: [],
    songs: []
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