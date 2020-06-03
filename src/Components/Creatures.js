 import React from 'react';

class Creatures extends React.Component{
    render(){
        if(this.props.fish.length > 0){
            console.log(this.props.fish[0]["name"])
        } 
        return (
            <>
                <p>I am creatures</p>
            </>
        )
    }
}

export default Creatures;