import mockAxios from "axios";

// jest.mock("axios");


test.skip("mockAxios returns fake post data", () => {
  // console.log('mockAxios.mockResolvedValue');
  // console.log(mockAxios.mockResolvedValue);
  // console.log('mockAxios.Implementation');
  // console.log(mockAxios.Implementation);
  return (
    mockAxios.post("http://test.com/api")
             .then(response => expect(response)
               .toEqual("http://test.com/api")
             ));
});

