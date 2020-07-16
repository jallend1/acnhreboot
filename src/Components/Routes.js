import React from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom';
import Music from './Music';
import Welcome from './Welcome';

class Routes extends React.Component{
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
      
    populateData = dataType => {
        fetch(`./music.json`)
            .then(data => data.json())
            .then(results => {
            const itemList = Object.values(results);
            itemList.forEach(item => item.collapsed = true);
            this.setState({music: itemList})
            })
        }
    render(){
        return(
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/music">Music</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route exact path="/music">
                        <Music activeItem='songs' filtered={this.state.music} music={this.state.music} />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes;