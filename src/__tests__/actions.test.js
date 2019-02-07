import mockAxios from "axios";




describe('testing mockAxios', () => {
  test("mockAxios returns fake post data", () => {
    // setup
    
    // work
    const data = {dummyData : true};
    
    return (
      mockAxios.post("http://test.com/api", data)
               .then(response => expect(response)
                 .toEqual("http://test.com/api")
               ));
  });

  // test('mockAxios post with no data object returns error object', () => {
  //   // setup
  //
  //   // work
  //
  //       // expect
  //       return expect(mockAxios.post('http://localhost:4000')
  //          .then(data => console.log(data))
  //          .catch(error => {
  //            console.log(error)
  //          })
  //          .toThrowError(new Error("No data sent with post request!"))
  //     })
  // })

});

test.skip('getDonationData dispatcher', () => {
  const responseObject = { data : {
    x : "02/06/2018",
      y : 143
  }};
  
  axios.post.mockResolvedValue(responseObject);
  
  expect().toStrictEqual({
    type : 'reportData',
    payload : [{ x : "02/06/2018", y : 143 }]
  })
});


test.skip('async test', async () => {
  const asyncMock = jest.fn().mockResolvedValue(43);
  
  await asyncMock(); // 43
});