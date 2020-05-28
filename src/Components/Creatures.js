 import React from 'react';

class Creatures extends React.Component{
    showmeCreatures(){
        console.log(this.props.fish[0])
    }

    render(){
        return (
            <>
                <p>I am creatures</p>
                {this.props.fish.map(fish => <p>{fish}</p>)}
                {/* <p>{this.props[this.props.activeItem][0]}</p> */}
                {this.showmeCreatures()}
            </>
        )
    }
}

export default Creatures;