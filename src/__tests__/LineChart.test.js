const LineChart = require("../components/LineChart").default;
const lineChart = new LineChart();

let chartData; // no real reason to do this other than testing scoping

function mockXYObjects(numberOfRuns) {
  // create an array of objects
  const xYObjectArray = [];
  for (let i = 1; i <= numberOfRuns; i ++) {
    xYObjectArray.push(
      {x : "09/01/2018", y : 8},
      {x : "10/01/2018", y : 12},
      {x : "11/01/2018", y : 10},
      {x : "12/01/2018", y : 20},
      {x : "01/01/2019", y : 5},
    );
  }
  return xYObjectArray;
};

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

afterEach(() => { // beforeAll does it only once per file
  // clear database
  
});

///////// BASIC TEST STRUCTURE ///////////

// test('testing primitives', () => {
//   expect (1+2).toStrictEqual(4)
// });



test('filters records outside the cutoff (filterData)', () => {
  expect(
    lineChart.filterData(chartData, 6, "months")
  ).toStrictEqual([
    {x : new Date("09/01/2018"), y : 2},
    {x : new Date("10/01/2018"), y : 0},
  ]);
});


test('sorts data by x key (sortData)', () => {
  const dataMultiplier = 1;
  
  expect(lineChart.sortData(mockXYObjects(dataMultiplier)))
    .toMatchObject([
      // will fail when the parent array has different order (good)
      {x : "09/01/2018", y : 8},
      {x : "10/01/2018", y : 12},
      {x : "11/01/2018", y : 10},
      {x : "12/01/2018", y : 20},
      {x : "01/01/2019", y : 5},
    ]);
});


test("aggregate data into YYYY-MM buckets (aggregateData)", () => {
  const dataMultiplier = 20;
    expect(
      lineChart.aggregateData(mockXYObjects(dataMultiplier))
    ).toStrictEqual([
                 {x : "2018-09", y : 8 * dataMultiplier},
                 {x : "2018-10", y : 12 * dataMultiplier},
                 {x : "2018-11", y : 10 * dataMultiplier},
                 {x : "2018-12", y : 20 * dataMultiplier},
                 {x : "2019-01", y : 5 * dataMultiplier},
               ]);
  },
);

/*
TypeError: Cannot read property 'toStrictEqual' of undefined

 75 | test("aggregate data into YYYY-MM buckets", () => {
 76 |     expect(
>77 |       lineChart.aggregateData(aggTestArray)
|           ^

Pointing at the class instance is what threw me off
It's meaning to say the METHOD returns undefined
 
 */



test.skip('raw data is properly totalled (prepareData)', () => {
  const dataMultiplier = 20;
  
  expect(lineChart.prepareData(mockXYObjects(dataMultiplier), dataMultiplier, "months"))
    .toMatch([
      {x : "2018-09", y : 8 * dataMultiplier},
      {x : "2018-10", y : 12 * dataMultiplier},
      {x : "2018-11", y : 10 * dataMultiplier},
      {x : "2018-12", y : 20 * dataMultiplier},
      {x : "2019-01", y : 5 * dataMultiplier}
    ])
});











