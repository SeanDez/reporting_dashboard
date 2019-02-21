import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
  button : {
    margin : theme.spacing.unit
  },
});

const NUMBERS = Object.freeze({
  totals : 12,
  topDonors : 10,
  noRecentDonations : 15
});


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;



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