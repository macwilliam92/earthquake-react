import React, { Component } from 'react';
import { Row, Col, Input, Icon } from 'react-materialize'
import logo from '../assets/Earthquake.png'

class Title extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }


  logout(){
    this.props.auth.logout();
  } 

  render() {
    return (
      <Col s={12} className='with-background-color'>
        <Row>
          <Col s={1}>
            <ul>
              <li className='logo'>
                <div id='logo-container'> 
                  <img className='brand-logo active' src={logo} alt='earthquake'/>
                </div>
              </li>
            </ul>
          </Col>
          <Col s={6} className='center-align'>
            <h3>Analisís del daño</h3>
          </Col>
          <Col s={4} className='with-padding-top'>
            <Input s={12} label='Tipo' icon='domain' type='select'  defaultValue='house'>
              <option value='house'>
                Viviendas
              </option>
              <option value='building'>
                Edificios
              </option>
              <option value='bridge'>
                Puentes urbanos
              </option>
              <option value='historical_building'>
                Edificios históricos
              </option>
            </Input>
          </Col>
          <Col s={1} className='with-padding-top'>
            <a href='#' className='white-text' onClick={this.logout}>
              <Icon center medium right>power_settings_new</Icon>
            </a>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Title;