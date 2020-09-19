import * as React from 'react';
import {Component} from 'react';
import MapGL, {Marker, Source, Layer} from 'react-map-gl';
import '../../styles/Map.css';
import '../../styles/Shared.css';
import {getDistanceColor} from '../../libs/utils.js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwZ3Vlc3MiLCJhIjoiY2s3cnNsbjZmMDZ1YzNwcGMyYjY2N3U2NyJ9.xIwW35_vGwvF0elgAZTjag';

class Map extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      sourceData: {
        'id': 'route',
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            [0 , 20],
            [20, -20]
          ]
        }  
      },
      layerData: {
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
        'line-color': "blue", // mapColor,
        'line-width': 5
        }
        
      }
    };
    this.myMap = React.createRef();
  }

  onClick = (e) => {
    this.props.onClick(e, this.setDistanceLine.bind(this)); //evalutes Guess
  };

  setDistanceLine = () => {
    //set color of line layer
    setTimeout(function() {
      this.myMap.current.getMap().setPaintProperty("route", "line-color", this.props.distanceColor);
    }.bind(this), 10);
    // set corrdinates of source
    let newSourceData = this.state.sourceData;
    newSourceData.geometry.coordinates = [
      [this.props.guess.lng, this.props.guess.lat],
      [parseInt(this.props.city.lng), parseInt(this.props.city.lat)]
    ];
    this.myMap.current.getMap().getSource('route').setData(newSourceData);
  };

  _getCursor = ({isHovering, isDragging}) => {
    return isDragging ? 'grab' : 'pointer';
  };

  render() {
    return (
        
      <MapGL
        {...this.state.viewport}
        ref={this.myMap}
        onClick={this.onClick.bind(this)}
        getCursor={this._getCursor}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapguess/ck7rspl0r105z1imelrapl2rf"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        
        <Source id="route" type="geojson" data={this.state.sourceData}>
            <Layer id="route" type="line" {...this.state.layerData} />
        </Source>
        {!!this.props.city && this.props.showCity && (
        <Marker latitude={parseInt(this.props.city.lat)} longitude={parseInt(this.props.city.lng)} offsetLeft={-24} offsetTop={-24}>
          <img src="place.svg"></img>
        </Marker>
        )}
        {!!this.props.guess && this.props.showCity && (
        <Marker latitude={parseInt(this.props.guess.lat)} longitude={parseInt(this.props.guess.lng)} offsetLeft={0} offsetTop={0}>
          <img src="place.svg"></img>
        </Marker>
        )}
      </MapGL>
    );
  }
}
export default Map; //withStyles(styles)(Map);