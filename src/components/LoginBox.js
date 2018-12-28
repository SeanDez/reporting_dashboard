import React from "react";
import styled from "styled-components";
import {withStyles} from "@material-ui/core/styles";
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const injectedStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  paper : {
    ...theme.mixins.gutters(),
    paddingTop : theme.spacing.unit * 2,
    paddingBottom : theme.spacing.unit * 2,
  }
});

const StyledLink = styled(Link)`
  text-decoration: none;
`

const LoginBox = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <form>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant='h5' component="h3">Test Paper</Typography>
        <TextField
          required
          label='Username'
          defaultValue='admin'
          // className={classes.textField}
          // value={this.state.name}
          margin="normal"
          helperText='default: "admin" for demo account'
        />
        <TextField
          required
          label='Password'
          type='password'
          defaultValue='123456'
          margin='normal'
          helperText='default: "123456" for demo account'
        />

        <StyledLink to='/dashboard'>
          <Button>Log In</Button>
        </StyledLink>
      </Paper>
      </form>
    </React.Fragment>
  )
};

export default withStyles(injectedStyles)(LoginBox);