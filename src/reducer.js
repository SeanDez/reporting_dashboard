import React from "react";
import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";

const startingState = {
  view : 'frontEnd'
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
    default:
      return previousState;
  }
};

export default createStore(reducer, startingState, applyMiddleware(ReduxThunk));