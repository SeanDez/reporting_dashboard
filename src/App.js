import React, { Component } from 'react';
import logo                 from './logo.svg';
import './App.css';
import styled               from "styled-components";
import {BrowserRouter, Route, Link}      from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LoginBox from "./components/LoginBox";
import DataTable from "./components/DataTable";

const StyledLink = styled(Link)`
  && {
  text-decoration: none;
  }
`;

const LoginButton = styled(Button)`
  && {
    border: 2px solid green;
    max-width : 200px;
    margin-left : .5vw;
    margin-right : .5vw;
  }
`;

const NavButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    //max-width: 300px;
    border: 3px dotted deeppink;
    //background-color: deeppink;
    //z-index: 1000;
`;

const StyledH1 = styled.h2`
  color: purple;
`;

const HomeContainer = styled.div`

`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="outer-container">
        <AppBar>
          <NavButtonContainer>
            {/*<h4>Report Dashboard</h4>*/}
            <StyledLink to='/sign-up'>
              <LoginButton
              >Sign Up</LoginButton>
            </StyledLink>
            <StyledLink to='/log-in'>
              <LoginButton
                variant="outlined"
                color="secondary"
              >Log In
              </LoginButton>
            </StyledLink>
          </NavButtonContainer>
        </AppBar>
  
        <Route path='/' exact render={props => (
          <HomeContainer>
            <StyledH1>Reporting Dashboard</StyledH1>
            <p>Click the login button to access the reporting area</p>
            <p>Use these details to log in:</p>
            <p>User: admin <br />
               Password: 123456
            </p>
            <img src={logo} className="App-logo" alt="logo" />
          </HomeContainer>
        )}/>
        
        <Route path='/sign-up' render={props => (
          <h1>Signup Form to go here</h1>
        )}/>
        
        <Route path='/log-in' render={props => (
          <React.Fragment>
            <LoginBox />
          </React.Fragment>
        )}/>
        
        <Route path='/dashboard' render={props => (
          <React.Fragment>
            {/*<VisualGraph />*/}
            <DataTable/>
            {/*<DataControlForm/>*/}
          </React.Fragment>
        )}/>
          
          </div>
        </BrowserRouter>
  </div>
  );
  }
}






export default App;
