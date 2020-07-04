import React from 'react';


class FilterVillagers extends React.Component{
    populateSpecies = () => {
        this.props.species.forEach(species => {
            return (
                <option value={species}>{species}</option>
            )
        })
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
                    <p>Display Villagers</p>
                    <label for="species">Filter by species:</label>
                    <select name="species" id="species">
                        <option value="">Choose a species</option>
                        {this.populateSpecies}
                    </select>
                </div>
            </>
        )
    }
}

export default FilterVillagers;