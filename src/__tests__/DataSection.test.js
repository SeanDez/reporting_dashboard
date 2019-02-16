const React = require("react");
const moment = require("moment");

const DataSection = require("../components/DataSection").default;
const dataSection = new DataSection();
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter : new Adapter() });


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


// component render with dud props
const mockProp = jest.fn();
const shallowDataSection = enzyme.shallow(<DataSection
  dispatchGetDonationData={ mockProp }
  rawReportData={ mockProp }
  preparedReportData={ [1,1,1,1,1] } // starts at 5
  dispatchUpdatePreparedReportData={ mockProp }
/>);

// const mountedDataSection = enzyme.mount(
//   <DataSection
//     dispatchGetDonationData={ mockProp }
//     rawReportData={ mockProp }
//     preparedReportData={ mockProp }
//     dispatchUpdatePreparedReportData={ mockProp }
//   />
// );


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

//////////////////////////////////


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







