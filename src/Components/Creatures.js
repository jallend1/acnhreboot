 import React from 'react';

class Creatures extends React.Component{
    showmeCreatures(){
        console.log(this.props.fish[0])
    }

    render(){
        return (
            <>
                <p>I am creatures</p>
        <p>{this.props[this.props.activeItem][0]["file-name"]}</p>
            </>
        )
    }
}

export default Creatures;