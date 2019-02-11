import React from "react";
import moment from "moment";
import _ from "lodash";

import LineChartUnwrapped from './LineChart';
import DataTableUnwrapped from "./DataTable";
import DataControlForm from "./DataControlForm";
import loaderSwitch from "./shared/loaderSwitch";

// add wrappers
const LineChart = loaderSwitch(LineChartUnwrapped);
const DataTable = loaderSwitch(DataTableUnwrapped);



export default class DataSection extends React.Component {
  
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
  
  
  
  componentDidMount() {
    this.props.dispatchGetDonationData("monthlyTotals", null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.rawReportData !== this.props.rawReportData) {
      console.log(`=====rawReportData=====`, this.props.rawReportData);
      const preparedDataArray = this.prepareData(this.props.rawReportData, 12, 'month');
      this.props.dispatchUpdatePreparedReportData(preparedDataArray);
    }
    if (prevProps.preparedReportData !== this.props.preparedReportData) {
    }
  }
  
  render() {
    return (
      <React.Fragment>
        { this.props.preparedReportData &&
          // todo: ternary with false: loader
          <div>
            <LineChart
              preparedReportData={ this.props.preparedReportData }
              isLoading={true}
            />
          
            <DataTable
              preparedReportData={ this.props.preparedReportData }
            />
            <DataControlForm />
          </div>
        }
      </React.Fragment>
    );
  }
  
}