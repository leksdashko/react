import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import Row from '../row';
import ErrorBoundary from '../error-boundry';

import './people-page.css';

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
            <ItemDetails personId={ this.state.selectedPerson }/>
        );

        return (
            <ErrorBoundary>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundary>
        );
    }

}