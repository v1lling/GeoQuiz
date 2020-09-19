import * as React from 'react';
import {Component} from 'react';
import MapGL, {Marker, Source, Layer} from 'react-map-gl';
import '../../styles/Map.css';
import '../../styles/Shared.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwZ3Vlc3MiLCJhIjoiY2s3cnNsbjZmMDZ1YzNwcGMyYjY2N3U2NyJ9.xIwW35_vGwvF0elgAZTjag';

class Map extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      sourceData: {
        'type': 'geojson',
        'data': {
         'type': 'Feature',
         'properties': {},
         'geometry': {
            'type': 'LineString',
            'coordinates': [
               [this.props.guess.lng, this.props.guess.lat],
               [this.props.city.lng, this.props.city.lat],
            ]
          }
        }
      },
      layerData: {
        
      }
    };
    this.myMap = React.createRef();

  }

  onClick = (e) => {
    this.props.onClick(e) //evalutes Guess
    this.setDistanceLine();
  };

  setDistanceLine = () => {
    
  };

  _getCursor = ({isHovering, isDragging}) => {
    return isDragging ? 'grab' : 'pointer';
  };

  render() {
    return (
        
      <MapGL
        {...this.state.viewport}
        ref={this.myMap}
        onClick={this.onClick}
        getCursor={this._getCursor}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapguess/ck7rspl0r105z1imelrapl2rf"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Source type="geojson" data={this.sourceData}>
            <Layer {...dataLayer} />
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