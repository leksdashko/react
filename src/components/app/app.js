import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundry/error-boundry';
import Row from '../row';


export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState({
      showRandomPlanet: !this.state.showRandomPlanet
    });
  }

  componentDidCatch(){
    this.setState({ hasError: true });
  }

  render () {

    if(this.state.hasError){
      return <ErrorIndicator />;
    }

    const planetBlock = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}/>
    );

    const starshipDetails = (
      <ItemDetails itemId={5} getData={getStarship} getImageUrl={getStarshipImage}/>
    );

    return (
      <ErrorBoundary>
        <div className="container">
          <Header />

          <Row left={personDetails} right={starshipDetails} />
        </div>
      </ErrorBoundary>
    );
  }
};
