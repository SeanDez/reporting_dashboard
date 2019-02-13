import LineChart from "../components/DataSection";

const React = require("react");
const moment = require("moment");

const App = require("../App");
const DataSection = require("../components/DataSection").default;
const dataSection = new DataSection();
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter : new Adapter() });


///////// OUTER SCOPE SETUP //////////////

const dataMultiplier = 20;

function mockXYObjects(numberOfRuns, keys) {
  // create an array of objects
  const xYObjectArray = [];
  for (let i = 1; i <= numberOfRuns; i ++) {
    xYObjectArray.push(
      {[keys.date] : "2018-01-01T17:00:00.000Z", [keys.value] : 7},
      {[keys.date] : "2018-02-01T17:00:00.000Z", [keys.value] : 4},
      {[keys.date] : "2018-03-01T17:00:00.000Z", [keys.value] : 3},
      {[keys.date] : "2018-04-01T17:00:00.000Z", [keys.value] : 11},
      {[keys.date] : "2018-05-01T17:00:00.000Z", [keys.value] : 13},
      {[keys.date] : "2018-06-01T17:00:00.000Z", [keys.value] : 8},
      {[keys.date] : "2018-07-01T17:00:00.000Z", [keys.value] : 2},
      {[keys.date] : "2018-08-01T17:00:00.000Z", [keys.value] : 9},
      {[keys.date] : "2018-09-01T17:00:00.000Z", [keys.value] : 1},
      {[keys.date] : "2018-10-01T17:00:00.000Z", [keys.value] : 12}, // 3
      {[keys.date] : "2018-11-01T17:00:00.000Z", [keys.value] : 10}, // 2
      {[keys.date] : "2018-12-01T17:00:00.000Z", [keys.value] : 20}, // 1
      {[keys.date] : "2019-01-01T17:00:00.000Z", [keys.value] : 5}, // 0 periods away
    );
  }
  return xYObjectArray;
}

// capture the real dateTime
const realDateTime = Date.now.bind(global.Date);


// component render with dud props
const mockProp = jest.fn();
const shallowDataSection = enzyme.shallow(<DataSection
  dispatchGetDonationData={ mockProp }
  rawReportData={ mockProp }
  preparedReportData={ mockProp }
  dispatchUpdatePreparedReportData={ mockProp }
/>);

beforeAll(() => {
  // initialize database
  
  // attach fake date to the .now property
  const fakeDateFeb152019 = jest.fn(() => new Date('2019-02-15'));
  global.Date.now = fakeDateFeb152019;
  
});

afterAll(() => { // beforeAll does it only once per file
  // clear database
  
  // reset time back to actual
  global.Date.now = realDateTime;
});


const literallyJustDateNow = () => Date.now();

// test('It should call and return Date.now()', () => {
//   const realDateNow = Date.now.bind(global.Date);
//   const dateNowStub = jest.fn(() => 1530518207007);
//   global.Date.now = dateNowStub;
//
//   expect(literallyJustDateNow()).toBe(1530518207007);
//   expect(dateNowStub).toHaveBeenCalled();
//
//   global.Date.now = realDateNow;
// });

///////// BASIC TEST STRUCTURE ///////////

// test('testing primitives', () => {
//   expect (1+2).toStrictEqual(4)
// });


test('updates viewMarker correctly', () => {
  // setup

  console.log(shallowDataSection.state.initialFetch, `=====shallowDataSection.state.initialFetch=====`);
  console.log(shallowDataSection.state.viewMarker, `=====shallowDataSection.state.viewMarker=====`);
  
  // work
  
  // expects
  expect(shallowDataSection.contains(
    // <div className='test'>Test</div>
  )).toBe(true);
});



test('formats data.x into datetime strings', () => {
  
  expect(dataSection.formatInputData([{
    donationDate : new Date('2018-03-11T17:00:00.000Z'),
    amountDonated : 30
  }]))
    .toEqual([{
      x : '2018-03-11T17:00:00.000Z',
      y : 30
    }]);
  
  // also leaves inputted string dates alone
  expect(dataSection.formatInputData([
    {donationDate : '2018-03-11T17:00:00.000Z', amountDonated : 145},
    {donationDate : '2018-11-29T17:00:00.000Z', amountDonated : 83},
    ]))
    .toEqual([
      {x : '2018-03-11T17:00:00.000Z', y : 145},
      {x : '2018-11-29T17:00:00.000Z', y : 83}
  ])
});



