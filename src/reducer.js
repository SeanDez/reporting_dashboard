import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";


const startingState = {
  view : 'frontEnd',
  dashboardIsLoading : false
};

export const reducer = (previousState = startingState, action) => {
  switch (action.type) {
    case 'updateView':
      const { view } = action.payload;
      return {
        ...previousState,
        view
      };
    case 'rawReportData':
      action.payload.forEach((value) => {
        value.amountDonated = parseInt(value.amountDonated)
      });

      return {
        ...previousState,
        rawReportData : action.payload
      };
    case "preparedReportData":
      return {
        ...previousState,
        preparedReportData : action.payload
      };
    default:
      return previousState;
  }
};

export default createStore(reducer, startingState, applyMiddleware(ReduxThunk));