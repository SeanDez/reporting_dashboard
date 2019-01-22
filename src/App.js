import React, { Component } from 'react';
import './App.css';
import styled               from "styled-components";
import {BrowserRouter, Route, Link, Switch}      from "react-router-dom";

import TopNav          from "./components/TopNav";
import DataTable       from "./components/DataTable";
import DataControlForm from "./components/DataControlForm";
import LineChart       from "./components/LineChart";
import AccessForm      from "./components/AccessForm";

import {Formik}  from "formik";
import TextField  from "@material-ui/core/TextField";

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
  margin-top: 62px;
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


const BasicExample = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: 'jared', test: 'test5' }}
      onSubmit={(values, actions) => {
        // setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        // }, 1000);
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
            name="name"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
  
          <TextField
            required
            label='test'
            name='test'
            margin="normal"
            onChange={ props.handleChange }
            onBlur={ props.handleBlur }
            value={ props.values.test }
          />
          
          <button type="submit">Submit</button>
        </form>
      )}
    />
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <TopNav />
            <BodyContainer>
            
              {/* Switches force RR to select first matching route. Anything else selects all matching */}
              <Switch>
                <Route path='/' exact render={ props => (
                  <HomeTextInstructions>
                    <StyledH1>Reporting Dashboard</StyledH1>
                    <p>Click the login button on the top right, to access the reporting area</p>
                    <p>Use these details to log in:</p>
                  
                    <p style={ {marginBottom : 0} }>User Name: <span style={ {color : "wheat"} }>admin</span></p>
                    <p style={ {marginTop : 0} }>Password: <span style={ {color : "wheat"} }>123456</span></p>
                    <BasicExample />
                  </HomeTextInstructions>
                ) } />
              
                <Route path='/sign-up' render={ props => (
                  <AccessForm
                    outerContainerStyle={ `padding-top : 20vh` }
                    formType='signUp'
                  />
                ) }
                />
              
              
                <Route path='/log-in' render={ props => (
                  <React.Fragment>
                    <AccessForm outerContainerStyle={ `padding-top : 20vh` }
                                formType='logIn'
                    />
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
              </Switch>
            </BodyContainer>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
