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