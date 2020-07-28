import React from 'react';

class FilterVillagers extends React.Component{
    populateMonths = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return months.map(month => {
            return (
                <div className="options" key={month}>
                    <input type="checkbox" name="birthday" value={month} onChange={this.props.checkboxChange} />
                    <label htmlFor={month}>{month}</label>
                </div>
            )
        })
    }
    populateSpecies = () => {                                                                                           // Populates drop down list of different villager species
        return this.props.species.map(species => {
            return (
                <div className="options" key={species}>
                    <input type="checkbox" id={species} name="species" value={species} onChange={this.props.checkboxChange}/>
                    <label htmlFor={species}>{species}</label>
                </div>
            )
        })
    }
    populatePersonalities = () => {
        return this.props.personalities.map(personality => {
            return (
                <div className="options" key={personality} >
                    <input type="checkbox" id={personality} name="personality" value={personality} onChange={this.props.checkboxChange}/>
                    <label htmlFor={personality}>{personality}</label>
                </div>
                )   
        });
    }
    render(){
        return (
            <details>
                <summary>Advanced search options</summary>
                <div id="advanced">
                    <fieldset>
                        <legend>Species</legend>
                        <div className="checkboxes">
                            {this.populateSpecies()}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Personalities</legend>
                        <div className="checkboxes">
                            {this.populatePersonalities()}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Birthdays</legend>
                        <div className="checkboxes">
                            {this.populateMonths()}
                        </div>
                    </fieldset>
                </div>
            </details>
        )
    }
}

export default FilterVillagers;