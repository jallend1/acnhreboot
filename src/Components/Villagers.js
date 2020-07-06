import React from 'react';

class Villagers extends React.Component{
    displaySelection = () => {
        if(this.props.filtered.length > 0){                                                 // If there's a search term, return the filtered array
            return this.props.filtered.map(item => this.displayVillagers(item))
        }
        else{                                                                       // If not, go with the original state
            return this.props.villagers.map(item => this.displayVillagers(item))
        }
    }
    displayVillagers = villager => {
        const {
            "file-name": fileName,
            "catch-phrase": catchPhrase,
            gender,
            personality,
            species,
            name: {"name-en": name},
            "birthday-string": birthday,
            // birthday: birthdate,
            collapsed
            } = villager;
            this.fixBirthday(villager);
            return(
            <div className="item" key={fileName}>
                <header className="itemhead" onClick={() => this.props.toggleCollapse(fileName)}>
                    <h3>{name}</h3>
                    <img src={`./images/icons/${this.props.activeItem}/${fileName}.png`} alt={name} />
                    <h4>{catchPhrase}</h4>
                    <img src={collapsed ? './images/expand.png' : './images/collapse.png'} alt={collapsed ? 'Expand' : 'Collapse'} />
                </header>
                <div className={collapsed ? "details collapsed" : "details"}>
                    <img src={collapsed ? 'null' : `./images/${this.props.activeItem}/${fileName}.png`} alt="{name}" />
                    <p>Personality: {personality}</p>
                    <p>Gender: {gender}</p>
                    <p>Species: {species}</p>
                    <p>Birthday: {birthday}</p>
                </div>
            </div>
        )
    }
    fixBirthday = villager => {
        const originalBirthdayFormat = villager.birthday.split('/');
        const currentTime = new Date();
        const fixedBirthDate = currentTime.getFullYear() + ' ' + originalBirthdayFormat.reverse().join(' ');
        const birthDate = new Date(fixedBirthDate);
        console.log(fixedBirthDate)
        console.log(birthDate);
    }
    render(){
        return (
        <>
            <h2>{this.props.activeItem.toUpperCase()}</h2>
            {this.displaySelection()}
        </>
        )
    }
}

export default Villagers;