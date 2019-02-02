import React from "react";
import "../App.css";
import "../../node_modules/react-vis/dist/style.css";
import {FlexibleXYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from "react-vis";
import styled from "styled-components";

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
      return `${dateObject.toString().slice(4, 7)}${<br />}${dateObject.toString().slice(11, 15)}`
    } else {
      const slicedMonthString = dateObject.toString().slice(4, 7);
      return slicedMonthString;
    }
  };
  
  prepareData = (rawData, numberOfPeriods, periodType) => {
    const
      formattedData  = this.formatData(rawData), // change into x/y. not needed yet. literally just returns right now
      filteredData     = this.filterData(formattedData, 12, 'months'); // last twelve months
      // sortedData     = this.sortData(filteredData);
    
    filteredData.sort(); // most recent last
    const aggregatedData = this.aggregateData(sortedData);
    
    return aggregatedData;
  };
  
  componentDidMount() {
    this.props.dispatchGetDonationData(null, null)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reportData !== this.props.reportData) {

    }
    // console.log(snapshot)
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
              data={ this.props.reportData }
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
              } }
            />
            <YAxis
              title={ this.state.YAxisLabel }
              position='middle'
              // tickValues={[]}
              tickFormat={ this.formatDollarTicks }
              style={ {
                text  : {fill : "black"},
                ticks : {fill : "#000"},
                title : {fill : "black"},
              } }
            />
          </FlexibleXYPlot>
        </ChartContainer>
      </React.Fragment>
    );
  }
  
  formatData(rawData) {
    return rawData
  }
  
  filterData(dataArray, periods, periodType) {
      // first char. Single char m OR M. stop after 1 global match
    if ( periodType.match(/^[mM]/g)) {
      // access the key with the date objects
      // [{x : date, y : number}]
      const filteredArray = dataArray.filter((record, index) => {
        const testDate = moment(record.x);
        const dateBoundary = moment().subtract(periods, periodType);
        return testDate > dateBoundary ? record : null;
      });
      return filteredArray;
    }
  }
  
  sortData = (dataArray) => {
    // [{x : dateObject, y : number }, ...]
    
  }
}
