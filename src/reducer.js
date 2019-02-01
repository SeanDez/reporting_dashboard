import React from "react";
import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import moment from "moment";

const startingState = {
  view : 'frontEnd',
  dashboardIsLoading : false,
};

const reducer = (previousState = startingState, action) => {
  switch (action.type) {
    case 'loadUserData':
      const {userId, userName, donationData} = action.payload;
        return {
          ...previousState,
          // each of the below goes into the store as k/v pairs
          userId, userName, donationData
        };
    case 'updateView':
      const { view } = action.payload;
      return {
        ...previousState,
        view
      };
    case 'reportData':
      const rawReportData = action.payload;
      const formattedArray = rawReportData.filter((record, index) => {
        return index < 5;
      })
        .map((currentRecord, index) => {
        // give a format for moment to parse
        // console.log('currentRecord.donationDate');
        // console.log(currentRecord.donationDate);
        const transformedDate = moment(currentRecord.donationDate)
          // .format('MM/DD/YYYY');
          .toDate();
        
        return {
          x : transformedDate, // currentRecord.donationDate
          y : parseInt(currentRecord.amountDonated)
        }
      });
      
      
      return {
        ...previousState,
        reportData : formattedArray,
        test : 'test'
      };
    default:
      return previousState;
  }
};

export default createStore(reducer, startingState, applyMiddleware(ReduxThunk));