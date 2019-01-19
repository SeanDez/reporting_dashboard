import React from "react";
import styled from "styled-components";
import {withStyles} from "@material-ui/core/styles";
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Formik} from "formik";
import { Link } from "react-router-dom";

const yup = require("yup");


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
`;


const loginLocally = (props) => {
  axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/log-in`, {
    username : this.state.username,
    password : this.state.password
  })
    .then(response => {
      if (response.data.userInfo) {
        // needs to update the redux store
      }
    })
};


const LoginBox = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      
      <Formik
        initialValues={ {username : "admin", password : "123456"} }
        validationSchema={yup.object().shape({
          username : yup.string().required("Username is required"),
          password : yup.string().required('Password is required')
        })}
        onSubmit={ (values, {setSubmitting}) => {
          // the api call goes either here on onClick on the button
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        } }
      >
        { props => { // ton of destructured props below
          const {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props;
          
          return (
            <form onSubmit={ handleSubmit }>
              <Paper elevation={ 2 } className={ classes.paper }>
                <Typography variant='h5' component="h3">Test Paper</Typography>
                <TextField
                  required
                  label='Username'
                  defaultValue='admin'
                  // className={classes.textField}
                  // value={this.state.name}
                  margin="normal"
                  helperText='default: "admin" for demo account'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.usrname}
                />
                <TextField
                  required
                  label='Password'
                  type='password'
                  defaultValue='123456'
                  margin='normal'
                  helperText='default: "123456" for demo account'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
  
                <input
                  id="email"
                  placeholder="Enter your email"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                
                <StyledLink to='/dashboard'>
                  <Button style={ {
                    display      : "block",
                    margin       : "0 auto",
                    border       : "1 px solid #000",
                    borderRadius : "3%",
                  } }>Log In</Button>
                </StyledLink>
              </Paper>
            </form>
          ) }}
      </Formik>
      
      
      {/*<form>*/}
        {/*<Paper elevation={ 2 } className={ classes.paper }>*/}
          {/*<Typography variant='h5' component="h3">Test Paper</Typography>*/}
          {/*<TextField*/}
            {/*required*/}
            {/*label='Username'*/}
            {/*defaultValue='admin'*/}
            {/*// className={classes.textField}*/}
            {/*// value={this.state.name}*/}
            {/*margin="normal"*/}
            {/*helperText='default: "admin" for demo account'*/}
          {/*/>*/}
          {/*<TextField*/}
            {/*required*/}
            {/*label='Password'*/}
            {/*type='password'*/}
            {/*defaultValue='123456'*/}
            {/*margin='normal'*/}
            {/*helperText='default: "123456" for demo account'*/}
          {/*/>*/}
          {/**/}
          {/*<StyledLink to='/dashboard'>*/}
            {/*<Button style={ {*/}
              {/*display      : "block",*/}
              {/*margin       : "0 auto",*/}
              {/*border       : "1 px solid #000",*/}
              {/*borderRadius : "3%",*/}
            {/*} }>Log In</Button>*/}
          {/*</StyledLink>*/}
        {/*</Paper>*/}
      {/*</form>*/}
    </React.Fragment>
  );
};

export default withStyles(injectedStyles)(LoginBox);