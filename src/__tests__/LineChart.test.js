const LineChart = require("../components/LineChart").default;
const lineChart = new LineChart();

let chartData; // no real reason to do this other than testing scoping

beforeEach(() => {
  // initialize database
  
  chartData = [
    {x : new Date("01/01/2018"), y : 8},
    {x : new Date("02/01/2018"), y : 5},
    {x : new Date("03/01/2018"), y : 4},
    {x : new Date("04/01/2018"), y : 9},
    {x : new Date("05/01/2018"), y : 1},
    {x : new Date("06/01/2018"), y : 7},
    {x : new Date("07/01/2018"), y : 6},
    {x : new Date("08/01/2018"), y : 3},
    {x : new Date("09/01/2018"), y : 2},
    {x : new Date("10/01/2018"), y : 0},
  ];
});

afterEach(() => {
  // clear database
  
});

///////// BASIC TEST STRUCTURE ///////////

// test('testing primitives', () => {
//   expect (1+2).toStrictEqual(4)
// });



///////// FILTER FUNCTION //////////////



test('filters records outside the cutoff', () => {
  expect(lineChart.filterData(chartData, 6, "months")).toStrictEqual([
    {x : new Date("09/01/2018"), y : 2},
    {x : new Date("10/01/2018"), y : 0},
  ]);
});


///////// AGGREGATE FUNCTION /////////////

// test('aggre')