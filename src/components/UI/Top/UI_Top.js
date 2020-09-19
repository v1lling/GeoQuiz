import * as React from 'react';
import {Component} from 'react';
import '../../../styles/UI_Top.css';
import '../../../styles/Shared.css';

import { Typography } from '@material-ui/core';

class UI_Top extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="ui">
          <Typography> {this.props.city.city}, {this.props.city.country} </Typography>
          <button onClick={this.props.onClickMenu}>MENU</button>
        </div>
    );
  }
}
export default UI_Top; //withStyles(styles)(Map);