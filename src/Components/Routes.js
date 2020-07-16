import React from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom';
import Music from './Music';
import Welcome from './Welcome';
import Art from './Art';

class Routes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          activeItem: 'fish',
          music: [],
          art: [],
          sortBy: 'alpha',
          order: 'ascending',
          types: ['music', 'art'],
          filtered: [],
          time: ''
        }
      }
      componentDidMount(){
        this.state.types.forEach(item => this.populateData(item))                           //Populates all items into state on load
      }
      
    populateData = dataType => {
        fetch(`./${dataType}.json`)
            .then(data => data.json())
            .then(results => {
                const itemList = Object.values(results);
                itemList.forEach(item => item.collapsed = true);
                this.setState({[dataType]: itemList})
            })
    }
    renderTypes = types => {
        // This does NOT work!!! Unsure why
        return types.map(type => {
            return ( 
            <li>
                <Link to="/:music" component={Music}>{type.toUpperCase()}</Link>
            </li>
        )
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
                        <li>
                            <Link to="/art">Art</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route exact path="/music">
                        <Music 
                            activeItem='music' 
                            filtered={this.state.music} 
                            music={this.state.music} 
                        />
                    </Route>
                    <Route exact path="/art">
                        <Art
                            activeItem='art' 
                            filtered={this.state.art} 
                            art={this.state.art} 
                        />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes;