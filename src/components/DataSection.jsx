import React from "react";
import _ from "lodash";
import {retrieveTopDonors, updateViewMarker, filterViewableData, prepareData, sortXAscendingIfDates} from "../services/reports";

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
  
  
  componentDidMount() {
    // get the raw data for compiling
    this.props.dispatchGetDonationData("monthlyTotals", null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    
    // if the raw data has been returned
    if (prevProps.rawReportData !== this.props.rawReportData) {
      console.log(`=====rawReportData=====`, this.props.rawReportData);
      
      if (this.state.initialFetch === true) {
        const preparedDataArray = prepareData(this.props.rawReportData, 12, 'month');
        this.props.dispatchUpdatePreparedReportData(preparedDataArray);
        this.setState({ initialFetch : false })
        
      }
      
      // else if (!this.state.initialFetch && this.state.REPORT_OPTION === 'topDonors') {
      //   const topDonorData = this.retrieveTopDonors(this.props.rawReportData);
      //   this.props.dispatchUpdatePreparedReportData(topDonorData);
      //   this.setState({ REPORT_OPTION : 'topDonors' })
      //
      // } else if (!this.state.REPORT_OPTION && this.state.REPORT_OPTION === 'noneForPeriod') {
      //   // todo build the noneForPeriod dispatcher
      //
      // }
    }
    
    if (prevProps.preparedReportData !== this.props.preparedReportData) {
      
      // show 10 or 12 results
      this.state.REPORT_OPTION === 'totals'
      ?
      this.setState({ displayedData : filterViewableData(12, this.props, this.state) })
      :
      this.setState({ displayedData : filterViewableData(10, this.props, this.state) })
    }
    
  }
  
  render() {
    
    const marker = this.state.viewMarker;
  
    return (
      <React.Fragment>
        {/* if displayedData array is present */ }
        { _.isEmpty(this.state.displayedData) === false
          ?
          <div>
            { console.log(this.state.displayedData) }
            <LineChart
              // dated X axes should always sort ascending
              preparedReportData={ sortXAscendingIfDates(this.state.displayedData) }
              REPORT_OPTION={ this.state.REPORT_OPTION }
              // isLoading={this.props.preparedReportData}
            />
        
            
            <PrevNextButtonContainer
              REPORT_OPTION={this.state.REPORT_OPTION}
              viewMarker={this.state.viewMarker}
            />
            
        
            <DataTable
              REPORT_OPTION={ this.state.REPORT_OPTION }
              preparedReportData={ this.state.displayedData }
            />
            <DataControlForm
              dispatchUpdatePreparedReportData={ this.props.dispatchUpdatePreparedReportData }
              rawReportData={ this.props.rawReportData }
              retrieveTopDonors={ this.retrieveTopDonors }
              updateLocalState={ this.updateLocalState }
            />
          </div>
          :
          <CircularProgress />
        }
      </React.Fragment>
    );
  }
}

export default (DataSection);