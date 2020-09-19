import React, { Fragment } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import {Component} from 'react';
import Map from '../Map/Map';
import Score from '../Score/Score';
import UI_Top from '../UI/Top/UI_Top'
import {calculateDistance} from '../../libs/utils.js'
import UI_Start from '../UI/Start/UI_Start';

var capitals = require("../../json/capitals.json");
class App extends Component {

  constructor(props) {
      super(props);

      /*
      const DEFAULT_STATE = {
          cache: CACHE_NUMBER,
          currentMode: defaultMode,
          answerAttempts: 0,
          score: 0,
      }
      */
    this.state = {
      currentCity : '',
      currentScore: {},
      currentGuess: {},
      showCurrentCity: false,
      mode: '',
      showStartMenu: true,
      cities: []
    }
  }

  /**
   * setNewCity
   * gets new city
   */
  setNewCity = () => {
    var randIndex = Math.floor(Math.random() * capitals.length); //this.cities.length);
    this.setState({currentCity: this.state.cities[randIndex]});
  };

  componentDidMount() {
    //  this.endGame();
    //this.setNewCity();
  };
  
  /**
   * evaluates Click on the map
   * @param {*} lat Latidude of Guess
   * @param {*} lng Longitude of Guess
   */
  evaluateGuess = () => {
    let distance = calculateDistance(this.state.currentGuess.lat, this.state.currentGuess.lng, this.state.currentCity.lat, this.state.currentCity.lng);
    this.setState({
        currentScore: {
          time: "TBI",
          distance: distance,
          combo: "TBI"
        }
    });

  };

  /**
   * starts a new game
   */
  startNewGame = () => {
    this.setNewCity();
    this.setState({currentScore: {}});
  };

  /*
  *
  * EVENTS 
  * 
  */

  /**
   * event when map is clicked
   * @param {*} e 
   */
  onClickMap = e => {
    this.setState({
      showCurrentCity: true,
      currentGuess: {
        lat: e.lngLat[1], 
        lng: e.lngLat[0]
      }
    }, this.evaluateGuess);
  };
  
  /**
   * event when next button of score is clicked
   * @param {*} e 
   */
  onClickNext = e => {
    this.setState({currentGuess: {}, showCurrentCity: false})
    this.setNewCity();
  };

  /**
   * event when start button is clicked
   */
  onClickStart = (e) => {
    this.setState({
      mode: e.target.value,
      cities: capitals,
      showStartMenu: false
    }, this.startNewGame);
  };

  /**
   * event when menu button is clicked
   */
  onClickMenu = () => {
    this.setState({showStartMenu: true});
  };

  /*
  *
  * RENDERER 
  * 
  */

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <app className="test">
          {this.state.showStartMenu && (
            <UI_Start onStart={this.onClickStart}/>
          )}
          <UI_Top city = {this.state.currentCity} onClickMenu={this.onClickMenu.bind(this)}/>
          <Map showCity={this.state.showCurrentCity} city={this.state.currentCity} guess={this.state.currentGuess} onClick={this.onClickMap} />
          <Score score={this.state.currentScore} onNext={this.onClickNext.bind(this)}/>
        </app>
      </Fragment>
    );
  };

};

export default App;