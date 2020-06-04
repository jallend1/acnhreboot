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
        console.log(villager)
        return(
            <div className="creature" key={fileName}>
                <h3>{name}</h3>
                <img src={`./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                <h4>Catchphrase: {catchPhrase}</h4>
                <div className="details">
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