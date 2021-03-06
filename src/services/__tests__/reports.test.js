const moment = require("moment");

const filterViewableData = require('../reports')
  .filterViewableData,
  updateViewMarker = require('../reports').updateViewMarker,
  prepareData = require('../reports').retrieveMonthlyTotals,
  retrieveTopDonors = require('../reports').retrieveTopDonors,
  sortXAscendingIfDates = require('../reports').sortXAscendingIfDates,
  retrieveNoRecentDonations = require('../reports').retrieveNoRecentDonations,
  setYDomainTop = require('../reports').setYDomainTop,
  setYDomainBottom = require('../reports').setYDomainBottom,
  inferLabeldata = require('../reports').inferLabelData


///////// OUTER SCOPE SETUP //////////////


let setState = (newState) => {
  Object.keys(state).forEach(key => {
    state[key] = newState[key]
  })
};

test('setState function runs correctly', () => {
  setState({ viewMarker : 2 });
  expect(state.viewMarker).toStrictEqual(2);
  
  setState({viewMarker : state.viewMarker + 3 });
  expect(state.viewMarker).toStrictEqual(5);
});





// capture the real dateTime
const realDateTime = Date.now.bind(global.Date);


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



//////////// STATE & PROPS SETUP ///////////////


let state = {
  viewMarker : 0
};

let props = {
  preparedReportData : [1,1,1,1,1,1,1,1,1,1,1,1,1,1] // 14
};

// beforeEach(() => {
//   shallowDataSection.setProps({
//     preparedReportData : [1,1,1,1,1,1,1,1,1,1,1,1,1,1] // 14
//   });
//
//   let state = {
//     viewMarker : 0
//   };
//
//
// });


// afterEach(() => {

// });

/////////////// DATE RESETS ///////////////////


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


///////// TESTS /////////////




describe('filterViewableData() pure version', () => {
  const state = { viewMarker : 0 };
  const props = { preparedReportData : [1,1,1,1,1,1,1,1,1,1,1,1,1,1] }; // 14
  
  test('returns 5 records', () => {
    let returnedRecords = filterViewableData(5, props, state);
    expect(returnedRecords).toStrictEqual([1,1,1,1,1]);
  });
  
  test('over-request 15 more records(20). expect only 14', () => {
    const returnedRecords = filterViewableData(20, props, state);
    expect(returnedRecords.length).toStrictEqual(14);
    
  });
  
  test('request nothing. Receive nothing', () => {
    const returnedRecords = filterViewableData(0, props, state);
    expect(returnedRecords.length).toStrictEqual(0);
  })
});



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

test('raw data is properly totaled (retrieveMonthlyTotals)', () => {
  expect(prepareData(mockXYObjects(dataMultiplier, {date: 'donationDate', value: 'amountDonated'}), 12, "month"))
    .toStrictEqual([
      {x : moment("2019-01").toDate(), y : 5 * dataMultiplier},
      {x : moment("2018-12").toDate(), y : 20 * dataMultiplier},
      {x : moment("2018-11").toDate(), y : 10 * dataMultiplier},
      {x : moment("2018-10").toDate(), y : 12 * dataMultiplier},
      {x : moment("2018-09").toDate(), y : 1 * dataMultiplier},
      {x : moment("2018-08").toDate(), y : 9 * dataMultiplier},
      {x : moment("2018-07").toDate(), y : 2 * dataMultiplier},
      {x : moment("2018-06").toDate(), y : 8 * dataMultiplier},
      {x : moment("2018-05").toDate(), y : 13 * dataMultiplier},
      {x : moment("2018-04").toDate(), y : 11 * dataMultiplier},
      {x : moment("2018-03").toDate(), y : 3 * dataMultiplier},
    ])
});





describe('retrieveTopDonors from raw data', () => {
  test('groups by id', () => {
    
    
    expect(retrieveTopDonors([
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
            label             : "Ivory Wooten",
            x             : 1,
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
            label             : "Carlos Slim",
            x             : 2,
            y             : 240,
          },
        ],
      );
  })
});




