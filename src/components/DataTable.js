import React from "react";
import {withStyles} from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";

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
    // minWidth : 700
  }
});

const StyledTableWrapper = styled(Table)`
  border: 2px dotted blue;
  margin: 0 auto;
  max-width: 300px;
  display: flex;
  //justify-content: center !important;
  //align-items: center !important;
`;


const renderTableHeaders = (tableHeaders) => {
  // if period totals
  // I need to start sending this back
  // if (apiData.reportType === 'periodTotals') {
    // const
  // }
  
  return tableHeaders.map((headerText, index) => {
    if (index === 0) {
      return <TableCell key={index}>{headerText}</TableCell>
    } else {
      return <TableCell align='right' key={index}>{headerText}</TableCell>
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

const tableHeaders = ['Month, Year', 'Total Amount'];

const tableBody = [
  {x : "2018-02", y : 150},
  {x : "2018-03", y : 50},
];

// const composeTableBodyCells = (dataItems, tableHeaders) => {
//
//   return tableHeaders.map((headerText => {
//
//   }));
//
//   for (let i = 1; i < dataItemArray.length; i ++) {
//     // console.log('dataItemArray[i]', dataItemArray[i]);
//     arrayToPushInto.push(<TableCell align='right' key={"dataItemArray key " + i}>{dataItemArray[i]}</TableCell>
//     )}
// };

// const renderTableBody = (bodyData) => {
//
//   return bodyData.map((tableData, index) => {
//     let bodyCellArray = [];


//     composeTableBodyCells(cellDataItem, bodyCellArray);
        
        // return tableHeaders.map((headerText => {
//
//   }));
//
//   for (let i = 1; i < dataItemArray.length; i ++) {
//     // console.log('dataItemArray[i]', dataItemArray[i]);
//     arrayToPushInto.push(<TableCell align='right' key={"dataItemArray key " + i}>{dataItemArray[i]}</TableCell>
//     )}

//     return (
//       <TableRow key={'TableRow key ' + index}>
//         <TableCell component='th' scope='row' key={'TableCell key' + index}>{cellDataItem[0]}</TableCell>
//         {bodyCellArray}
//       </TableRow>
//     )
//   })
// };


// construct the desired return
// map it. Key the index (you won't mod the array)



const DataTable = (props) => {
  const { classes } = props;
  
  
  
  return (
    <StyledTableWrapper className={ classes.table } style={ {marginTop : "62px"} }>
      <TableHead>
        <TableRow>
          <TableCell>By Month</TableCell>
          <TableCell align='right'>Subtotal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.preparedReportData
               .sort((a, b) => {
                 return b.x - a.x // descending
               })
               .map(record => {
            return (
              <TableRow key={record.x.toString()}>
                <TableCell>
                  {
                    new moment(record.x)
                    .format('MMMM YYYY')
                  }
                </TableCell>
                <TableCell align='right'>
                  {`$${record.y.toLocaleString(undefined, {maximumFractionDigits:2})}`}
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </StyledTableWrapper>
  );};

export default withStyles(materialUiStyles)(DataTable);