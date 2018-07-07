import React, { Component } from 'react';
import { Row, Col, Input, Icon, Button} from 'react-materialize'
import logo from '../assets/Earthquake.png'

class Login extends Component{
  render() {
    return (
        <div>
            <Row>
                <Col s={12} className='with-background-color'>
                    <Row>
                        <Col s={3}>
                            <ul>
                                <li className='logo'>
                                <div id='logo-container'> 
                                    <img className='brand-logo active' src={logo} alt='earthquake'/>
                                </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col s={6} offset='s3'>   
                    <Input type="email" label="Email" s={12}>
                        <Icon>email</Icon>
                    </Input>
                </Col>
                <Col s={6} offset='s3'>   
                    <Input type="password" label="password" s={12}>
                        <Icon>lock_outline</Icon>
                    </Input>
                </Col>
                <Col s={6} offset='s3'>   
                    <Button waves='light' className='col s12'>Login</Button>
                </Col>
            </Row>
        </div>
    );
  }
}

export default Login;