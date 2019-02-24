import Axios from "axios";

// won't have to manually import each one now
export default {
  updateView      : newView => {
    return {
      type    : 'updateView',
      payload : {
        view : {
          newView
        }
      }
    }
  },
  getDonationData : (reportType, recordCount) => (dispatch => {
    return Axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/reports/`,
      {
      reportType, recordCount
    }
    )
      .then(apiResponse => {
        if (apiResponse.data.error) {
          console.log(apiResponse.data, `=====error=====`);
          window.alert(apiResponse.data.error)
        } else {
          const returnedArray = apiResponse.data;
          dispatch({
            type : 'rawReportData',
            payload : returnedArray
          })
        }
      })
  }),
  updatePreparedReportData : updatedData => {
    return {
      type : "preparedReportData",
      payload : updatedData
    }
  }
}




















