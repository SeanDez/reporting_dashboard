import {reducer} from "../reducer";


// describe('updates the reducer', () => {
//   test('updates preparedReportData key', () => {
//     expect(reducer({ preexistingKey : 'preexistingValue' }, {
//       action : 'preparedReportData',
//       type : [{x : new Date('2019-02-15'), y : 100}]
//     }))
//       .toStrictEqual({
//         preexistingKey : 'preexistingValue',
//         preparedReportData : [
//           {x : new Date("2019-02-15"), y : 100},
//         ],
//       })
//   })
// });

test('updates preparedReportData key', () => {
  expect(reducer({ preexistingKey : 'preexistingValue' }, {
    type : 'preparedReportData',
    payload : [{x : new Date('2019-02-15'), y : 100}]
  }))
    .toStrictEqual({
      preexistingKey : 'preexistingValue',
      preparedReportData : [{x : new Date("2019-02-15"), y : 100}]
    })
});