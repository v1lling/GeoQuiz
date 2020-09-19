import { TableBody, Typography } from '@material-ui/core';
import * as React from 'react';
import {Component} from 'react';
import '../../styles/Score.css';
import '../../styles/Shared.css';

class Score extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
     
    };

  }

  render() {
    return (
        <div id="ui_bottom" className="ui">
            <div id="guess" className="tile border">
                <div className="stats">
                    <table>
                        <TableBody>
                        <tr>
                            <td>Time: </td>
                            <td> {this.props.score.time}</td>
                        </tr>
                        <tr>
                            <td>Distance: </td>
                            <td> {this.props.score.distance}</td>
                        </tr>
                        <tr>
                            <td>Combo:</td>
                            <td> {this.props.score.combo}</td>
                        </tr>
                        </TableBody>
                    </table>
                    <Typography> {this.props.score.points} </Typography>
                </div>
                <button onClick={this.props.onNext}>NEXT</button>
            </div>
        </div>
    );
  }
}
export default Score;