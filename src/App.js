  import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Creatures from './Components/Creatures';
import Fossils from './Components/Fossils';

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
  }
  populateData = dataType => {
    if(this.state[dataType].length === 0){
      fetch(`./${dataType}.json`)
        .then(data => data.json())
        .then(results => {
          console.log(Object.keys(results))
          const itemList = Object.keys(results).map(key => results[key]);
          console.log(itemList)
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
      displayArea = <Creatures activeItem={this.state.activeItem} fish={this.state.fish} populateData={this.populateData}/>
    }else if(activeItem === 'bugs'){
      displayArea = <Creatures activeItem={this.state.activeItem} bugs={this.state.bugs} populateData={this.populateData}/>
    }
    else if(activeItem === 'fossils'){
      displayArea = <Fossils activeItem={this.state.activeItem} bugs={this.state.fossils} populateData={this.populateData}/>
    }
    return (  
    <div className="App">
      <Header />
      <Navbar activeItem={this.state.activeItem} changeType={this.changeType} />
      {displayArea}
    </div>
    );
  }
}

export default App;
