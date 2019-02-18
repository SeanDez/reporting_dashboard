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


// internal if statement vs Enum functions
const renderTableBody = Object.freeze({
  totals : (props) => {
    return props.displayedData
       .sort((a, b) => {
         return b.x - a.x; // descending
       })
       .map(record => {
         return (
           <TableRow key={ record.x.toString() }>
             <TableCell>{
               new moment(record.x)
                   .format("MMMM YYYY")
             }</TableCell>
             
             <TableCell align='left'>
               { `$${ record.y.toLocaleString(undefined, {maximumFractionDigits : 2}) }` }
             </TableCell>
           </TableRow>
         );
       });
  },
  topDonors : (props) => {
    return props.displayedData.map((record, index) => (
      <TableRow key={`${index} ${record.id}`}>
        <TableCell align='left'>{record.id}</TableCell>
        <TableCell align='left'>
          {record.firstName}</TableCell>
        <TableCell align='left'>
          {record.lastName}</TableCell>
        <TableCell align='left'>
          {record.amountDonated}</TableCell>
        <TableCell align='left'>
          {record.notes}</TableCell>
      </TableRow>
    ))
  }
  
});


const DataTable = (props) => {
  const { classes } = props;
  
  const HEADINGS = Object.freeze({
    totals        : ['Period', 'Total Donations'],
    topDonors     : ['Donor ID', 'First Name', 'Last Name', 'Total Donation', 'Notes'],
    noneForPeriod : ['First Name', 'Last Name', 'Last Donation', 'Notes']
  });
  
  const tableHeading = (index, heading) => {
    if (index === 0) {
      return <TableCell key={heading}>{heading}</TableCell>
    }
    return <TableCell align='right' key={heading}>{heading}</TableCell>
  };
  
  return (
    <StyledTableWrapper className={ classes.table } style={ {marginTop : "62px"} }>
      <TableHead>
        <TableRow>
          {/* Select a local Enum based on parent state */}
          {HEADINGS[props.REPORT_OPTION].map((heading, index) => {
            // conditional rendered heading
              return tableHeading(index, heading)
            })}
        </TableRow>
      </TableHead>
      
      <TableBody>
        {console.log(props.displayedData, `=====props.displayedData=====`)}
        { renderTableBody[props.REPORT_OPTION](props) }
      </TableBody>
    </StyledTableWrapper>
  );};

export default withStyles(materialUiStyles)(DataTable);