const moment = require("moment");

const DataSection = require("../components/DataSection").default;
const dataSection = new DataSection();

const dataMultiplier = 20;

function mockXYObjects(numberOfRuns) {
  // create an array of objects
  const xYObjectArray = [];
  for (let i = 1; i <= numberOfRuns; i ++) {
    xYObjectArray.push(
      {x : "01/01/2018", y : 7},
      {x : "02/01/2018", y : 4},
      {x : "03/01/2018", y : 3},
      {x : "04/01/2018", y : 11},
      {x : "05/01/2018", y : 13},
      {x : "06/01/2018", y : 8},
      {x : "07/01/2018", y : 2},
      {x : "08/01/2018", y : 9},
      {x : "09/01/2018", y : 1},
      {x : "10/01/2018", y : 12}, // 3
      {x : "11/01/2018", y : 10}, // 2
      {x : "12/01/2018", y : 20}, // 1
      {x : "01/01/2019", y : 5}, // 0 periods away
    );
  }
  return xYObjectArray;
}

beforeEach(() => {
  // initialize database
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
    dataSection.filterData([
      {x : "2018-05-01", y : 9},
      {x : "2018-07-01", y : 9},
      {x : "2018-08-01", y : 9},
      {x : "2018-09-01", y : 7},
      {x : "2018-10-01", y : 2},
      {x : "2018-11-01", y : 12},
      {x : "2018-12-01", y : 10},
      {x : "2019-01-01", y : 20},
      {x : "2019-02-01", y : 5},
      ],
      6, "month")
  ).toEqual([
    {x : "2018-09-01", y : 7},
    {x : "2018-10-01", y : 2},
    {x : "2018-11-01", y : 12},
    {x : "2018-12-01", y : 10},
    {x : "2019-01-01", y : 20},
    {x : "2019-02-01", y : 5},
  ]);
});


test('sorts data by x key (sortData)', () => {
  
  expect(dataSection.sortData([
    {x : "2018-10-01", y : 2},
    {x : "2018-05-01", y : 9},
    {x : "2018-07-01", y : 9},
    {x : "2018-09-01", y : 7},
    {x : "2018-12-01", y : 10},
    {x : "2018-08-01", y : 9},
    {x : "2019-02-01", y : 5},
    {x : "2018-11-01", y : 12},
    {x : "2019-01-01", y : 20},
  ]))
    .toStrictEqual([
      {x : "2018-05-01", y : 9},
      {x : "2018-07-01", y : 9},
      {x : "2018-08-01", y : 9},
      {x : "2018-09-01", y : 7},
      {x : "2018-10-01", y : 2},
      {x : "2018-11-01", y : 12},
      {x : "2018-12-01", y : 10},
      {x : "2019-01-01", y : 20},
      {x : "2019-02-01", y : 5},
    ]);
});


test("aggregate data into YYYY-MM buckets (aggregateData)", () => {
  
  expect(
    dataSection.aggregateData(mockXYObjects(dataMultiplier)),
  ).toStrictEqual([
    {x : "2018-01", y : 7 * dataMultiplier},
    {x : "2018-02", y : 4 * dataMultiplier},
    {x : "2018-03", y : 3 * dataMultiplier},
    {x : "2018-04", y : 11 * dataMultiplier},
    {x : "2018-05", y : 13 * dataMultiplier},
    {x : "2018-06", y : 8 * dataMultiplier},
    {x : "2018-07", y : 2 * dataMultiplier},
    {x : "2018-08", y : 9 * dataMultiplier},
    {x : "2018-09", y : 1 * dataMultiplier},
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
It's saying the METHOD aggregateData() returns undefined
 
 */


test('convert to date objects (convertToDateObjects', () => {
  
  expect(dataSection.convertToDateObjects([{x : "2018-09", y : 8}])).toEqual([
    {x : moment("2018-09-01").toDate(), y : 8 }
  ])
});

test.skip('raw data is properly totalled (prepareData)', () => {
  expect(dataSection.prepareData(mockXYObjects(dataMultiplier), 12, "month"))
    .toStrictEqual([
      // {x : new Date("2018-01-01T00:00:00"), y : 7 * dataMultiplier},
      // {x : new Date("2018-02-01T00:00:00"), y : 4 * dataMultiplier},
      // {x : new Date("2018-03-01T00:00:00"), y : 3 * dataMultiplier},
      // {x : new Date("2018-04-01T00:00:00"), y : 11 * dataMultiplier},
      // {x : new Date("2018-05-01T00:00:00"), y : 13 * dataMultiplier},
      // {x : new Date("2018-06-01T00:00:00"), y : 8 * dataMultiplier},
      // {x : new Date("2018-07-01T00:00:00"), y : 2 * dataMultiplier},
      // {x : new Date("2018-08-01T00:00:00"), y : 9 * dataMultiplier},
      // {x : new Date("2018-09-01T00:00:00"), y : 1 * dataMultiplier},
      // {x : new Date("2018-10-01T00:00:00"), y : 12 * dataMultiplier},
      // {x : new Date("2018-11-01T00:00:00"), y : 10 * dataMultiplier},
      // {x : new Date("2018-12-01T00:00:00"), y : 20 * dataMultiplier},
      // {x : new Date("2019-01-01T00:00:00"), y : 5 * dataMultiplier},
      {x : moment("2018-01-01T00:00:00").toDate(), y : 7 * dataMultiplier},
      {x : moment("2018-02-01T00:00:00").toDate(), y : 4 * dataMultiplier},
      {x : moment("2018-03-01T00:00:00").toDate(), y : 3 * dataMultiplier},
      {x : moment("2018-04-01T00:00:00").toDate(), y : 11 * dataMultiplier},
      {x : moment("2018-05-01T00:00:00").toDate(), y : 13 * dataMultiplier},
      {x : moment("2018-06-01T00:00:00").toDate(), y : 8 * dataMultiplier},
      {x : moment("2018-07-01T00:00:00").toDate(), y : 2 * dataMultiplier},
      {x : moment("2018-08-01T00:00:00").toDate(), y : 9 * dataMultiplier},
      {x : moment("2018-09-01T00:00:00").toDate(), y : 1 * dataMultiplier},
      {x : moment("2018-10-01T00:00:00").toDate(), y : 12 * dataMultiplier},
      {x : moment("2018-11-01T00:00:00").toDate(), y : 10 * dataMultiplier},
      {x : moment("2018-12-01T00:00:00").toDate(), y : 20 * dataMultiplier},
      {x : moment("2019-01-01T00:00:00").toDate(), y : 5 * dataMultiplier},
    ])
});









