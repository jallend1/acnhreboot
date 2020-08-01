import React from 'react';
import Header from './Components/Header';
import Creatures from './Components/Creatures';
import Music from './Components/Music';
import Villagers from './Components/Villagers';
import Art from './Components/Art';
import Welcome from './Components/Welcome';
import { properCase } from './utils';
import { BrowserRouter as Router,
  Switch,
  Route,
  NavLink} from 'react-router-dom';

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
      sortBy: 'alpha',
      order: 'ascending',
      types: ['fish', 'bugs', 'sea', 'fossils', 'music', 'villagers', 'art'],
      filtered: [],
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
        });
      });
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
    //To do: When enter is pressed while in input, do NOT reset page!
    // const searchForm = document.querySelector('#searchForm');
  }

  renderTypes = types => {
    return types.map(type => {
        return (
            <NavLink to={`/${type}`} key={type} onClick={() => this.setState({activeItem: type})}>{properCase(type)}</NavLink>
        )
    });
  }
  

  // This code is *** NO *** way to live
  sortItems = () => {
    let unsortedState;
    this.state.searchValue ? unsortedState = this.state.filtered : unsortedState = this.state[this.state.activeItem];
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
  this.state.searchValue ? this.setState({filtered: sortedState}) : this.setState({[this.state.activeItem]: sortedState});
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
      <nav>
        <Router>
          <ul>
            {this.renderTypes(this.state.types)}
          </ul>
          <Switch>
            <Route path="/fish">
              <Creatures 
                activeItem="fish"
                toggleCollapse = {this.toggleCollapse}
                changeSort = {this.changeSort}
                creatures = {this.state.fish}
                fish={this.state.fish}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
              />
            </Route>
            <Route path="/bugs">
              <Creatures 
                activeItem="bugs"
                toggleCollapse = {this.toggleCollapse}
                changeSort = {this.changeSort}
                creatures = {this.state.bugs}
                bugs={this.state.bugs}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
              />
            </Route>
            <Route path="/sea">
              <Creatures 
                activeItem="sea"
                toggleCollapse = {this.toggleCollapse}
                changeSort = {this.changeSort}
                creatures = {this.state.sea}
                sea={this.state.sea}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
              />
            </Route>
            <Route path="/fossils">
              <Creatures 
                activeItem="fossils"
                toggleCollapse = {this.toggleCollapse}
                changeSort = {this.changeSort}
                creatures = {this.state.fossils}
                fossils={this.state.fossils}
                time={this.state.time}
                collapseAll={this.collapseAll}
                expandAll={this.expandAll}
              />
            </Route>
            <Route path="/music">
              <Music 
                activeItem='music'
                music={this.state.music} 
                playSong = {this.playSong}
                filtered={this.state.filtered}
                handleChange={this.handleChange}
                toggleCollapse = {this.toggleCollapse} 
              />
            </Route>
            <Route path="/villagers">
              <Villagers 
                activeItem="villagers"
                villagers={this.state.villagers} 
                filtered={this.state.filtered}
                toggleCollapse = {this.toggleCollapse}
                time = {this.state.time}
                changeSort={this.changeSort} 
                collapseAll = {this.collapseAll} 
                expandAll = {this.expandAll} 
                handleReset = {this.handleReset}
              />
            </Route>
            <Route path="/art">
              <Art 
                activeItem="art"
                art={this.state.art} 
                toggleCollapse = {this.toggleCollapse}
              />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </nav>
    </div>
    );
  }
}

export default App;