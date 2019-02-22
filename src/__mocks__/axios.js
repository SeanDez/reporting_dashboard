
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
  
  get = jest.fn(dummyUrl => {
    if (dummyUrl.indexOf('?') >= 0) {
    
      // grab key (between ? and =)
      const keyWithQMMatcher = /[?][a-zA-Z0-9]+/;
      // grab value (between = and &. or = and end
      const valueWithEqMatcher = /[=][A-Za-z0-9]+/
      
      // test the url for query params
      const keyWithQm = dummyUrl.match(keyWithQMMatcher);
      const valueWithEqSign = dummyUrl.match(valueWithEqMatcher);
      
      const key = keyWithQm[0].replace(/^[?]/, '');
      const value = valueWithEqSign[0].replace(/^[=]/, '')
  
      return new Promise((resolve, reject) => {
        if (key && value) {
          resolve({[key] : value});
        } else reject({error : "something went wrong in the mock get request"});
      });
    } else if (dummyUrl.match(/[/cold-start]/)) {
      return Promise.resolve({ message : 'Server woken up. Back-end ready for requests' })
    }
  });
  
  post = jest.fn((dummyUrl, data) => {
    return new Promise((resolve, reject) => {
      if (data) { resolve (`${dummyUrl}`); }
      else { reject(new Error("No data sent with post request!")) }
    })
  })
}

const mockAxios = new MockAxios();
export default mockAxios;