import React from "react";
import "../App.css";
import "../../node_modules/react-vis/dist/style.css";
import {FlexibleXYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from "react-vis";
import styled from "styled-components";
import moment from "moment";

const ChartContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width : 85%;
  justify-content: center;
  align-items: center;
  height : 50vh;
  margin: 62px auto 0 auto;
  padding-top: 20px;
  //border: 2px dotted lightgreen;
`;

export default class LineChart extends React.Component {
  
  state = {
    chartTitle : 'Total Donations',
    XAxisLabel : '',
    YAxisLabel : '',
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

  formatDollarTicks = (dataValue, index, scale, tickTotal) => {
    return `$${dataValue}`
  };
  
  abbreviateMonths = dateObject => {
    if (dateObject.toString().slice(4, 7) === 'Jan') {
      return `${dateObject.toString().slice(11, 15)}`
    } else {
      const slicedMonthString = dateObject.toString().slice(4, 7);
      return slicedMonthString;
    }
  };
  
  prepareData = (rawData, periodsBack, periodType) => {
    const formattedData  = this.formatData(rawData); // change into x/y. not needed yet. literally just returns right now
  
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
    this.props.dispatchGetDonationData(null, null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reportData !== this.props.reportData) {
      console.log(this.props.reportData)
    }
    // console.log(prevProps)
  }
  
  render() {
    return (
      <React.Fragment>
        <ChartContainer>
          <h2>{ this.state.chartTitle }</h2>
          <FlexibleXYPlot
            xType="time"
          >
            <HorizontalGridLines strokeWidth={ 1 } />
            <VerticalGridLines />
            <LineSeries
              data={this.props.reportData ? this.prepareData(this.props.reportData, 12, 'months') : null }
            />
            <XAxis
              title={ this.state.XAxisLabel }
              position='middle'
              tickSize={ 2 }
              tickFormat={ this.abbreviateMonths }
              style={ {
                text  : {fill : "black"},
                ticks : {fill : "#000"},
                title : {fill : "black"},
              }}
            />
            <YAxis
              title={ this.state.YAxisLabel }
              position='middle'
              tickFormat={ this.formatDollarTicks }
              style={ {
                text  : {fill : "black"},
                ticks : {fill : "#000"},
                title : {fill : "black"},
              }}
            />
          </FlexibleXYPlot>
        </ChartContainer>
      </React.Fragment>
    );
  }
  
  formatData(rawData) {
    return rawData
  }
  
  filterData(dataArray, periodsBack, periodType) {
    
      // first char. Single char m OR M. stop after 1 global match
    if ( periodType.match(/^[mM]/g)) {
      // access the key with the date objects
      // [{x : date, y : number}]
  
      const dateBoundary = moment().subtract(periodsBack, periodType);
  
      const filteredArray = dataArray.filter((record, index) => {
        // console.log(`record.x: ${record.x}`);
        const testDate = moment(record.x, 'MM/DD/YYYY');
        // console.log(`testDate: ${testDate}`);
        return testDate > dateBoundary ? record : null;
      });
      console.log('filteredArray end')
      console.log(filteredArray)
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
    // console.log('sortedArray');
    // console.log(sortedArray);
    return sortedArray;
  }
  
  aggregateData = (dataArray, periods) => {
    const aggregatedTotals = {};
    
    dataArray.map(xyRecord => {
      const yearMonthString = new moment(xyRecord.x, 'MM/DD/YYYY').format('YYYY-MM');
      // console.log('yearMonthString')
      // console.log(yearMonthString)
      if (! aggregatedTotals [yearMonthString]) {
        aggregatedTotals [yearMonthString] = 0;
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
    // console.log('convertedDatesArray')
    // console.log(convertedDatesArray)
    return convertedDatesArray
  }
  
  
  
  
  
  
  
}

