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
  
  
  
  componentDidMount() {
  
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
  
  }
  
  render() {
    return (
      <React.Fragment>
        {
          this.props.chartData && // everything waits on this
          <ChartContainer>
            <h2>{ this.state.chartTitle }</h2>
            <FlexibleXYPlot
              xType="time"
            >
              <HorizontalGridLines strokeWidth={ 1 } />
              <VerticalGridLines />
              <LineSeries
                data={ this.props.chartData }
              />
    
              {/* below disabled until reportData call is fixed */}
              {/* this.props.reportData ? this.prepareData(this.props.reportData, 12, 'months') : null */}
    
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
        }

      </React.Fragment>
    );
  }
  
  
}

