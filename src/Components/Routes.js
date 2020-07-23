import React from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link } from 'react-router-dom';
import Music from './Music';
import Welcome from './Welcome';
import Art from './Art';
import App from '../App';
import Creatures from './Creatures';

class Routes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          activeItem: 'fish',
          music: [],
          art: [],
          creatures: {
              fish: [],
              bugs: [],
              fossils: []
          },
          sortBy: 'alpha',
          order: 'ascending',
          types: ['fish', 'bugs', 'fossils', 'music', 'art'],
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
                // Updates embedded creatures 
                if(dataType === 'fish' || dataType === 'bugs' || dataType === 'fossils'){
                    const creatures = {...this.state.creatures};
                    creatures[dataType] = itemList;
                    this.setState({creatures});
                }
                else{
                    this.setState({[dataType]: itemList})
                }
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
                            <NavLink to="/">Home</NavLink>
                        </li>
                            <NavLink to="/fish">Fish</NavLink>
                        <li>
                            <NavLink to="/music">Music</NavLink>
                        </li>
                        <li>
                            <NavLink to="/art">Art</NavLink>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>
                    {/* <Route exact path="/fish"> */}
                        {/* <Creatures 
                            activeItem='fish'
                            filtered={this.state.creatures}
                            fish={this.state.creatures}
                        /> */}

                    {/* </Route> */}
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