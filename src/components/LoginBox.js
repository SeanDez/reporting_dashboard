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


const Container = styled.div`
  border : 1px dotted red;
  max-width: 450px;
  text-align: center;
  margin: 0 auto 0 auto;
`;

const LoginButton = styled(Button)`
  display      : block;
  margin       : 0 auto;
  border       : 1px solid #000 !important;
  borderRadius : 3;
`;

const InputFieldContainer = styled.div`
  display: flex;
`;

const LoginBox = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      
      <Container>
        <Formik
          initialValues={ {username : "admin", password : "123456"} }
          validationSchema={ yup.object().shape({
            username : yup.string().required("Username is required"),
            password : yup.string().required("Password is required"),
          }) }
          onBlur={ (keyEvent) => {
            console.log(keyEvent.target.value);
          } }
          handleBlur={ (keyEvent) => {
            console.log(keyEvent.target.value);
          } }
          onSubmit={ (values, {setSubmitting}) => {
            // the api call goes either here on onClick on the button
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          } }
        >
          { props => { // ton of destructured props below
            const {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting} = props;
            
            return (
              <form onSubmit={ handleSubmit }>
                <Paper elevation={ 2 } className={ classes.paper }>
                  <Typography variant='h5' component="h3">Test Paper</Typography>
                  
                  <InputFieldContainer>
                    <TextField
                      required
                      label='Username'
                      defaultValue='admin'
                      name='username'
                      // className={classes.textField}
                      // value={this.state.name}
                      margin="normal"
                      helperText='default: "admin" for demo account'
                      onChange={ handleChange }
                      onBlur={ handleBlur }
                      value={ values.username }
                    />
                    <TextField
                      required
                      label='Password'
                      type='password'
                      defaultValue='123456'
                      name='password'
                      margin='normal'
                      helperText='default: "123456" for demo account'
                      onChange={ handleChange }
                      onBlur={ handleBlur }
                      value={ values.password }
                    />
                  </InputFieldContainer>
                  
                  {/*Test input*/ }
                  
                  {/*<input*/ }
                  {/*id="email"*/ }
                  {/*placeholder="Enter your email"*/ }
                  {/*type="text"*/ }
                  {/*value={values.username}*/ }
                  {/*onChange={handleChange}*/ }
                  {/*onBlur={handleBlur}*/ }
                  {/*className={*/ }
                  {/*errors.email && touched.email ? 'text-input error' : 'text-input'*/ }
                  {/*}*/ }
                  {/*/>*/ }
                  
                  <StyledLink to='/dashboard'>
                    <LoginButton>Log In</LoginButton>
                  </StyledLink>
                </Paper>
              </form>
            );
          } }
        </Formik>
      </Container>
    
    </React.Fragment>
  );
};

export default withStyles(injectedStyles)(LoginBox);