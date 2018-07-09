import React, { Component } from 'react'
import Title from '../components/title'
import LinearGraph from '../components/lineargraph'
import { Row, Col, Input } from 'react-materialize'
import axios from 'axios'

class BuildingForm extends Component {
  render(){
    return (
      <Row>
        <Input s={6} id='floors' type='select' label="Número de pisos" defaultValue='2' onChange={this.props.handler}>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='13'>13</option>
          <option value='14'>14</option>
          <option value='15'>15</option>
        </Input>
        <Input s={6} id='zone' type='select' label="Número de Zona" defaultValue='1' onChange={this.props.handler}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </Input>
      </Row>
    )
  }
}

class BuildingGraph extends Component {
  
  constructor(props) {
    super(props);
    this.props = props
  }

  state = {
    dataVulnerabilityGraph: this.props.dataVulnerabilityGraph,
    dataSpectrumGraph: this.props.dataSpectrumGraph
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      dataVulnerabilityGraph: nextProps.dataVulnerabilityGraph,
      dataSpectrumGraph: nextProps.dataSpectrumGraph
    })
  }

  render() {
    return (
      <Row>
        <LinearGraph data={ this.state.dataVulnerabilityGraph } labelX={'Simulación'} labelY={'Vulnerabilidad'}/>
        <LinearGraph data={ this.state.dataVulnerabilityGraph } labelX={'Simulación'} labelY={'Espectro de riesgo'}/>
      </Row>
    );
  }
}

class Building extends Component {
  
  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handlerEvent = this.handlerEvent.bind(this);

    // Set initial state
    this.state = {
      floors: '2',
      zone: '1',
      number: '1',
      meters: '1',
      dataVulnerabilityGraph: [],
      dataSpectrumGraph: [],
      detail: {
        ind: 0,
        nd: ' ',
        nv: ' ',
        nvCm2: 8244,
        cost: 0
      }
    }
  }

  handlerEvent(event){
    var newState = this.state
    
    if(event.target.id === 'floors'){
      newState.floors = event.target.value
    } else if(event.target.id === 'zone'){
      newState.zone = event.target.value
    } else if(event.target.id === 'number'){
      newState.number = event.target.value
    } else if(event.target.id === 'meters'){
      newState.meters = event.target.value
    }
    
    this.fetchGraphsData()
    this.setState(newState)
  }

  fetchGraphsData(){
    var API_HOST = process.env.REACT_APP_EARTHQUAKE_API_HOST
    axios.get(`${API_HOST}/api/building/vulnerability-graph?floor=${this.state.floors}`).then(
      ({data}) => {
        data = data.map(({simulation, vulnerability}) => { return {x: simulation, y: vulnerability}})
        var newState = this.state
        newState.dataVulnerabilityGraph = data
        this.setState(newState)
      }
    )
    /*
    axios.get(`${API_HOST}/api/apartment/spectrum-graph?zone=${this.state.zone}`).then(
      ({data}) => {
        data = data.map(({simulation, spectrum}) => { return {x: simulation, y: spectrum}})
        var newState = this.state
        newState.dataSpectrumGraph = data
        this.setState(newState)
      }
    )

    axios.get(`${API_HOST}/api/apartment/vulnerability-stats?masonry=${this.state.masonry}&floors=${this.state.floors}&zone=${this.state.zone}&number=${this.state.number}&meters=${this.state.meters}`).then(
      ({data}) => {
        var newState = this.state
        newState.detail = data
        this.setState(newState)
      }
    )*/
  }

  componentDidMount(){
    this.fetchGraphsData()
  }

  render(){
    return (
      <div>
        <Title page={'building'} auth={this.props.auth} history={this.props.history}/>
        <Col s={12} className='with-padding-top'>
          <BuildingForm handler={this.handlerEvent}/>
          <BuildingGraph 
              dataVulnerabilityGraph={this.state.dataVulnerabilityGraph}
              dataSpectrumGraph={this.state.dataSpectrumGraph}
            />
        </Col>
      </div>
    )
  }
}

export default Building;
