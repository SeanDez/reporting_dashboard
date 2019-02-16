import React from "react";
import {retrieveTopDonors, updateViewMarker, filterViewableData, prepareData} from "../services/reports";

import LineChart from './LineChart';
import DataTable from "./DataTable";
import DataControlForm from "./DataControlForm";
// import loaderSwitch from "./shared/loaderSwitch";
import CircularProgressUnwrapped from "@material-ui/core/CircularProgress";




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


export default class DataSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      initialFetch : true,
      REPORT_OPTION : 'totals',
      viewMarker : 0,
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
  }
  
  render() {
    return (
      <React.Fragment>
        { this.props.preparedReportData
          ?
          <div>
            <LineChart
              preparedReportData={ this.props.preparedReportData }
              REPORT_OPTION={this.state.REPORT_OPTION}
              // isLoading={this.props.preparedReportData}
            />
          
            <DataTable
              REPORT_OPTION={this.state.REPORT_OPTION}
              preparedReportData={ this.props.preparedReportData }
            />
            <DataControlForm
              dispatchUpdatePreparedReportData={this.props.dispatchUpdatePreparedReportData}
              rawReportData={this.props.rawReportData}
              retrieveTopDonors={this.retrieveTopDonors}
              updateLocalState={this.updateLocalState}
            />
          </div>
          :
          <CircularProgress />
        }
      </React.Fragment>
    );
  }
}