test('filters records outside the cutoff (filterData)', () => {
  expect(
    dataSection.filterData([
      {x : "2018-05-01T17:00:00.000Z", y : 9},
      {x : "2018-07-01T17:00:00.000Z", y : 9},
      {x : "2018-08-01T17:00:00.000Z", y : 9},
      {x : "2018-09-01T17:00:00.000Z", y : 7},
      {x : "2018-10-01T17:00:00.000Z", y : 2},
      {x : "2018-11-01T17:00:00.000Z", y : 12},
      {x : "2018-12-01T17:00:00.000Z", y : 10},
      {x : "2019-01-01T17:00:00.000Z", y : 20},
      {x : "2019-02-01T17:00:00.000Z", y : 5},
      ],
      6, "month")
  ).toEqual([
    {x : "2018-09-01T17:00:00.000Z", y : 7},
    {x : "2018-10-01T17:00:00.000Z", y : 2},
    {x : "2018-11-01T17:00:00.000Z", y : 12},
    {x : "2018-12-01T17:00:00.000Z", y : 10},
    {x : "2019-01-01T17:00:00.000Z", y : 20},
    {x : "2019-02-01T17:00:00.000Z", y : 5},
  ]);
});



test('sorts data by x key (sortData)', () => {
  
  expect(dataSection.sortData([
    {x : "2018-10-01T17:00:00.000Z", y : 2},
    {x : "2018-05-01T17:00:00.000Z", y : 9},
    {x : "2018-07-01T17:00:00.000Z", y : 9},
    {x : "2018-09-01T17:00:00.000Z", y : 7},
    {x : "2018-12-01T17:00:00.000Z", y : 10},
    {x : "2018-08-01T17:00:00.000Z", y : 9},
    {x : "2019-02-01T17:00:00.000Z", y : 5},
    {x : "2018-11-01T17:00:00.000Z", y : 12},
    {x : "2019-01-01T17:00:00.000Z", y : 20},
  ]))
    .toStrictEqual([
      {x : "2018-05-01T17:00:00.000Z", y : 9},
      {x : "2018-07-01T17:00:00.000Z", y : 9},
      {x : "2018-08-01T17:00:00.000Z", y : 9},
      {x : "2018-09-01T17:00:00.000Z", y : 7},
      {x : "2018-10-01T17:00:00.000Z", y : 2},
      {x : "2018-11-01T17:00:00.000Z", y : 12},
      {x : "2018-12-01T17:00:00.000Z", y : 10},
      {x : "2019-01-01T17:00:00.000Z", y : 20},
      {x : "2019-02-01T17:00:00.000Z", y : 5},
    ]);
});


