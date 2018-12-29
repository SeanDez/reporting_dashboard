import React, { Component } from 'react';
// import logo                 from './logo.svg';
import './App.css';
import styled               from "styled-components";
import {BrowserRouter, Route, Link}      from "react-router-dom";

import TopNav from "./components/TopNav";
import LoginBox from "./components/LoginBox";
import DataTable from "./components/DataTable";
import DataControlForm from "./components/DataControlForm";

const StyledLink = styled(Link)`
  && {
  text-decoration: none;
  }
`;



const StyledH1 = styled.h2`
  color: purple;
`;

const HomeContainer = styled.div`
  && {
  background-color: #777;
  }
`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
        <TopNav/>
        
        <Route path='/' exact render={props => (
          <HomeContainer id='home-container'>
            <StyledH1>Reporting Dashboard</StyledH1>
            <p>Click the login button to access the reporting area</p>
            <p>Use these details to log in:</p>
            <p>User: admin <br />
               Password: 123456
            </p>
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
            <DataTable />
            <DataControlForm/>
          </React.Fragment>
        )}/>
          
          </div>
        </BrowserRouter>
  </div>
  );
  }
}


export default App;
