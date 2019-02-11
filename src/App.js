import React, { Component } from 'react';
import './App.css';
import styled               from "styled-components";
import actions from "./actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// BrowserRouter, Router, Link,
import { Route, Switch, Redirect, withRouter}      from "react-router-dom";
// import {createBrowserHistory} from "history";

import TopNav          from "./components/TopNav";
import AccessForm      from "./components/AccessForm";
import DataSection from "./components/DataSection";

// import {Formik}           from "formik";
// import TextField          from "@material-ui/core/TextField";



// const StyledLink = styled(Link)`
//   && {
//   text-decoration: none;
//   }
// `;

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




class App extends Component {
  constructor(props) {
    super(props);
    
  }

  
  
  componentDidMount() {
  
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
  
  }
  
  render() {
    return (
      <div className="App">
          <div>
            <TopNav />
            <BodyContainer>
            
            
              {/* On Initial Render:
               If there's a user cookie either validate/move userData to store/redirect, or err.
               Else, run the switch to select a single matching route
               */ }
            
              { () => {
                // TODO add the cookie grabbing behavior
                const jwToken = null;
                
                // pass it to dispatchLoadUserData(jwt)
                if (jwToken) {
                  actions.dispatchLoadUserData(jwToken)
                }
                // next if state is updated,
                // donorData
                const {userId, userName} = this.props;
                if (userId && userName) {
                  return <Redirect to='/dashboard' />
                }
              }}
            
            
              {/* This switch should always get hit. Above either fails and chooses the '/' route or succeeds and redirects to the '/dashboard' route */ }
              <Switch>
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
                  <AccessForm
                    outerContainerStyle={ `padding-top : 20vh` }
                    formType='signUp'
                    dispatchUpdateView={this.props.dispatchUpdateView}
                  />
                ) }
                />
                
              
                <Route path='/log-in' render={ props => (
                  <React.Fragment>
                    <AccessForm outerContainerStyle={ `padding-top : 20vh` }
                                formType='logIn'
                                dispatchUpdateView={this.props.dispatchUpdateView}

                    />
                  </React.Fragment>
                ) } />
              </Switch>
              
              <Switch>
                <Route path='/dashboard' exact render={ props => {
                  // const {userId, userName, donorData} = props;
                  // const backEndData = {userId, userName, donorData};

                  return (
                    <React.Fragment>
                      <DataSection
                        dispatchGetDonationData={this.props.dispatchGetDonationData}
                        rawReportData={ this.props.rawReportData }
                        preparedReportData={this.props.preparedReportData}
                        dispatchUpdatePreparedReportData={this.props.dispatchUpdatePreparedReportData}
                      />
                    </React.Fragment>
                  ) }} />
              </Switch>
          
            </BodyContainer>
          </div>
        {/*</Router>*/}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userId             : state.userId,
    userName           : state.userName,
    donationData       : state.donationData,
    view               : state.view,
    rawReportData      : state.rawReportData,
    preparedReportData : state.preparedReportData
  }
};

// type checking saves a lot of time
App.propTypes = {
  userId             : PropTypes.number,
  userName           : PropTypes.string,
  view               : PropTypes.string,
  rawReportData      : PropTypes.arrayOf(PropTypes.shape({
    donationDate: PropTypes.string,
    amountDonated: PropTypes.number.isRequired
  })),
  preparedReportData : PropTypes.arrayOf(PropTypes.shape({
    donationDate: PropTypes.string,
    amountDonated: PropTypes.number.isRequired
  }))
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchLoadUserData : sessionJWToken => dispatch(actions.loadUserData(sessionJWToken)),
    dispatchUpdateView : newView => dispatch(actions.updateView(newView)),
    dispatchGetDonationData : (reportType, recordCount) => dispatch(actions.getDonationData(reportType, recordCount)),
    dispatchUpdatePreparedReportData : updatedData => {
      dispatch(actions.updatePreparedReportData(updatedData))
    }
  }
};


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withRouter(ConnectedApp);
