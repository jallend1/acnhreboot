import React from 'react';


class FilterVillagers extends React.Component{
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
                    <form id="characteristics">
                    </form>
                </div>
            </>
        )
    }
}

export default FilterVillagers;