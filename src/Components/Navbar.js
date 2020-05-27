import React from 'react';

class Navbar extends React.Component{
    handleClick = (clickedType) => {
        const newType = clickedType.target.textContent.toLowerCase();
        console.log(newType)
        this.props.changeType(newType);
        
    }
    render() { 
        return(
            <>
            <ul>
                <li onClick={this.handleClick}>Fish</li>
                <li onClick={this.handleClick}>Bugs</li>
                <li onClick={this.handleClick}>Fossils</li>
                <li onClick={this.handleClick}>Songs</li>
                <li onClick={this.handleClick}>Villagers</li>
                <li onClick={this.handleClick}>{this.props.activeItem}</li>
            </ul>
            </>
        )
    }
}

export default Navbar;