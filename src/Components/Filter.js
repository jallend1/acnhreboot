import React from 'react';

class Filter extends React.Component{
    determineSearchFields() {
        console.log(this.props.activeItem);
        if(this.props.activeItem === 'fish'){
            return(
                <>
                    <input type="radio" id="cj" name="sortby" value="cj" />
                    <label htmlFor="cj">CJ's Price </label>
                </>
            )
        }
        else if(this.props.activeItem === 'bugs'){
            return(
                <>
                    <input type="radio" id="flick" name="sortby" value="flick" />
                    <label htmlFor="flick">Flick's Price</label>
                </>
            )
        }
    }
    render(){
        return (
            <>
                <form id="searchForm" onSubmit={this.props.handleChange}>
                    <input type="text" placeholder="Search for item..." onChange={this.props.handleChange}></input>
                    <button onClick={this.props.handleReset}>Clear</button>
                </form>
                <div id="filters">
                    <form onChange={this.props.changeSort} >
                        <input type="radio" id="alpha" name="sortby" value="alpha" defaultChecked />
                            <label htmlFor="alpha">Alphabetical</label>
                        <input type="radio" id="nook" name="sortby" value="nook" />
                            <label htmlFor="nook">Nook's Price </label>
                        {this.determineSearchFields()}
                    </form>
                    <form onChange={this.props.changeSort}>
                        <input type="radio" id="ascending" name="order" value="ascending" defaultChecked />
                        <label htmlFor="ascending">Ascending</label>
                        <input type="radio" id="descending" name="order" value="descending" />
                        <label htmlFor="descending">Descending</label>
                    </form>
                    <div>
                        <button onClick={() => this.props.collapseAll(this.props.activeItem)}>Collapse All</button>
                        <button onClick={() => this.props.expandAll(this.props.activeItem)}>Expand All</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Filter;