import React, { Component } from 'react';
import { Col, Table, Card } from 'react-materialize'
import { XYPlot, VerticalGridLines, HorizontalGridLines, LineSeries, XAxis, YAxis} from 'react-vis'

class LinearGraph extends Component {

    constructor(props) {
      super(props);
      this.props = props
      this.state = {
        x: 0,
        y: 0,
        data: props.data,
        labelX: props.labelX,
        labelY: props.labelY
      };
    }
  
    componentWillReceiveProps(nextProps){
      var newState = this.state
      newState.data = nextProps.data
      newState.labelX = nextProps.labelX
      newState.labelY = nextProps.labelY
      this.setState(newState)
    }
  
    render() {
      return (
        <Col s={6}>
        <Card className='small'>
          <XYPlot height={280} width={600}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={this.state.data}
              onNearestX={(datapoint, event)=>{
                this.setState(prevState => ({
                  x: datapoint.x,
                  y: datapoint.y
                }));
              }}
              curve={'curveMonotoneX'}
            >
            </LineSeries>
          </XYPlot>
          </Card>
          <Table centered={true} responsive={true}>
            <thead>
              <tr>
                <th data-field={this.state.labelX}>{this.state.labelX}</th>
                <th data-field={this.state.labelY}>{this.state.labelY}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.x}</td>
                <td>{this.state.y}</td>
              </tr>
            </tbody>
          </Table>
      </Col>
      );
    }
}

export default LinearGraph;