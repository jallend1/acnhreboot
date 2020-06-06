import React from 'react';

class Villagers extends React.Component{
    displayVillagers = villager => {
        const {
            "file-name": fileName,
            "catch-phrase": catchPhrase,
            gender,
            personality,
            species,
            name: {"name-en": name},
            "birthday-string": birthday
            } = villager;
        return(
            <div className="item" key={fileName}>
                <h3>{name}</h3>
                <h4>Catchphrase: {catchPhrase}</h4>
                <img src={`./images/icons/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                <div className="details collapsed">
                    <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                    <p>Personality: {personality}</p>
                    <p>Gender: {gender}</p>
                    <p>Species: {species}</p>
                    <p>Birthday: {birthday}</p>
                </div>
            </div>
        )
    }
    render(){
        return (
        <>
            <h2>{this.props.activeItem.toUpperCase()}</h2>
            {this.props.villagers.map(villager => this.displayVillagers(villager))}
        </>
        )
    }
}

export default Villagers;