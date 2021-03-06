import React from "react";
import _ from "lodash";
import styled from "styled-components";
import {retrieveTopDonors, updateViewMarker, filterViewableData, retrieveMonthlyTotals, sortXAscendingIfDates} from "../services/reports";

import LineChart from './LineChart';
import DataTable from "./DataTable";
import DataControlForm from "./DataControlForm";
import PrevNextButtonContainer from
"./PrevNextButtonContainer";

import CircularProgressUnwrapped from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";



const CircularProgress = (props) => (
  <div style={{
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    minHeight : '30vh'
  }}>
    <CircularProgressUnwrapped />
  </div>
);

const TableControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
`



export const updateLocalState = (stateKey, stateValue, thisSetState) => {
  thisSetState({
    [stateKey] : stateValue,
  })
};


class DataSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      initialFetch : true,
      REPORT_OPTION : 'totals',
      viewMarker : 0,
      displayedData : []
    };
  }
  
  updateViewMarker = (incrementSize, plusMinusOption) => {
    
    let {viewMarker} = this.state;
    const {preparedReportData} = this.props;
    
    // use an intermediate variable to order operations and do a single setstate at the end
    let tempViewMarker;
    if (plusMinusOption === '-') {
      tempViewMarker = viewMarker - incrementSize
    } else if (plusMinusOption === '+') {
      tempViewMarker = viewMarker + incrementSize
    }
    
    if (tempViewMarker < 0) {
      this.setState({ viewMarker : 0 })
    } else if (tempViewMarker > preparedReportData.length && incrementSize > preparedReportData.length) {
      this.setState({ viewMarker : 0 })
      // no excess increment relative to list size
    } else if (tempViewMarker > preparedReportData.length) {
      this.setState({ viewMarker : preparedReportData.length - incrementSize })
    } else {
      this.setState({ viewMarker : tempViewMarker });
    }
  };
  
  updateReportOption = (option) => {
    // options: totals, topDonors, noRecentDonations
    this.setState({
      REPORT_OPTION : option
    })
  };
  
  
  setDisplayedData = () => {
    if (this.state.REPORT_OPTION === 'totals') {
      this.setState({
        displayedData : filterViewableData(12, this.props, this.state)
      })
    } else if (this.state.REPORT_OPTION === 'topDonors') {
      this.setState({
        displayedData : filterViewableData(10, this.props, this.state)
      }, () => {
      })
    } else if (this.state.REPORT_OPTION === 'noRecentDonations') {
      this.setState({
        displayedData : filterViewableData(15, this.props, this.state)
      })
    }
  };
  
  
  
  componentDidMount() {
    // get the raw data for compiling
    this.props.dispatchGetDonationData("monthlyTotals", null)
  }
  
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('this.props', this.props);
    console.log(this.state, `=====this.state=====`);

    if (prevState.REPORT_OPTION !== this.state.REPORT_OPTION) console.log('REPORT_OPTION updated, now:', this.state.REPORT_OPTION);
    
    // if raw data has been returned / updated
    if (prevProps.rawReportData !== this.props.rawReportData) {
      // if it's the initial fetch then instantly load the preparedData array
      if (this.state.initialFetch === true) {
        const monthlyTotals = retrieveMonthlyTotals(this.props.rawReportData, 12, "month");
        this.props.dispatchUpdatePreparedReportData(monthlyTotals);
        this.setState({initialFetch : false});
    
      }
    }
    // if preparedData has populated or updated
    if (prevProps.preparedReportData !== this.props.preparedReportData && this.props.preparedReportData) {
      // pass 10 or 12 depending on report type
      this.setDisplayedData();
      this.setState({
        viewMarker : 0
      })
    }
    
    // if viewMarker has updated
    if (prevState.viewMarker !== this.state.viewMarker) {
      this.setDisplayedData()
    }
  }
  

  render() {
    return (
      <React.Fragment>
        {/* if displayedData array is present */ }
        { _.isEmpty(this.state.displayedData) === false
          && _.isEmpty(this.props.preparedReportData) === false
          ?
          <div>
            <LineChart
              // dated X axes should always sort ascending
              preparedReportData={ this.props.preparedReportData }
              REPORT_OPTION={ this.state.REPORT_OPTION }
              displayedData={ this.state.displayedData }
            />
        
        
            <PrevNextButtonContainer
              REPORT_OPTION={ this.state.REPORT_OPTION }
              viewMarker={ this.state.viewMarker }
              preparedReportData={ this.props.preparedReportData }
              updateViewMarker={ this.updateViewMarker }
              style={ {marginTop : "3vh"} }
            />
        
            <TableControlsContainer>
              <DataTable
                REPORT_OPTION={ this.state.REPORT_OPTION }
                displayedData={ this.state.displayedData }
              />
              <DataControlForm
                dispatchUpdatePreparedReportData={ this.props.dispatchUpdatePreparedReportData }
                REPORT_OPTION={ this.props.REPORT_OPTION }
                rawReportData={ this.props.rawReportData }
                retrieveTopDonors={ retrieveTopDonors }
                updateLocalState={ updateLocalState }
                setState={ this.setState }
                updateReportOption={ this.updateReportOption }
              />
            </TableControlsContainer>
          </div>
          :
          <div style={ {height : "90vh"} }>
            <CircularProgress />
          </div>
        }
      </React.Fragment>
    );
  }
}

export default (DataSection);