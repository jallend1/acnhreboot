import React from 'react';
import { properCase } from '../utils';

class Navbar extends React.Component{
    handleClick = (clickedType) => {
        const newType = clickedType.target.textContent.toLowerCase();
        this.props.changeType(newType);
    }
    renderTypes = types => {
        return types.map(type => <li onClick={this.handleClick}>{properCase(type)}</li>)
    }
    render() { 
        return(
            <ul>
                {this.renderTypes(this.props.types)}
            </ul>
        )
    }
}

export default Navbar;