import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button : {
    margin : theme.spacing.unit
  },
  input : {
    display : 'none'
  }
});

const CustomButton = (props) => {
  
  return (
    <React className="Fragment">
      <Button
        variant='outlined'
        color='secondary'
        className={props.classes.button}
      >
        {this.props.children}
      </Button>
    </React>
  )
};

export default withStyles(styles)(CustomButton);
