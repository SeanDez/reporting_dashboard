import React from "react";
import {withStyles} from "@material-ui/core";
import styled from "styled-components";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


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

const localArrayHeaderData = ['Dessert (100g serving)', 'Calories', 'Fat (g)',
                              'Carbs (g)', 'Protein (g)'];



// name, calories, fat, carbs, protein
const localArrayCellData = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];



// construct the desired return
// map it. Key the index (you won't mod the array)


const DataTable = (props) => {
  const { classes } = props;
  
  const renderTableHeaders = () => {
    localArrayHeaderData.map((headerValue, indexValue) => {
      if (indexValue === 0) {
        console.log(<TableCell key={'iEnteredThis'}>headerValue</TableCell>);
        return <TableCell key={indexValue}>{headerValue}</TableCell>
      } else {
        console.log(headerValue);
        return <TableCell align='right' key={indexValue}>{headerValue}</TableCell>
      }
    })
  };
  
  return (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        {renderTableHeaders()}
        <TableCell>Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat (g)</TableCell>
        <TableCell align="right">Carbs (g)</TableCell>
        <TableCell align="right">Protein (g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
    </TableBody>
  </Table>
  )};

export default withStyles(materialUiStyles)(DataTable);