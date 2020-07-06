import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';
import Filter from './Components/Filter';
import FilterVillagers from './Components/FilterVillagers';

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
      species: [],
      personalities: [],
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
    if(newType === 'villagers'){
      this.compileSpeciesList();
    }
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

  compileSpeciesList = () => {
    const speciesList = this.state.species;
    const personalitiesList = this.state.personalities;
    const villagers = this.state.villagers;
    villagers.forEach(villager => {
      if(!speciesList.includes(villager.species)){
        speciesList.push(villager.species);
      }
      if(!personalitiesList.includes(villager.personality)){
        personalitiesList.push(villager.personality)
      }
    });
    this.setState({species: speciesList})
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
  
  filterSpecies = criteria => {
    let filteredResults = this.state.filtered;
    const desiredCriteria = criteria.target.value;
    const villagers = this.state.villagers;
    if(criteria.target.name === 'species'){
      filteredResults = villagers.filter(villager => villager.species === desiredCriteria);
    }else if(criteria.target.name === 'personality'){
      filteredResults = villagers.filter(villager => villager.personality === desiredCriteria)
    }
    this.setState({filtered: filteredResults})
  }

  handleChange = e => {
    if(e.currentTarget.value){
      const searchTerm = e.currentTarget.value.toLowerCase();
      this.setState({searchValue: searchTerm});
      const activeType = this.state.activeItem;
      const currentData = this.state[activeType];
      const filteredData = currentData.filter(item => item.name["name-en"].toLowerCase().includes(searchTerm));
      this.setState({filtered: filteredData});
    }
    else{
      this.setState({
        searchValue: '',
        filtered: []
      });
    }
  }

  handleReset = e => {
    //To do: When enter is pressed while in input, do NOT reset page!
    const searchForm = document.querySelector('#searchForm');
    console.log('resetting')
    this.setState({searchValue: ''});
    searchForm[0].value = '';
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
    let filtering = <Filter changeSort={this.changeSort} activeItem = {this.state.activeItem} collapseAll = {this.collapseAll} expandAll = {this.expandAll} handleChange = {this.handleChange} handleReset = {this.handleReset}/>;
    if(activeItem === 'fish' || activeItem === 'bugs' || activeItem === 'fossils'){
      displayArea = <Creatures 
        activeItem={this.state.activeItem} 
        creatures={this.state[activeItem]}
        filtered={this.state.filtered}
        displaySelection={this.displaySelection}
        searchValue={this.state.searchValue}
        handleChange={this.handleChange}
        toggleCollapse = {this.toggleCollapse}
        sortItems = {this.sortItems}
        changeSort = {this.changeSort} />
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
        handleChange={this.handleChange}
        searchValue={this.state.searchValue}
        toggleCollapse = {this.toggleCollapse}
        species = {this.state.species}
        compileSpeciesList = {this.compileSpeciesList}
        />
      filtering = <FilterVillagers
        changeSort={this.changeSort} 
        activeItem = {this.state.activeItem} 
        collapseAll = {this.collapseAll} 
        expandAll = {this.expandAll} 
        handleChange = {this.handleChange} 
        handleReset = {this.handleReset}
        species = {this.state.species}
        filterSpecies = {this.filterSpecies}
        personalities = {this.state.personalities}
      />
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
      {filtering}                                                                   {/* Displays filtering component based on active item */} 
      {displayArea}
    </div>
    );
  }
}

export default App;