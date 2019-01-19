import React                                        from "react";
import '../App.css'
import '../../node_modules/react-vis/dist/style.css'
import { FlexibleXYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from "react-vis";
import styled                                       from "styled-components";
import AppBar                                       from "./TopNav";

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

  formatDollarTicks(dataValue, index, scale, tickTotal) {
    return `$${dataValue}`
  }
  
  render() {
    return (
      <React.Fragment>
        <ChartContainer>
          <h2>{this.state.chartTitle}</h2>
          <FlexibleXYPlot
            xType="time"
          >
            <HorizontalGridLines strokeWidth={1} />
            <VerticalGridLines />
            <LineSeries data={this.state.chartData}/>
            <XAxis title={this.state.XAxisLabel} position='middle' tickSize={2} />
            <YAxis
              title={this.state.YAxisLabel}
              position='middle'
              // tickValues={[]}
              tickFormat={this.formatDollarTicks}
            />
          </FlexibleXYPlot>
        </ChartContainer>
      </React.Fragment>
    )
  }
}
