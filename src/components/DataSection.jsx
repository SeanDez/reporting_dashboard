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
  console.log(tempViewMarker, `=====tempViewMarker=====`);
  
  if (tempViewMarker < 0) {
    setState({ viewMarker : 0 })
  } else if (tempViewMarker > preparedReportData.length && incrementSize > preparedReportData.length) {
    setState({ viewMarker : 0 })
    // no excess increment relative to list size
  } else if (tempViewMarker > preparedReportData.length) {
    setState({ viewMarker : preparedReportData.length - incrementSize })
  } else {
    console.log(`=====triggered=====`);
    setState({ viewMarker : tempViewMarker });
  }
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
  
  updateLocalState = (stateKey, stateValue) => {
    this.setState({
      [stateKey] : stateValue,
    })
  };
  
  
  
  formatInputData(rawData) {
    // remap objects into x/y pairs
    const xYFormattedObjects = rawData.map(record => {
      return {
        x : record.donationDate,
        y : record.amountDonated
      }
    });
    
    // transform x's date objects into date strings
    const formattedXDates = xYFormattedObjects.map(record => {
      if (record.x instanceof Date) {
        record.x = moment(record.x)
          .subtract(7, 'hours')
          .format('YYYY-MM-DDTHH:00:00.000')
          .concat('Z')
        return record;
      } else if (typeof record.x === "string") {
        return record
      }
    });
    return formattedXDates
  }
  
  
  filterData(dataArray, periodsBack, periodType) {
    // first char. Single char m OR M. stop after 1 global match
    if ( periodType.match(/^[mM]/g)) {
      
      const dateBoundary = moment().subtract(periodsBack, periodType);
      
      const filteredArray = dataArray.filter((record, index) => {
        const testDate = moment(record.x);
        return testDate > dateBoundary ? record : null;
      });
      return filteredArray;
    }
  }
  
  
  sortData(dataArray) {
    // expects [{ x : stringDate, y : number } ...]
    const sortedArray = dataArray.sort((a, b) => {
      const dateObjectA = new Date(a.x);
      const dateObjectB = new Date(b.x);
      return dateObjectA - dateObjectB;
    });
    return sortedArray;
  }
  
  
  aggregateData = (dataArray) => {
    // create an array with all the month/year keys
    const yearMonthKeys = [];
    dataArray.map(record => {
      const recordYearMonthKey = new moment(record.x)
        .format('YYYY-MM');
      if ((yearMonthKeys.indexOf(recordYearMonthKey)) < 0) {
        yearMonthKeys.push(recordYearMonthKey)
      }
    });
  
    
    
    // create a totalled array with all the y values summed

    const totalledYAmounts = yearMonthKeys
      .map(yMKey => {
        
        const totalMatchingYAmounts = _.sumBy(dataArray, record => {
          // create a matcher
          const recordYearMonthKey = moment(record.x)
            .format("YYYY-MM");
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

    return totalledYAmounts;
  };
  
  
  convertToDateObjects(dataArray) {
    const convertedDatesArray = dataArray.map(record => {
      
      const dateObject = new moment(record.x, 'YYYY-MM').toDate();
      return {
        x : dateObject,
        y : record.y
      }
    });
    return convertedDatesArray
  }
  
  
  prepareData = (rawData, periodsBack, periodType) => {
    const formattedData  = this.formatInputData(rawData);
    const filteredData     = this.filterData(formattedData, periodsBack, periodType); // last twelve months
    const sortedData     = this.sortData(filteredData);
    // sort and aggregate
    const aggregatedData = this.aggregateData(sortedData);
    const convertedToDateObjects = this.convertToDateObjects(aggregatedData);
    return convertedToDateObjects
  };
  
  retrieveTopDonors (rawData) {
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
  
  
  
  componentDidMount() {
    // get the raw data for compiling
    this.props.dispatchGetDonationData("monthlyTotals", null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.props.preparedReportData, `=====this.props.preparedReportData=====`);
    
    // if the raw data has been returned
    if (prevProps.rawReportData !== this.props.rawReportData) {
      console.log(`=====rawReportData=====`, this.props.rawReportData);
      
      if (this.state.initialFetch === true) {
        const preparedDataArray = this.prepareData(this.props.rawReportData, 12, 'month');
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