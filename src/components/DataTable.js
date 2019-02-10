import React from "react";
import {withStyles} from "@material-ui/core";
// import styled from "styled-components";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";


const materialUiStyles = theme => ({
  base : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overconstrainedX: 'auto'
  },
  table : {
    minWidth : 700
  }
});

// const donorData = [
//   { id : 938, firstName : 'Joesph', lastName : 'Cranston', email : 'joecranston@gmail.com'
//   }, { id : 939, firstName : 'Rob', lastName : 'Black', email : 'rblack382@gmail.com'
//   }, { id : 940, firstName : 'Mary', lastName : 'Balboa', email : 'angel111@gmail.com'
//   }, { id : 941, firstName : 'Alfred', lastName : 'Simpson', email : 'alsimp@gmail.com'
//   },
// ];
//
// const donationData = [
//   { id : 938, date : 'Sept 8, 2018', amount : 40, currency : 'USD'
//   }, { id : 941, date : 'May 14, 2018', amount : 10, currency : 'USD'
//   }, { id : 939, date : 'Jan 12, 2018', amount : 40, currency : 'USD'
//   }, { id : 940, date : 'Feb 11, 2018', amount : 25, currency : 'USD'
//   }, { id : 938, date : 'Mar 23, 2018', amount : 87, currency : 'USD'
//   }, { id : 940, date : 'Aug 31, 2018', amount : 50, currency : 'USD'
//   }, { id : 940, date : 'Nov 6, 2018', amount : 30, currency : 'USD'
//   }, { id : 940, date : 'Jul 10, 2018', amount : 20, currency : 'USD'
//   }, { id : 941, date : 'May 3, 2018', amount : 40, currency : 'USD'
//   }, { id : 940, date : 'Oct 17, 2018', amount : 30, currency : 'USD'
//   }, { id : 941, date : 'Nov 23, 2018', amount : 30, currency : 'USD'
//   }, { id : 941, date : 'Apr 16, 2018', amount : 30, currency : 'USD'
//   }, { id : 939, date : 'Sept 25, 2018', amount : 70, currency : 'USD'
//   },
// ];

const localArrayHeaderData = ['Dessert (100g serving)', 'Calories', 'Fat (g)',
                              'Carbs (g)', 'Protein (g)'];

const renderTableHeaders = (apiData) => {
  // if period totals
  // I need to start sending this back
  // if (apiData.reportType === 'periodTotals') {
    // const
  // }
  
  return localArrayHeaderData.map((headerValue, indexValue) => {
    if (indexValue === 0) {
      return <TableCell key={indexValue}>{headerValue}</TableCell>
    } else {
      return <TableCell align='right' key={indexValue}>{headerValue}</TableCell>
    }
  });
  // console.log(mappedHeaders)
  
};

// name, calories, fat, carbs, protein
const localArrayCellData = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];


const composeTableBodyDataCells = (dataItemArray, arrayToPushInto) => {
  for (let i = 1; i < dataItemArray.length; i ++) {
    // console.log('dataItemArray[i]', dataItemArray[i]);
    arrayToPushInto.push(<TableCell align='right' key={"dataItemArray key " + i}>{dataItemArray[i]}</TableCell>
    )}
};

const renderTableBody = () => {
  return localArrayCellData.map((cellDataItem, index) => {
    let bodyCellArray = [];
    composeTableBodyDataCells(cellDataItem, bodyCellArray);
    return (
      <TableRow key={'TableRow key ' + index}>
        <TableCell component='th' scope='row' key={'TableCell key' + index}>{cellDataItem[0]}</TableCell>
        {bodyCellArray}
      </TableRow>
    )
  })
};


// construct the desired return
// map it. Key the index (you won't mod the array)


const DataTable = (props) => {
  const { classes } = props;
  
  return (
  <Table className={classes.table} style={{marginTop : '62px'}}>
    <TableHead>
      <TableRow>
        {renderTableHeaders()}
      </TableRow>
    </TableHead>
    <TableBody>
      {renderTableBody()}
    </TableBody>
  </Table>
  )};

export default withStyles(materialUiStyles)(DataTable);