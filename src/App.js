import React, { Component } from 'react';
// import logo                 from './logo.svg';
import './App.css';
import styled               from "styled-components";
import {BrowserRouter, Route, Link}      from "react-router-dom";

import TopNav from "./components/TopNav";
import LoginBox from "./components/LoginBox";
import DataTable from "./components/DataTable";
import DataControlForm from "./components/DataControlForm";
import LineChart from "./components/LineChart";

const StyledLink = styled(Link)`
  && {
  text-decoration: none;
  }
`;



const StyledH1 = styled.h2`
  color: purple;
`;

const BodyContainer = styled.div`
  && {
  margin-top: 122px;
  }
`;

const HomeTextInstructions = styled.div`
  max-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px dotted slateblue;
  border-radius: 3%;
  margin: 0 auto 0 auto;
`;




class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <TopNav />
            <BodyContainer>
              <Route path='/' exact render={ props => (
                <HomeTextInstructions>
                  <StyledH1>Reporting Dashboard</StyledH1>
                  <p>Click the login button on the top right, to access the reporting area</p>
                  <p>Use these details to log in:</p>
                
                  <p style={ {marginBottom : 0} }>User Name: <span style={ {color : "wheat"} }>admin</span></p>
                  <p style={ {marginTop : 0} }>Password: <span style={ {color : "wheat"} }>123456</span></p>
              
                </HomeTextInstructions>
              ) } />
            
              <Route path='/sign-up' render={ props => (
                <h1>Signup Form to go here</h1>
              ) } />
            
              <Route path='/log-in' render={ props => (
                <React.Fragment>
                  <LoginBox />
                </React.Fragment>
              ) } />
            
              <Route path='/dashboard' render={ props => (
                <React.Fragment>
                  <LineChart />
                  {/*<VisualGraph />*/ }
                  <DataTable />
                  <DataControlForm />
                </React.Fragment>
              ) } />
            </BodyContainer>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
