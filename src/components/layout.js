
import React from 'react';
import { Row } from 'react-materialize'

const Layout = ({children}) => {
    return (
      <div className="App">
        <Row>
          {children}
        </Row>
      </div>
    );
}

export default Layout;