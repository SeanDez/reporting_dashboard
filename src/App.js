import React, { Component } from 'react';
import './App.css';
import styled               from "styled-components";
import actions from "./actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import { Route, Switch, Redirect, withRouter}      from "react-router-dom";
// import {createBrowserHistory} from "history";

import DataSection from "./components/DataSection";
import Footer from "./components/Footer";

const OuterContainer = styled.div`
  background-color: white;
  //max-width: 760px;
`;

class App extends Component {
  render() {
    return (
      <OuterContainer className="App">
          <Route path='/' exact render={ props => {
            return (
              <React.Fragment>
                <DataSection
                  dispatchGetDonationData={ this.props.dispatchGetDonationData }
                  rawReportData={ this.props.rawReportData }
                  preparedReportData={ this.props.preparedReportData }
                  dispatchUpdatePreparedReportData={ this.props.dispatchUpdatePreparedReportData }
                />
              </React.Fragment>
            );
          } } />
          <Footer styleProp={ {marginTop : "10vh"} } />
      </OuterContainer>
    );
  }
}


const mapStateToProps = state => {
  return {
    donationData       : state.donationData,
    view               : state.view,
    rawReportData      : state.rawReportData,
    preparedReportData : state.preparedReportData
  }
};

// type checking saves a lot of time
App.propTypes = {
  view               : PropTypes.string,
  rawReportData      : PropTypes.arrayOf(PropTypes.shape({
    donationDate: PropTypes.string,
    amountDonated: PropTypes.number
  })),
  preparedReportData : PropTypes.arrayOf(PropTypes.shape({
    donationDate: PropTypes.string,
    amountDonated: PropTypes.number
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
