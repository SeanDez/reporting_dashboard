import React from "react";
import "../App.css";
import "../../node_modules/react-vis/dist/style.css";
import {FlexibleXYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries,
  VerticalBarSeriesCanvas, XYPlot
} from "react-vis";
import styled from "styled-components";
// import moment from "moment";



const CHART_TITLES = Object.freeze({
  totals        : "Total Donations",
  topDonors     : "Highest Paying Donors",
  noRecentDonations : "No Recent Donations",
});


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


const formatDollarTicks = (dataValue, index, scale, tickTotal) => {
  return `$${ dataValue.toLocaleString() }`;
  
};

const abbreviateMonths = dateObject => {
  if (dateObject.toString().slice(4, 7) === "Jan") {
    return `${ dateObject.toString().slice(11, 15) }`;
  } else {
    const slicedMonthString = dateObject.toString().slice(4, 7);
    return slicedMonthString;
  }
};


const renderChart = (props) => {
  if (props.REPORT_OPTION === 'totals') {
    return (
      <React.Fragment>
        
        {/*<FlexibleXYPlot*/}
          {/*xType="time"*/}
        {/*>*/}
          <XYPlot
            // margin={{}}
            width={500}
            height={300}
            xType='time'
          >
          <HorizontalGridLines strokeWidth={ 1 } />
          <VerticalGridLines />
          <LineSeries
            data={ props.displayedData }
          />
    
          <XAxis
            // title={ props.XAxisLabel }
            position='middle'
            tickSize={ 2 }
            tickFormat={ abbreviateMonths }
            style={ {
              text  : {fill : "black"},
              ticks : {fill : "#000"},
              title : {fill : "black"},
            } }
          />
          <YAxis
            // title={ props.YAxisLabel }
            position='middle'
            tickFormat={ formatDollarTicks }
            style={ {
              text  : {fill : "black"},
              ticks : {fill : "#000"},
              title : {fill : "black"},
            } }
          />
          </XYPlot>
        {/*</FlexibleXYPlot>*/}
        
      </React.Fragment>
    )
  } else if (props.REPORT_OPTION === 'topDonors') {
    return <React.Fragment>
      <XYPlot
        width={500}
        height={300}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis
          title='Donor Name'
          position='middle'
          tickSize={2}
          style={{
            text : { fill : 'black' },
            ticks : { fill : 'black' },
            title : { fill : '#333' }
          }}
        />
        <YAxis
          title='Total Donated'
          style={{
            text : { fill : 'black' },
            ticks : { fill : 'black' },
            title : { fill : '#444' }
          }}
        />
        <VerticalBarSeries
          data={props.displayedData}
        />
      </XYPlot>
    </React.Fragment>
  } else if (props.REPORT_OPTION === 'noRecentDonations') {
    return <React.Fragment>
      <XYPlot
        width={ 500 }
        height={ 300 }
        yType='time'
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis
          // title='Donor Name'
          position='middle'
          tickSize={ 2 }
          style={ {
            text  : {fill : "black"},
            ticks : {fill : "black"},
            title : {fill : "#333"},
          } }
        />
        <YAxis
          title='Last Donation'
          style={ {
            text  : {fill : "black"},
            ticks : {fill : "black"},
            title : {fill : "#444"},
          } }
        />
        <VerticalBarSeries
          data={ props.displayedData }
        />
      </XYPlot>
    </React.Fragment>;
  }
};





export default (props) => {
  
  return (
    <React.Fragment>
        <ChartContainer>
          <h2>{ CHART_TITLES[props.REPORT_OPTION] }</h2>
          <div>
            { renderChart(props) }
          </div>
        </ChartContainer>
    </React.Fragment>
  );
};





