// the input date objects are not the right format
test("aggregate data into YYYY-MM buckets (aggregateData)", () => {
  
  expect(
    dataSection.aggregateData(mockXYObjects(dataMultiplier, {date: 'x', value: 'y'})),
  ).toStrictEqual([
    {x : "2018-01", y : 7.00 * dataMultiplier},
    {x : "2018-02", y : 4.00 * dataMultiplier},
    {x : "2018-03", y : 3.00 * dataMultiplier},
    {x : "2018-04", y : 11.00 * dataMultiplier},
    {x : "2018-05", y : 13.00 * dataMultiplier},
    {x : "2018-06", y : 8.00 * dataMultiplier},
    {x : "2018-07", y : 2.00 * dataMultiplier},
    {x : "2018-08", y : 9.00 * dataMultiplier},
    {x : "2018-09", y : 1.00 * dataMultiplier},
    {x : "2018-10", y : 12.00 * dataMultiplier},
    {x : "2018-11", y : 10.00 * dataMultiplier},
    {x : "2018-12", y : 20.00 * dataMultiplier},
    {x : "2019-01", y : 5.00 * dataMultiplier},
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



test('raw data is properly totaled (prepareData)', () => {
  expect(dataSection.prepareData(mockXYObjects(dataMultiplier, {date: 'donationDate', value: 'amountDonated'}), 12, "month"))
    .toStrictEqual([
      {x : moment("2018-03").toDate(), y : 3 * dataMultiplier},
      {x : moment("2018-04").toDate(), y : 11 * dataMultiplier},
      {x : moment("2018-05").toDate(), y : 13 * dataMultiplier},
      {x : moment("2018-06").toDate(), y : 8 * dataMultiplier},
      {x : moment("2018-07").toDate(), y : 2 * dataMultiplier},
      {x : moment("2018-08").toDate(), y : 9 * dataMultiplier},
      {x : moment("2018-09").toDate(), y : 1 * dataMultiplier},
      {x : moment("2018-10").toDate(), y : 12 * dataMultiplier},
      {x : moment("2018-11").toDate(), y : 10 * dataMultiplier},
      {x : moment("2018-12").toDate(), y : 20 * dataMultiplier},
      {x : moment("2019-01").toDate(), y : 5 * dataMultiplier},
    ])
});


describe('retrieveTopDonors from raw data', () => {
  test('groups by id', () => {
  
  
    expect(dataSection.retrieveTopDonors([
      {
        amountDonated : 72,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-12-01T17:00:00.000Z",
        firstName     : "Ivory",
        id            : 201,
        isRecurring   : true,
        lastName      : "Wooten",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
      {
        amountDonated : 72,
        createdAt     : "2019-06-30T21:36:13.055Z",
        donationDate  : "2018-10-01T17:00:00.000Z",
        firstName     : "Ivory",
        id            : 201,
        isRecurring   : false,
        lastName      : "Wooten",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
      {
        amountDonated : 72,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-12-01T17:00:00.000Z",
        firstName     : "Ivory",
        id            : 201,
        isRecurring   : false,
        lastName      : "Wooten",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
  
      {
        amountDonated : 72,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-01-01T17:00:00.000Z",
        firstName     : "Ivory",
        id            : 201,
        isRecurring   : false,
        lastName      : "Wooten",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
      {
        amountDonated : 72,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-06-01T17:00:00.000Z",
        firstName     : "Ivory",
        id            : 201,
        isRecurring   : false,
        lastName      : "Wooten",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
  
      {
        amountDonated : 60,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-02-01T17:00:00.000Z",
        firstName     : "Carlos",
        id            : 9,
        isRecurring   : false,
        lastName      : "Slim",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
      {
        amountDonated : 60,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-08-01T17:00:00.000Z",
        firstName     : "Carlos",
        id            : 9,
        isRecurring   : false,
        lastName      : "Slim",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
      {
        amountDonated : 60,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-04-01T17:00:00.000Z",
        firstName     : "Carlos",
        id            : 9,
        isRecurring   : false,
        lastName      : "Slim",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
      {
        amountDonated : 60,
        createdAt     : "2019-01-30T21:36:13.055Z",
        donationDate  : "2018-06-01T17:00:00.000Z",
        firstName     : "Carlos",
        id            : 9,
        isRecurring   : false,
        lastName      : "Slim",
        notes         : "Lorem ipsum dolor sit",
        paymentType   : "echeck",
        updatedAt     : "2019-01-30T21:36:13.055Z",
      },
    ]))
      .toMatchObject([
          {
            amountDonated : 360,
            // createdAt     : "2019-01-30T21:36:13.055Z",
            // donationDate  : "2018-12-01T17:00:00.000Z",
            firstName     : "Ivory",
            id            : 201,
            isRecurring   : true,
            lastName      : "Wooten",
            notes         : "Lorem ipsum dolor sit",
            // paymentType   : "echeck",
            // updatedAt     : "2019-01-30T21:36:13.055Z",
            x             : "Ivory Wooten",
            y             : 360,
          },
          {
            amountDonated : 240,
            // createdAt     : "2019-01-30T21:36:13.055Z",
            // donationDate  : "2018-02-01T17:00:00.000Z",
            firstName     : "Carlos",
            id            : 9,
            // isRecurring   : false,
            lastName      : "Slim",
            notes         : "Lorem ipsum dolor sit",
            // paymentType   : "echeck",
            // updatedAt     : "2019-01-30T21:36:13.055Z",
            x             : "Carlos Slim",
            y             : 240,
          },
        ],
      );
  })
});






