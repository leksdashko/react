import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page.css';

const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
};

class ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    componentDidCatch(){
        this.setState({hasError: true});
    }

    render(){
        if(this.state.hasError){
            return <ErrorIndicator />;
        }
        
        return this.props.children;
    }
}

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    }

    render() {

        if(this.state.hasError){
            return <ErrorIndicator />;
        }

        const itemList = (
            <ItemList 
                getData={this.swapiService.getAllPeople} 
                onItemSelected={this.onPersonSelected} >
                    
                {(i) => (`${i.name} (${i.birthYear})`)}
            </ItemList>
        );

        const personDetails = (
            <PersonDetails personId={ this.state.selectedPerson }/>
        );

        return (
            <ErrorBoundary>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundary>
        );
    }

}