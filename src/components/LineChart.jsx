import React from "react";
import "../App.css";
import "../../node_modules/react-vis/dist/style.css";
import {FlexibleXYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from "react-vis";
import styled from "styled-components";
// import moment from "moment";

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



export default (props) => {
  
  const CHART_TITLES = {
    totals        : "Total Donations",
    topDonors     : "Highest Paying Donors",
    noneForPeriod : "No Recent Donations",
  };
  
  
  
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
  
  
  
  
  return (
    <React.Fragment>
      { props.preparedReportData && // everything waits on this
        <ChartContainer>
          <h2>{ CHART_TITLES[props.REPORT_OPTION] }</h2>
          <FlexibleXYPlot
            xType="time"
          >
            <HorizontalGridLines strokeWidth={ 1 } />
            <VerticalGridLines />
            <LineSeries
              data={ props.preparedReportData }
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
          </FlexibleXYPlot>
        </ChartContainer>
      }
    </React.Fragment>
  );
};

