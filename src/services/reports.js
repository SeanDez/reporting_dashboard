import moment from "moment";
import _ from "lodash";


export const sortXAscendingIfDates = dataArray => {
  if (dataArray[0].x instanceof Date) {
  
    return dataArray.sort((a, b) => {
      return moment(a.x) - moment(b.x);
    });
  }
};

// to be used inside setState
export const filterViewableData = (incrementSize, props, state) => {
  const {preparedReportData} = props;
  
  
  const filteredData = preparedReportData.filter((record, index) => {
    return index >= state.viewMarker &&
     index < state.viewMarker + incrementSize;
  });
  return filteredData;
};


export const retrieveMonthlyTotals = (rawData) => {
  // remap objects into x/y pairs
  const xYFormattedObjects = rawData.map(record => {
    return {
      x : record.donationDate,
      y : record.amountDonated
    }
  });
  
  // filter 12 months back
  const dateBoundary = moment().subtract(12, 'month');
  
  const filteredArray = xYFormattedObjects.filter(record => {
    const testDate = moment(record.x);
    return testDate > dateBoundary && record // : null;
  });
  
  // create an array with all the month/year keys
  const yearMonthKeys = [];
  filteredArray.forEach(record => {
    const recordYearMonthKey = moment(record.x)
      .format('YYYY-MM');
    if (yearMonthKeys.indexOf(recordYearMonthKey) < 0) {
      yearMonthKeys.push(recordYearMonthKey)
    }
  });
  
  // create a totalled array with all the y values summed
  const totalledYAmounts = yearMonthKeys
    .map(yMKey => {
      const totalMatchingYAmounts = _.sumBy(filteredArray, record => {
        // create a matcher
        const recordYearMonthKey =
                moment(record.x).format("YYYY-MM");
        // add all matching k/v values
        if (recordYearMonthKey === yMKey) {
          // console.log(`=====record.y=====`, record.y);
          return record.y;
        }
      });
      return {
        x : yMKey,
        y : totalMatchingYAmounts,
      };
    });
  
  // sort in descending order
  const sortedData = totalledYAmounts.sort((a, b) => {
    return moment(b.x) - moment(a.x)
  });
  
  // convert months back to date objects
  const convertedDatesArray = sortedData.map(record => {
    const dateObject = new moment(record.x, 'YYYY-MM').toDate();
    return {
      x : dateObject,
      y : record.y
    }
  });
  return convertedDatesArray
};


export const retrieveTopDonors = (preparedData) => {
  // total by id
  // first group by id
  const groupedObjectWithIdKeys = _.groupBy(preparedData, 'id');
  // undefined. The array itself doesn't have an id property
  
  // map over each id key and sum it
  const totalledList = _.map(groupedObjectWithIdKeys, idArray => {
    // clone one of the objects and then replace its donation amount by the sum of all of them. assign x/y values
    const clonedFirstObject = Object.assign({}, idArray[0]);
    
    
    const totalDonationAmount = _.sumBy(idArray, record => record.amountDonated);
    
    clonedFirstObject.amountDonated = totalDonationAmount;
    clonedFirstObject.label = `${clonedFirstObject.firstName} ${clonedFirstObject.lastName}`;
    clonedFirstObject.y = totalDonationAmount;
    return clonedFirstObject;
    // at this point totalledList is consolidated to one object per id. Every recorded donation is summed
  });
  
  // sort descending
  const sortedList = totalledList.sort((a, b) => {
    // if it's positive b first. If negative a first
    return b.amountDonated - a.amountDonated
  });
  
  // assign an x value (order)
  sortedList.forEach((record, index) => {
    record.x = (index % 10) + 1;
  });
  
  // return the sorted list
  return sortedList;
};


export const retrieveNoRecentDonations = (preparedData) => {
  
  // group by id
  const groupedByIds = _.groupBy(preparedData, 'id');
  // console.log(groupedByIds, `=====groupedByIds=====`);
  
  // find last/earliest donation
  const maxDates = _.map(groupedByIds, innerArray => {
    return _.maxBy(innerArray, 'donationDate');
  });
  // console.log(maxDates, `=====maxDates=====`);
  
  // sort by "smallest" date object and return
  const sortedAscending = maxDates.sort((a, b) => {
    return new Date(a.donationDate) - new Date(b.donationDate);
  });
  
  // add x and y values
  const xYadded = sortedAscending.map((record, index) => {
    const enhancedObject = Object.assign({}, record);
    enhancedObject.x = (index % 15) + 1;
    enhancedObject.y = new Date(record.donationDate);
    enhancedObject.label = `${record.firstName} ${record.lastName}`;
    return enhancedObject;
  });
  
  return xYadded;
};


export const setYDomainTop = preparedReportData => {
  const highestY = _.maxBy(preparedReportData, 'y');
  const yDomainTop = highestY.y * 1.2;
  return yDomainTop
};


export const setYDomainBottom = preparedReportData => {
  if (typeof preparedReportData[0].y === 'number') {
    const lowestY = _.minBy(preparedReportData, 'y');
    const yDomainBottom = lowestY.y * 0.8;
    return yDomainBottom
  } else if (preparedReportData[0].y instanceof Date) {
    // get the lowest date in usable format
    const lowestYDate = _.minBy(preparedReportData, 'y'); // still inside .y
  
    // subtract 6 months from it
    const lowestDateMinus6Months = moment(lowestYDate.y)
      .subtract("6", "months")
      .toDate();
    return lowestDateMinus6Months
  }
};

export const inferLabelData = displayedData => {
  const labeledData = displayedData.map(record => {
    return {
      x : record.x,
      y : record.x < 6 ? 10 : 200,
      label : record.label,
      rotation : -90,
      style : { textSize : 12 }
    }
  });
  return labeledData;
}




















