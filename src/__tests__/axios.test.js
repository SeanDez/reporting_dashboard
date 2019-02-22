import mockAxios from "../__mocks__/axios";

test('mockAxios', () => {
  const testQueryUrl = 'http://test.com/?name=John'
  
  mockAxios.get(testQueryUrl)
           .then(result => {
             expect(result).toEqual({ name : 'John' })
           })
  
  mockAxios.get('/cold-start')
    .then(result => {
      expect(result).toEqual({ message : 'Server woken up. Back-end ready for requests' })
    })
})