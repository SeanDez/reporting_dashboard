import React from "react";
import "../App.css";
import "../../node_modules/react-vis/dist/style.css";
import {FlexibleXYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries,
  VerticalBarSeriesCanvas, XYPlot
} from "react-vis";
import styled from "styled-components";
// import moment from "moment";









const myDATA = [
  {id: '00036', y: 200400, x: 1504121437},
  {id: '00036', y: 200350, x: 1504121156},
  {id: '00036', y: 200310, x: 1504120874},
  {id: '00036', y: 200260, x: 1504120590},
  {id: '00036', y: 200210, x: 1504120306},
  {id: '00036', y: 200160, x: 1504120024},
  {id: '00036', y: 200120, x: 1504119740},
  {id: '00036', y: 200070, x: 1504119458},
  {id: '00036', y: 200020, x: 1504119177},
  {id: '00036', y: 199980, x: 1504118893},
  {id: '00036', y: 199930, x: 1504118611},
  {id: '00036', y: 199880, x: 1504118330},
  {id: '00036', y: 199830, x: 1504118048},
  {id: '00036', y: 199790, x: 1504117763},
  {id: '00036', y: 199740, x: 1504117481}
];

const yDomain = myDATA.reduce(
  (res, row) => {
    return {
      max: Math.max(res.max, row.y),
      min: Math.min(res.min, row.y)
    };
  },
  {max: -Infinity, min: Infinity}
);

class Example extends React.Component {
  state = {
    useCanvas: false
  };
  
  render() {
    return (
      <div>
        <XYPlot
          // margin={{left: 75}}
          // xType="time"
          width={300}
          height={300}
          yDomain={[yDomain.min, yDomain.max]}
        >
          <VerticalBarSeries
            className="vertical-bar-series-example" data={myDATA} />
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    );
  }
}













const CHART_TITLES = Object.freeze({
  totals        : "Total Donations",
  topDonors     : "Highest Paying Donors",
  noneForPeriod : "No Recent Donations",
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

const dummyData = [
  {x : 'Joe', y : 12}, {x : 'John', y : 8}, {x : 'Terry', y : 3}, {x : 'Brock', y : 5}, {x : 'Fabian', y : 7}, {x : 'Mike', y : 6},
]

const dummyData2 = [{x : 1, y : 4}, {x : 2, y : 4}, {x : 3, y : 4}, {x : 4, y : 4}, {x : 5, y : 4}, {x : 6, y : 4}, ]

const renderChart = (props) => {
  if (props.REPORT_OPTION === 'totals') {
    console.log(props.preparedReportData, `=====props.preparedReportData=====`);
    console.log(props.displayedData, `=====props.displayedData=====`);
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





































