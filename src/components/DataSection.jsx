import React from "react";
import moment from "moment";
import _ from "lodash";

import LineChart from './LineChart';
import DataTable from "./DataTable";
import DataControlForm from "./DataControlForm";

export default class DataSection extends React.Component {
  
  state = {
    chartData : [
      {x: new Date('01/01/2018'), y: 8},
      {x: new Date('02/01/2018'), y: 5},
      {x: new Date('03/01/2018'), y: 4},
      {x: new Date('04/01/2018'), y: 9},
      {x: new Date('05/01/2018'), y: 1},
      {x: new Date('06/01/2018'), y: 7},
      {x: new Date('07/01/2018'), y: 6},
      {x: new Date('08/01/2018'), y: 3},
      {x: new Date('09/01/2018'), y: 2},
      {x: new Date('10/01/2018'), y: 0}
    ]
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
        // console.log(`=====totalMatchingYAmounts=====`, totalMatchingYAmounts);
        
        return {
          x : yMKey,
          y : totalMatchingYAmounts,
        };
      });
    // console.log(`=====totalledYAmounts=====`, totalledYAmounts);



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
  
  
  flipOrder(data) {
    //
  }
  
  
  componentDidMount() {
    // this.props.genData()
    this.props.dispatchGetDonationData("monthlyTotals", null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reportData !== this.props.reportData) {
      const preparedDataArray = this.prepareData(this.props.reportData, 12, 'month');
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
              // for testing
              // chartData={ this.state.chartData }
            />
          
            < DataTable
              preparedReportData={ this.props.preparedReportData }
            />
            <DataControlForm />
          </div>
        }
      </React.Fragment>
    );
  }
  
}