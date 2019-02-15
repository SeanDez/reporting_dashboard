import React from "react";
import moment from "moment";
import _ from "lodash";

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


export const filterViewableData = (incrementSize, props, state) => {
  const {preparedReportData} = props;
  
  return preparedReportData.filter((record, index) =>
    index >= state.viewMarker &&
    index < state.viewMarker + incrementSize);
};

export const updateViewMarker = (incrementSize, plusMinusOption, props, state, setState) => {
  
  let {viewMarker} = state;
  const {preparedReportData} = props;
  
  // use an intermediate variable to order operations and do a single setstate at the end
  let tempViewMarker;
  if (plusMinusOption === '-') {
    tempViewMarker = viewMarker - incrementSize
  } else if (plusMinusOption === '+') {
    tempViewMarker = viewMarker + incrementSize
  }
  
  if (tempViewMarker < 0) {
    setState({ viewMarker : 0 })
  } else if (tempViewMarker > preparedReportData.length && incrementSize > preparedReportData.length) {
    setState({ viewMarker : 0 })
    // no excess increment relative to list size
  } else if (tempViewMarker > preparedReportData.length) {
    setState({ viewMarker : preparedReportData.length - incrementSize })
  } else {
    setState({ viewMarker : tempViewMarker });
  }
};


export const prepareData = (rawData) => {
  // remap objects into x/y pairs
  const xYFormattedObjects = rawData.map(record => {
    return {
      x : record.donationDate,
      y : record.amountDonated
    }
  });
  
  // filter 12 months back
  const dateBoundary = moment().subtract(12, 'month');
  
  const filteredArray = xYFormattedObjects.filter(record => {
    const testDate = moment(record.x);
    return testDate > dateBoundary && record // : null;
  });
  
  // create an array with all the month/year keys
  const yearMonthKeys = [];
  filteredArray.forEach(record => {
    const recordYearMonthKey = moment(record.x)
      .format('YYYY-MM');
    if (yearMonthKeys.indexOf(recordYearMonthKey) < 0) {
      yearMonthKeys.push(recordYearMonthKey)
    }
  });
  
  // create a totalled array with all the y values summed
  const totalledYAmounts = yearMonthKeys
    .map(yMKey => {
      const totalMatchingYAmounts = _.sumBy(filteredArray, record => {
        // create a matcher
        const recordYearMonthKey =
                moment(record.x).format("YYYY-MM");
        // add all matching k/v values
        if (recordYearMonthKey === yMKey) {
          // console.log(`=====record.y=====`, record.y);
          return record.y;
        }
      });
      return {
        x : yMKey,
        y : totalMatchingYAmounts,
      };
    });
  
  // convert months back to date objects
  const convertedDatesArray = totalledYAmounts.map(record => {
    const dateObject = new moment(record.x, 'YYYY-MM').toDate();
    return {
      x : dateObject,
      y : record.y
    }
  });
  return convertedDatesArray
};


export const retrieveTopDonors = (rawData) => {
  // total by id
  // first group by id
  const groupedObjectWithIdKeys = _.groupBy(rawData, 'id');
  // undefined. The array itself doesn't have an id property
  
  // map over each id key and sum it
  const totalledList = _.map(groupedObjectWithIdKeys, idArray => {
    // clone one of the objects and then replace its donation amount by the sum of all of them. assign x/y values
    const clonedFirstObject = Object.assign({}, idArray[0]);
    const totalDonationAmount = _.sumBy(idArray, record => record.amountDonated);
    clonedFirstObject.amountDonated = totalDonationAmount;
    clonedFirstObject.x = `${clonedFirstObject.firstName} ${clonedFirstObject.lastName}`;
    clonedFirstObject.y = totalDonationAmount;
    return clonedFirstObject;
    // at this point totalledList is consolidated to one object per id. Every recorded donation is summed
  });
  
  // sort descending
  const sortedList = totalledList.sort((a, b) => {
    // if it's positive b first. If negative a first
    return b.amountDonated - a.amountDonated
  });
  
  // return the sorted list
  return sortedList;
};


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