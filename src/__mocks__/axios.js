
// it doesn't have to duplicate the real post request's functionality. This one totally replaces the real one during run time. Literally swaps it out during the unit test
  // but a swap out implies that precise mimicking is needed
  // but not if I control/override the inputs using jest

/* export default {
  post : jest.fn((dummyUrl) => {
    return new Promise((resolve, reject) => {
      resolve(`${ dummyUrl }`);
    });
  }),
};*/

class MockAxios {
  post = jest.fn((dummyUrl, data) => {
    return new Promise((resolve, reject) => {
      if (data) { resolve (`${dummyUrl}`); }
      else { reject(new Error("No data sent with post request!")) }
    })
  })
}

const mockAxios = new MockAxios();
export default  mockAxios;