import React from 'react';

class Creatures extends React.Component{
    
    render(){
        return (
            <>
                <p>I am creatures</p>
                {this.props.fish.forEach(fish => <p>{fish}</p>)}
                {/* {this.props[this.props.activeItem]} */}
            </>
        )
    }
}

export default Creatures;