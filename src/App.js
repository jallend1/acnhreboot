import React from 'react';
import Header from './Components/Header';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';
import Completed from './Components/Completed';
import Welcome from './Components/Welcome';
import { properCase } from './utils';
import { BrowserRouter as Router,
  Switch,
  Route,
  NavLink } from 'react-router-dom';

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
      sea: [],
      limitToAvailable: false,
      sortBy: 'alpha',
      order: 'ascending',
      types: ['fish', 'bugs', 'sea', 'fossils', 'music', 'villagers', 'art', 'completed'],
      filtered: [],
      time: '',
      completed: {fish: [], bugs: [], sea: [], fossils: [], villagers: [], music: [], art: []}
    }
  }
  clearCollected = () => {
    const clearedState = {fish: [], bugs: [], sea: [], fossils: [], villagers: [], music: [], art: []};
    localStorage.removeItem('completed');
    this.setState({completed: clearedState});

  }
  componentDidMount(){
    this.state.types.forEach(item => this.populateData(item))                           //Populates all items into state on load
    const now = new Date();
    if(localStorage.getItem('completed') !== null){
      const savedCompleted = localStorage.getItem('completed');
      this.setState({completed: JSON.parse(savedCompleted)});
    }
    this.setState({time: now});
  }

  populateData = dataType => {
    if(dataType !== 'completed'){
      fetch(`./${dataType}.json`)
      .then(data => data.json())
      .then(results => {
        const itemList = Object.values(results);
        itemList.forEach(item => item.collapsed = true);
        this.setState({[dataType]: itemList}, () => {
          this.sortItems(this.state.sortBy);
        });
      });
    }
  }

  changeActiveItem = newType => {
    this.setState({activeItem: newType})
  }

  changeSort = change => {
    if(change.target.id === 'nook' || change.target.id === 'alpha' || change.target.id === 'cj' || change.target.id === 'flick' || change.target.id === 'births'){
      this.setState({sortBy: change.target.id}, () => this.sortItems())
    }
    else if(change.target.id === 'ascending' || change.target.id === 'descending'){
      this.setState({order: change.target.id}, () => this.sortItems())
    }
  }

  collapseAll = (activeItem) => {
    const activeItemList = this.state[activeItem];
    activeItemList.forEach(item => item.collapsed = true)
    this.setState({[activeItem]: activeItemList})
  }

  expandAll = (activeItem) => {
    const activeItemList = this.state[activeItem];
    activeItemList.forEach(item => item.collapsed = false)
    this.setState({[activeItem]: activeItemList})
  }

  handleReset = e => {
    //TODO: When enter is pressed while in input, do NOT reset page!
    // const searchForm = document.querySelector('#searchForm');
  }

  markComplete = e => {
    const currentState = this.state.completed;
    console.log(this.state.activeItem)
    console.log(this.state.completed)
    console.log(this.state.completed[this.state.activeItem])
    console.log(currentState[this.state.activeItem])
    console.log(e.target.value)
    if(e.target.checked){
      currentState[this.state.activeItem].push(e.target.value)
      this.setState({completed: currentState}, localStorage.setItem('completed', JSON.stringify(this.state.completed)))
    }
    else{
      const index = currentState[this.state.activeItem].indexOf(e.target.value);
      currentState[this.state.activeItem].splice(index, 1);
      this.setState({completed: currentState}, localStorage.setItem('completed', JSON.stringify(this.state.completed)));
    }
  }
  
  renderTypes = types => {
    return types.map(type => {
        return (
            <NavLink to={`/${type}`} key={type} onClick={() => this.setState({activeItem: type})}>{properCase(type)}</NavLink>
        )
    });
  }

  // TODO This code is *** NO *** way to live
  sortItems = () => {
    let unsortedState;
    this.state.searchValue || this.state.limitToAvailable ? unsortedState = this.state.filtered : unsortedState = this.state[this.state.activeItem];
    let sortedState = [];
    if(this.state.sortBy === 'alpha' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a.name["name-USen"].toLowerCase() > b.name["name-USen"].toLowerCase() ? 1 : -1);
    }else if(this.state.sortBy === 'alpha' && this.state.order === 'descending'){
        sortedState = unsortedState.sort((a, b) => a.name["name-USen"].toLowerCase() < b.name["name-USen"].toLowerCase() ? 1 : -1);
    }else if(this.state.sortBy === 'nook' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a.price - b.price);
    }else if(this.state.sortBy === 'nook' && this.state.order === 'descending'){
      sortedState = unsortedState.sort((a, b) => b.price - a.price);
    }else if(this.state.sortBy === 'cj' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a["price-cj"] - b["price-cj"]);
    }else if(this.state.sortBy === 'cj' && this.state.order === 'descending'){
      sortedState = unsortedState.sort((a, b) => b["price-cj"] - a["price-cj"]);
    }else if(this.state.sortBy === 'flick' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a["price-flick"] - b["price-flick"]);
    }else if(this.state.sortBy === 'flick' && this.state.order === 'descending'){
      sortedState = unsortedState.sort((a, b) => b["price-flick"] - a["price-flick"]);
    }else if(this.state.sortBy === 'births' && this.state.order === 'ascending'){
      sortedState = unsortedState.sort((a, b) => a.birthdayDaysAway - b.birthdayDaysAway);
    }else if(this.state.sortBy === 'births' && this.state.order === 'descending'){
      sortedState = unsortedState.sort((a, b) => b.birthdayDaysAway - a.birthdayDaysAway);
    }
  this.state.searchValue || this.state.availableToday ? this.setState({filtered: sortedState}) : this.setState({[this.state.activeItem]: sortedState});
  }

  toggleCollapse = (item, creatureType) => {
    const currentState = this.state[creatureType];
    const itemIndex = currentState.findIndex(creature => creature["file-name"] === item);
    let isCollapsed = currentState[itemIndex].collapsed;
    isCollapsed = !isCollapsed;
    currentState[itemIndex].collapsed = isCollapsed;
    this.setState({[creatureType]: currentState})
  }

  // TODO : Universal active state? Allow filtering from main page, drying out code pretty dramatically; Routes in own file?
  render() {
    return (  
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              {this.renderTypes(this.state.types)}
            </ul>
          </nav>
          <button onClick={this.clearCollected}>Clear ALL completed items</button>
          <Switch>
            <Route path="/fish">
              <Creatures
                activeItem="fish"
                changeActiveItem = {this.changeActiveItem}
                toggleCollapse = {this.toggleCollapse}
                changeSort = {this.changeSort}
                creatures = {this.state.fish}
                fish = {this.state.fish}
                time = {this.state.time}
                collapseAll = {this.collapseAll}
                expandAll = {this.expandAll}
                availableToday = {this.state.availableToday}
                markComplete = {this.markComplete}
                sortBy = {this.state.sortBy}
                completed = {this.state.completed}
              />
            </Route>
            <Route path="/bugs">
              <Creatures 
                activeItem="bugs"
                toggleCollapse = {this.toggleCollapse}
                changeActiveItem = {this.changeActiveItem}
                changeSort = {this.changeSort}
                creatures = {this.state.bugs}
                bugs={this.state.bugs}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
                markComplete = {this.markComplete}
                sortBy = {this.state.sortBy}
                completed = {this.state.completed}
              />
            </Route>
            <Route path="/sea">
              <Creatures 
                activeItem="sea"
                toggleCollapse = {this.toggleCollapse}
                changeSort = {this.changeSort}
                changeActiveItem = {this.changeActiveItem}
                creatures = {this.state.sea}
                sea={this.state.sea}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
                markComplete = {this.markComplete}
                completed = {this.state.completed}
              />
            </Route>
            <Route path="/fossils">
              <Creatures 
                activeItem="fossils"
                toggleCollapse = {this.toggleCollapse}
                changeActiveItem = {this.changeActiveItem}
                changeSort = {this.changeSort}
                creatures = {this.state.fossils}
                fossils={this.state.fossils}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
                markComplete = {this.markComplete}
                completed = {this.state.completed}
              />
            </Route>
            <Route path="/music">
              <Music 
                activeItem='music'
                changeActiveItem = {this.changeActiveItem}
                music={this.state.music} 
                playSong = {this.playSong}
                filtered={this.state.filtered}
                handleChange={this.handleChange}
                toggleCollapse = {this.toggleCollapse} 
                markComplete = {this.markComplete}
                completed = {this.state.completed}
              />
            </Route>
            <Route path="/villagers">
              <Villagers 
                activeItem="villagers"
                changeActiveItem = {this.changeActiveItem}
                villagers={this.state.villagers} 
                filtered={this.state.filtered}
                toggleCollapse = {this.toggleCollapse}
                time = {this.state.time}
                changeSort={this.changeSort} 
                collapseAll = {this.collapseAll} 
                expandAll = {this.expandAll} 
                handleReset = {this.handleReset}
                markComplete = {this.markComplete}
                completed = {this.state.completed}
              />
            </Route>
            <Route path="/art">
              <Art 
                activeItem="art"
                changeActiveItem = {this.changeActiveItem}
                art={this.state.art} 
                toggleCollapse = {this.toggleCollapse}
                markComplete = {this.markComplete}
              />
            </Route>
            <Route path="/completed">
              <Completed
                activeItem ="completed"
                changeActiveItem = {this.changeActiveItem}
                completed = {this.state.completed}
                fish = {this.state.fish}
                bugs = {this.state.bugs}
                sea = {this.state.sea}
                fossils = {this.state.fossils}
                music = {this.state.music}
                villagers = {this.state.villagers}
                art = {this.state.art}
                collapseAll = {this.props.collapseAll} 
                expandAll = {this.props.expandAll} 
                handleChange = {this.handleChange} 
                handleReset = {this.props.handleReset}
                changeSort = {this.props.changeSort}
                showAvailable = {this.showAvailable}
              />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;