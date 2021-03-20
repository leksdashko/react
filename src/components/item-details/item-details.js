import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button/error-button';
import Spinner from '../spinner/spinner';

import './item-details.css';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
    image: null
  }

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId){
      this.updateItem();
    }
  }

  updateItem(){
    const { itemId, getData, getImageUrl } = this.props;

    if(!itemId){
      return;
    }

    this.setState({loading: true});

    getData(itemId).then((item) => {
      this.setState({item, loading: false, image: getImageUrl(item)});
    });
  }

  render() {

    const { item, image } = this.state;

    if(!item) {
      return <span>Select a person from the list</span>;
    }

    if(this.state.loading) {
      return <Spinner />;
    }

    const {id, name, gender, birthYear, eyeColor} = this.state.item;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