test('sortXAscendingIfDates()', () => {
  const result = sortXAscendingIfDates([
    { x : new Date("2019-01-30T21:36:13.055Z") },
    { x : new Date("2018-08-30T21:36:13.055Z") },
    { x : new Date("2018-02-30T21:36:13.055Z") },
    { x : new Date("2018-07-30T21:36:13.055Z") },
    { x : new Date("2018-03-30T21:36:13.055Z") },
    { x : new Date("2018-08-30T21:36:13.055Z") },
    { x : new Date("2018-02-30T21:36:13.055Z") },
  ]);
  
  expect(result).toStrictEqual([
    { x : new Date("2018-02-30T21:36:13.055Z") },
    { x : new Date("2018-02-30T21:36:13.055Z") },
    { x : new Date("2018-03-30T21:36:13.055Z") },
    { x : new Date("2018-07-30T21:36:13.055Z") },
    { x : new Date("2018-08-30T21:36:13.055Z") },
    { x : new Date("2018-08-30T21:36:13.055Z") },
    { x : new Date("2019-01-30T21:36:13.055Z") },
  ])
});


test('retrieveNoRecentDonations()', () => {



  const resultArray = retrieveNoRecentDonations([
    { donationDate : new Date("2018-02-30T21:36:13.055Z"), id : 1, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2018-02-30T21:36:13.055Z"), id : 38, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2018-03-30T21:36:13.055Z"), id : 1, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2018-07-30T21:36:13.055Z"), id : 1, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2018-09-30T21:36:13.055Z"), id : 38, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2018-08-30T21:36:13.055Z"), id : 1, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2017-11-30T21:36:13.055Z"), id : 1, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2018-07-30T21:36:13.055Z"), id : 2, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2019-02-30T21:36:13.055Z"), id : 2, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
    { donationDate : new Date("2019-01-30T21:36:13.055Z"), id : 2, donationAmount : 1, firstName : 'John', lastName : 'Doe' },
  ]);

  expect(resultArray).toEqual([
    { donationDate : new Date("2018-08-30T21:36:13.055Z"), id : 1, donationAmount : 1, x : 1, y : new Date("2018-08-30T21:36:13.055Z"), label : 'John Doe', firstName : 'John', lastName : 'Doe'  },
    { donationDate : new Date("2018-09-30T21:36:13.055Z"), id : 38, donationAmount : 1, x : 2, y : new Date("2018-09-30T21:36:13.055Z"), label : 'John Doe', firstName : 'John', lastName : 'Doe'  },
    { donationDate : new Date("2019-02-30T21:36:13.055Z"), id : 2, donationAmount : 1, x : 3, y : new Date("2019-02-30T21:36:13.055Z"), label : 'John Doe', firstName : 'John', lastName : 'Doe'  },
  ])
});


test('yDomain Top function', () => {
  const preparedReportDataDummy = [{y : 100}, {y : 120}, {y : 160}, {y : 160}, {y : 140}, {y : 130}, {y : 170}, {y : 150}, ];
  
  expect(setYDomainTop(preparedReportDataDummy)).toEqual(170 * 1.2)
});

test('setYDomainBottom', () => {
  const preparedReportDataNumbers = [{y : 100}, {y : 120}, {y : 160}, {y : 160}, {y : 140}, {y : 130}, {y : 170}, {y : 150}, ];
  const preparedReportDataDates = [{y : new Date()}, {y : new Date('2018/03/24')}, {y : new Date('2018/02/12')}, {y : new Date('2018/09/08')}, ];
  
  expect(setYDomainBottom(preparedReportDataNumbers)).toEqual(100 * 0.8);
  expect(setYDomainBottom(preparedReportDataDates)).toEqual(new Date('2017/08/12'));
});



test('inferLabelData()', () => {
  const displayedData = [{
    x : 1,
    label : 'Marlon Jones',
  }, {
    x     : 6,
    label : 'Rod Barnes',
  }]
  
  expect(inferLabeldata(displayedData)).toEqual([
    {
      x : 1,
      y : 10,
      label : "Marlon Jones",
      rotation : -90,
      style : { textSize : 12 }
    }, {
      x : 6,
      y : 200,
      label : "Rod Barnes",
      rotation : -90,
      style : { textSize : 12 }
    },
  ])
})







