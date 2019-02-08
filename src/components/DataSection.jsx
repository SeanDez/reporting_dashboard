import React from "react";
import moment from "moment";

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
    console.log("rawData 0");
    console.log(rawData[0]);
  
  
    // remap objects into x/y pairs
    const xYFormattedObjects = rawData.map(record => {
      return {
        x : record.donationDate,
        y : record.amountDonated
      }
    });
    console.log("xYFormattedObjects[0]");
    console.log(xYFormattedObjects[0]);
    
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
    console.log("formattedXDates");
    console.log(formattedXDates);
    return formattedXDates
  }
  
  
  filterData(dataArray, periodsBack, periodType) {
    console.log("filterData dataArray[0]")
    console.log(dataArray[0])
    
    // first char. Single char m OR M. stop after 1 global match
    if ( periodType.match(/^[mM]/g)) {
      // access the key with the date objects
      // [{x : date, y : number}]
      
      const dateBoundary = moment().subtract(periodsBack, periodType);
      
      const filteredArray = dataArray.filter((record, index) => {
        const testDate = moment(record.x);
        return testDate > dateBoundary ? record : null;
      });
      // console.log('filteredArray[0]');
      // console.log(filteredArray[0]);
      return filteredArray;
    }
  }
  
  
  sortData(dataArray) {
    // { x : stringDate, y : number }
    const sortedArray = dataArray.sort((a, b) => {
      const dateObjectA = new Date(a.x);
      const dateObjectB = new Date(b.x);
      return dateObjectA - dateObjectB;
    });
    console.log('sortedArray[0]');
    console.log(sortedArray[0]);
    return sortedArray;
  }
  
  
  aggregateData = (dataArray, periods) => {
    console.log("aggregateData dataArray[0]");
    console.log(dataArray[0]);
    
    const aggregatedTotals = {};
    
    dataArray.map(xyRecord => {
      const yearMonthString = new moment(xyRecord.x).format('YYYY-MM');
      if (! aggregatedTotals[yearMonthString]) {
        aggregatedTotals[yearMonthString] = 0;
      }
      aggregatedTotals[yearMonthString] += xyRecord.y;
    });
    
    const yearMonthArray = Object.keys(aggregatedTotals);
    
    const aggregatedXY  = yearMonthArray.map(keyName => {
      return {
        x : keyName,
        y : aggregatedTotals[keyName]
      }
    });
    console.log('aggregatedXY');
    console.log(aggregatedXY);
    return aggregatedXY;
  };
  
  
  convertToDateObjects(dataArray) {
    const convertedDatesArray = dataArray.map(record => {
      
      const dateObject = new moment(record.x, 'YYYY-MM').toDate();
      return {
        x : dateObject,
        y : record.y
      }
    });
    console.log('convertedDatesArray[0]');
    console.log(convertedDatesArray[0]);
    return convertedDatesArray
  }
  
  
  prepareData = (rawData, periodsBack, periodType) => {
    const formattedData  = this.formatInputData(rawData); // change into x/y. not needed yet. literally just returns right now
    
    const filteredData     = this.filterData(formattedData, periodsBack, periodType); // last twelve months
    // console.log('filteredData pp');
    // console.log(filteredData pp);
    
    const sortedData     = this.sortData(filteredData);
    
    // sort and aggregate
    const aggregatedData = this.aggregateData(sortedData);
    
    const convertedToDateObjects = this.convertToDateObjects(aggregatedData);
    
    return convertedToDateObjects;
  };
  
  
  componentDidMount() {
    // this.props.genData()
    this.props.dispatchGetDonationData("monthlyTotals", null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reportData !== this.props.reportData) {
      console.log('this.props.reportData')
      console.log(this.props.reportData)
      console.log('this.props.prepareData')
      console.log(this.prepareData(this.props.reportData, 12, 'month'))
    }
  }
  
  render() {
    return (
    <React.Fragment>
      <LineChart
        chartData={ this.state.chartData }
      />
  
      <DataTable
        backEndData={'placeholder'}
      />
      {/*reportData={this.props.reportData.x}*/}
      <DataControlForm  />
    </React.Fragment>
    )}
}