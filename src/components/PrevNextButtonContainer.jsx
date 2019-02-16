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
  topDonors : 10
});


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const renderPreviousButton = (props) => {
  const {viewMarker, preparedReportData, REPORT_OPTION} = props;
  if (viewMarker === 0) {
    return null
    // if marker fails === 0 and is less than report iterator size
  } else if (viewMarker < NUMBERS[REPORT_OPTION]) {
    return <Button variant='outlined' className={ props.classes.button} >1 to {props.viewMarker}</Button>
  } else {
    return <Button variant='outlined' className={ props.classes.button}>{(props.viewMarker + 1) - NUMBERS[REPORT_OPTION]} to {props.viewMarker + 1}</Button>
  }
};


const ButtonContainerState = {
  hidePrev : null, // render the current text and next button. normal next button
  crunchedBeginning : null, // all 3 buttons. prev is 1 to vm
  normalRange : null, // all 3 show normal range
  crunchedEnd : null, // next is set to prd.len - increment
  hideNext : null, //
}


const PrevNextButtonContainer = props => {
  console.log(props);
  const {REPORT_OPTION} = props;
  return (
    <React.Fragment>
      <ButtonContainer>
  
        {renderPreviousButton(props)}
        
        { props.viewMarker + 1 } - { props.viewMarker + NUMBERS[REPORT_OPTION] }
        
        
        
        <Button variant='outlined' className={ props.classes.button }>
          {/* vm - vm + */ }
          { props.viewMarker + NUMBERS[REPORT_OPTION] + 1 }
          -
          { props.viewMarker + (NUMBERS[REPORT_OPTION] * 2) }
        </Button>
      </ButtonContainer>
    </React.Fragment>
  );
};


PrevNextButtonContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrevNextButtonContainer);