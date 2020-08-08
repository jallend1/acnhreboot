import React from 'react';
import { properCase } from '../utils';

class Completed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            completedDetails: []
        }
    }
    componentDidMount() {
        this.extractData(this.props.completed);
    }
    displayCompleted = () => {
            return this.state.completedDetails.map(item => {
                return (
                    <div key={item.key}>
                        <p>{properCase(item.name)}</p>
                        <img src={item.filename} alt={`Icon of ${item.name}`}></img>
                    </div>
                )
            });
    }
    extractData = completed => {
        const currentState = this.state.completedDetails;
        const itemArrays = Object.keys(completed);                          // Extracts name of all item types into an array
        itemArrays.forEach(itemArray => {
            currentState[itemArray] = [];
            if(completed[itemArray]){
                completed[itemArray].forEach(item => {
                    const itemDeets = this.props.allItems[itemArray].find(element => element.name["name-USen"] === item);                 // ALl the JSON info on the completed item
                    const fileLocation = 
                        itemArray === 'fossils' || itemArray === 'music' || itemArray === 'art' ? `./images/${itemArray}/${itemDeets["file-name"]}.png` //Displays image instead of icon for fossils, music, and art
                        : `./images/icons/${itemArray}/${itemDeets["file-name"]}.png`;
                    const importantDeets = {                                                                                    // Extracts just the item name, its type and image location
                        name: itemDeets.name["name-USen"],
                        type: itemArray,
                        filename: fileLocation,
                        key: `completed${itemDeets.name["name-USen"]}`
                    };
                    currentState.push(importantDeets);
                })
            }
        });
        this.setState({completedDetails: currentState});
    }

    render(){
        return (
            <>
                <div className="item">
                    {this.displayCompleted()}
                </div>
            </>
        )
    }
}

export default Completed;