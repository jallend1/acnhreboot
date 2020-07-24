import React from 'react';
import { properCase } from '../utils';
import { Link, Router } from 'react-router-dom';

class Navbar extends React.Component{
    handleClick = (clickedType) => {
        const newType = clickedType.target.textContent.toLowerCase();
        this.props.changeType(newType);
    }
    renderTypes = types => {
        return types.map(type => {
            return (
                // <Link to={`/${type}`}>{type}</Link>
                // <li onClick={this.handleClick}>{properCase(type)}</li>
                <p>hello</p>
                )
        })
    }
    render() { 
        return( 
            // <Router>

            <ul>
                <li>
                    {this.renderTypes(this.props.types)}
                </li>
            </ul>
            // </Router>
        )
    }
}

export default Navbar;