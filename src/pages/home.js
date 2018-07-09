import React, { Component } from 'react';
import { Row, Col, Input, Table } from 'react-materialize'
import Title from '../components/title'
import LinearGraph from '../components/lineargraph'
import axios from 'axios';

class HomeForm extends Component {
    render(){
      return (
        <Row>
          <Input s={4} id='masonry' type='select' label="Tipo de mampostería" defaultValue='2' onChange={this.props.handler}>
            <option value='2'>Macizo</option>
            <option value='3'>Hueco</option>
          </Input>
          <Input s={4} id='floors' type='select' label="Número de pisos" defaultValue='1' onChange={this.props.handler}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Input>
          <Input s={4} id='zone' type='select' label="Número de Zona" defaultValue='1' onChange={this.props.handler}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Input>
        </Row>
      )
    }
  }
  
  class HomeResults extends Component  {
    
    constructor(props) {
      super(props)
      this.props = props
      this.state = props.detail
    }
  
    componentWillReceiveProps(nextProps){
      this.setState(nextProps.detail);
    }
    
    render(){
      return (
        <div>
          <Row>
            <Col>
              <h5>Resultados</h5>
            </Col>
          </Row>
          <Row>
            <Table centered responsive>
              <thead>
                <tr>
                  <th>Índice de vulnerabilidad</th>
                  <th>Nivel de daño</th>
                  <th>Nivel de vulnerabilidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.ind}</td>
                  <td>{this.state.nd}</td>
                  <td>{this.state.nv}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col>
              <h5>Costos</h5>
            </Col>
          </Row>
          <Row>
            <Input s={6} id='number' label="Número de viviendas misma estructura" onChange={this.props.handler} defaultValue='1'/>
            <Input s={6} id='meters' label="Metros cuadrados por vivienda" onChange={this.props.handler} defaultValue='1'/>
          </Row>
          <Row>
            <Table centered responsive>
              <thead>
                <tr>
                  <th>Costo por metro cuadrado</th>
                  <th>Costo total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.nvCm2}</td>
                  <td>{this.state.cost}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>
      )
    }
  }
  
  class HomeGraph extends Component {
  
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
          <LinearGraph data={ this.state.dataSpectrumGraph } labelX={'Simulación'} labelY={'Espectro de riesgo'}/>
        </Row>
      );
    }
  }
  

class Home extends Component  {

    constructor(props) {
      super(props)
  
      // Bind the this context to the handler function
      this.handlerEvent = this.handlerEvent.bind(this);
  
      // Set initial state
      this.state = {
        masonry: '2',
        floors: '1',
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

    
  
    updateGraphsData(){
      var API_HOST = 'https://safe-anchorage-48646.herokuapp.com'
      axios.get(`${API_HOST}/api/apartment/vulnerability-graph?masonry=${this.state.masonry}&floors=${this.state.floors}&zone=${this.state.zone}`).then(
        ({data}) => {
          data = data.map(({simulation, vulnerability}) => { return {x: simulation, y: vulnerability}})
          var newState = this.state
          newState.dataVulnerabilityGraph = data
          this.setState(newState)
        }
      )
  
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
      )
    }
  
    componentDidMount(){
      this.updateGraphsData()
    }
  
    handlerEvent(event){
      var newState = this.state
      
      if(event.target.id === 'masonry'){
        newState.masonry = event.target.value
      } else if(event.target.id === 'floors'){
        newState.floors = event.target.value
      } else if(event.target.id === 'zone'){
        newState.zone = event.target.value
      } else if(event.target.id === 'number'){
        newState.number = event.target.value
      } else if(event.target.id === 'meters'){
        newState.meters = event.target.value
      }
      
      this.updateGraphsData()
      this.setState(newState)
    }
    
    render(){
      return (
        <div>
          <Title auth={this.props.auth} history={this.props.history}/>
          <Col s={12} className='with-padding-top'>
            <HomeForm handler={this.handlerEvent}/>
            <HomeGraph 
              dataVulnerabilityGraph={this.state.dataVulnerabilityGraph}
              dataSpectrumGraph={this.state.dataSpectrumGraph}
            />
            <HomeResults handler={this.handlerEvent} detail={this.state.detail}/>
          </Col>
        </div>
      );
    }
}

export default Home;