import * as React from 'react';
import {Component} from 'react';
import '../../../styles/UI_Start.css';
import '../../../styles/Shared.css';

class UI_Start extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="ui_start">
        <button value="capitals" onClick={this.props.onStart}>START CAPITALS</button>
      </div>
    );
  }
}
export default UI_Start; //withStyles(styles)(Map);