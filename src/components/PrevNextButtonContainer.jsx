import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
  button : {
    margin : theme.spacing.unit
  },
  input : {
    display : 'none'
  }
});

const NUMBERS = Object.freeze({
  totals : 12,
  topDonors : 10,
  noneForPeriod : 15
});


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const renderPreviousButton = (props) => {
  const {viewMarker, preparedReportData, REPORT_OPTION} = props;
  const increment = NUMBERS[REPORT_OPTION];

  if (viewMarker === 0) {
    return null
    // if marker fails === 0 and is less than report iterator size
  } else if (viewMarker < increment) {
    return <Button variant='outlined' className={ props.classes.button}>1 to {props.viewMarker}</Button>
  } else {
    return <Button variant='outlined' className={ props.classes.button}>{(props.viewMarker + 1) - increment} to {props.viewMarker + 1}</Button>
  }
};




const renderNextButton = props => {
  const {viewMarker, preparedReportData, REPORT_OPTION} = props;
  const increment = NUMBERS[REPORT_OPTION];
  if (viewMarker > preparedReportData.length - increment) {
    return <Button variant='outlined' className={ props.classes.button}>
      {viewMarker + 1 + increment} to {preparedReportData.length} // auto-adds 1
    </Button>
  } else {
    return <Button variant='outlined' className={ props.classes.button}>
      {viewMarker + 1 + increment} to {viewMarker + increment * 2}
    </Button>
  }
};

const renderCurrentRecordCount = (props) => {
  const {viewMarker, preparedReportData, REPORT_OPTION} = props;
  const increment = NUMBERS[REPORT_OPTION];
  
  // 297 > 303 - 10
  if (viewMarker > preparedReportData.length -1 - increment) {
    return `${viewMarker + 1} to ${preparedReportData.length}, of ${preparedReportData.length} total`
  } else {
    return `${viewMarker + 1} to ${viewMarker + increment}, of ${preparedReportData.length} total`
  }
};



const PrevNextButtonContainer = props => {
  return (
    <React.Fragment>
      <ButtonContainer>
        <Button
          variant='outlined' className={ props.classes.button }
          disabled={ props.viewMarker === 0 }
          onClick={ () => props.updateViewMarker(NUMBERS[props.REPORT_OPTION], "-") }
        >Previous</Button>
        
        <p>{ renderCurrentRecordCount(props) }</p>
        
        <Button
          variant='outlined' className={ props.classes.button }
          disabled={ props.viewMarker >= props.preparedReportData.length - NUMBERS[props.REPORT_OPTION] }
          onClick={ () => props.updateViewMarker(NUMBERS[props.REPORT_OPTION], '+')}
        >Next</Button>
      </ButtonContainer>
    </React.Fragment>
  );
};


PrevNextButtonContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrevNextButtonContainer);