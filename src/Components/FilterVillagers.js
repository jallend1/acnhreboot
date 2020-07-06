import React from 'react';


class FilterVillagers extends React.Component{
    populateSpecies = () => {                                                                                           // Populates drop down list of different villager species
        return this.props.species.map(species => <option value={species} key={species}>{species}</option>)
    }
    populatePersonalities = () => {
        return this.props.personalities.map(personality => <option value={personality} key={personality}>{personality}</option>)
    }
    render(){
        return (
            <>
                <form id="searchForm" onSubmit={this.props.handleChange}>
                    <input type="text" placeholder="Search for item..." onChange={this.props.handleChange}></input>
                    <button onClick={this.props.handleReset}>Clear</button>
                </form>
                <div>
                        <button onClick={this.props.collapseAll}>Collapse All</button>
                        <button onClick={this.props.expandAll}>Expand All</button>
                </div>
                <div>
                    <label htmlFor="species">Filter by species:</label>
                    <select name="species" id="species" onChange={this.props.filterSpecies}>
                        <option value="">Choose a species</option>
                        <option value="">All Species</option>
                        {this.populateSpecies()}
                    </select>
                </div>
                <div>
                    <label htmlFor="personality">Filter by personality:</label>
                    <select name="personality" id="personality" onChange={this.props.filterSpecies}>
                        <option value="">Choose a personality</option>
                        <option value="">All personalities</option>
                        {this.populatePersonalities()}
                    </select>
                </div>
            </>
        )
    }
}

export default FilterVillagers;