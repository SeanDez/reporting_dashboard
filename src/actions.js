import Axios from "axios";

// won't have to manually import each one now
export default {
  loadUserData : cookieData => (dispatch => {
    const { sessionJWToken } = cookieData;
    
    return Axios.post(
      'http://localhost:4000/auth-status') // cookies sent automatically
      .then(ApiResponse => {
        // if success
        const { id, userName, error } = ApiResponse.data;
        if (ApiResponse.data.error) {
          console.log("=============ERROR==========");
          console.log(error);
        } else if (id)
        dispatch({
          type : 'loadUserData',
          payload : { id, userName }
        })
      })
  }),
  updateView : newView => {
    return {
      type : 'updateView',
      payload : {
        view : {
          newView
        }
      }
    }
  }
}




















