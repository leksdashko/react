import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import PersonDetails from '../person-details';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';


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

    return (
      <div className="container">
        <Header />
        { planetBlock }

        <div className="row mb2 button-row">
          <div className="col">
          <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>Toggle Random Planet</button>
            <ErrorButton />
            </div>
        </div>

        <PeoplePage />
      </div>
    );
  }
};
