import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';
import Filter from './Components/Filter';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'fish',
      fish: [],
      bugs: [],
      fossils: [],
      music: [],
      villagers: [],
      art: [],
      sortBy: 'alpha',
      order: 'ascending',
      types: ['fish', 'bugs', 'fossils', 'music', 'villagers', 'art'],
      filtered: [],
      searchValue: '',
      time: ''
    }
  }
  componentDidMount(){
    this.state.types.forEach(item => this.populateData(item))                           //Populates all items into state on load
    const now = new Date();
    this.setState({time: now});
  }

  changeType = (newType) => {                                                           //Changes type from active item type to the new one and then applies active sorting
    this.handleReset();
    this.setState({
      activeItem: newType,
    }, this.sortItems)
  }

  populateData = dataType => {
    fetch(`./${dataType}.json`)
      .then(data => data.json())
      .then(results => {
        const itemList = Object.values(results);
        itemList.forEach(item => item.collapsed = true);
        this.setState({[dataType]: itemList}, () => {
          this.sortItems(this.state.sortBy);
        })
      })
  }

  changeSort = change => {
    if(change.target.id === 'nook' || change.target.id === 'alpha'){
      this.setState({sortBy: change.target.id}, () => this.sortItems())
    }
    else if(change.target.id === 'ascending' || change.target.id === 'descending'){
      this.setState({order: change.target.id}, () => this.sortItems())
    }
  }

  collapseAll = () => {
    const activePage = this.state.activeItem;
    const activeItemList = this.state[activePage];
    activeItemList.forEach(item => item.collapsed = true)
    this.setState({activePage: activeItemList})
  }

  expandAll = () => {
    const activePage = this.state.activeItem;
    const activeItemList = this.state[activePage];
    activeItemList.forEach(item => item.collapsed = false)
    this.setState({activePage: activeItemList})
  }

  handleReset = e => {
    //To do: When enter is pressed while in input, do NOT reset page!
    const searchForm = document.querySelector('#searchForm');
    console.log(searchForm)
    console.log('resetting')
    this.setState({searchValue: ''});
    // searchForm[0].value = '';
  }
  
  sortItems = () => {
    let unsortedState;
    this.state.searchValue ? unsortedState = this.state.filtered : unsortedState = this.state[this.state.activeItem];
    let sortedState = [];
    if(this.state.sortBy === 'alpha' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a.name["name-en"].toLowerCase() > b.name["name-en"].toLowerCase() ? 1 : -1);
    }else if(this.state.sortBy === 'alpha' && this.state.order === 'descending'){
        sortedState = unsortedState.sort((a, b) => a.name["name-en"].toLowerCase() < b.name["name-en"].toLowerCase() ? 1 : -1);
    }else if(this.state.sortBy === 'nook' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a.price - b.price);
    }else if(this.state.sortBy === 'nook' && this.state.order === 'descending'){
      sortedState = unsortedState.sort((a, b) => b.price - a.price);
    }
  this.state.searchValue ? this.setState({filtered: sortedState}) : this.setState({[this.state.activeItem]: sortedState});
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
        toggleCollapse = {this.toggleCollapse}
        changeSort = {this.changeSort}
        fish={this.state.fish}
        bugs={this.state.bugs}
        fossils={this.state.fossils}
        />
    }
    else if(activeItem === 'music'){
      displayArea = <Music 
        activeItem={this.state.activeItem} 
        music={this.state.music} 
        playSong = {this.playSong}
        filtered={this.state.filtered}
        handleChange={this.handleChange}
        searchValue={this.state.searchValue}
        toggleCollapse = {this.toggleCollapse} />
    }
    else if(activeItem === 'villagers'){
      displayArea = <Villagers 
        activeItem={this.state.activeItem} 
        villagers={this.state.villagers} 
        filtered={this.state.filtered}
        searchValue={this.state.searchValue}
        toggleCollapse = {this.toggleCollapse}
        time = {this.state.time}
        changeSort={this.changeSort} 
        collapseAll = {this.collapseAll} 
        expandAll = {this.expandAll} 
        handleReset = {this.handleReset}
        />;
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