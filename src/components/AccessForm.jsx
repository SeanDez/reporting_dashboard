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
import { Link } from "react-router-dom";

import {Formik}   from "formik";

const yup = require("yup");


const Container = styled.div`
  border : 1px dotted red;
  max-width: 450px;
  text-align: center;
  margin: 0 auto 0 auto;
  padding: 2vh 2vw;
  background-color: #FFF;
  border-radius: 3%;
`;

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
  font-style: italic;
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 325px;
  margin: 0 auto;
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

const SignupButton = styled(Button)`
  display      : block;
  margin       : 0 auto;
  border       : 1px solid #000 !important;
  borderRadius : 3;
`;

const InputFieldContainer = styled.div`
  display: flex;
  margin-bottom: 3vh;
`;



// entire component/function is being given to the returned function withstyles()
// I didn't know this syntax until recently. But now it is clear
class AccessForm extends React.Component {
  state = {
    formType : ''
  };
  

  
  render() {
    const OuterContainer = styled.div`
      ${this.props.outerContainerStyle}
    `;
    const formTypeStateIsFalsePropIsTrue = (this.state.formType === '') &&
                                          (this.props.formType);
    
    return (
      <React.Fragment>
        <OuterContainer>
          <Container>
            
            <h1>{this.props.formType}</h1>
            
            <Formik
              initialValues={ {username : "admin", password : "123456"} }
              validationSchema={ yup.object().shape({
                username : yup.string().required("Username is required"),
                password : yup.string().required("Password is required"),
              }) }
              // onBlur={ (keyEvent) => { // TODO fix onBlur / handleBlur
              //   console.log(keyEvent.target.value);
              // } }
              // handleBlur={ (keyEvent) => {
              //   console.log(keyEvent.target.value);
              // } }
              onSubmit={ (values, actions) => {
                console.log("ping");
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                
              } }
            >
              { formikProps => {
                // ton of destructured props below
                const {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting} = formikProps;
                const { classes } = this.props; // The component prop object
  
                return (
                  <form onSubmit={ handleSubmit }>
                    <Paper elevation={ 2 } className={ classes.paper }>
                      <Typography variant='h5' component="h3">Sign Up to Access the Reporting Area</Typography>
        
                      <InputFieldContainer>
                        <TextField
                          required
                          label='Username'
                          // defaultValue='admin'
                          name='username'
                          // className={classes.textField}
                          // value={this.state.name}
                          margin="normal"
                          style={ {marginRight : "2vw"} }
                          helperText='default: "admin" for demo account'
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.username }
                        />
                        <TextField
                          required
                          label='Password'
                          type='password'
                          // defaultValue='123456'
                          name='password'
                          margin='normal'
                          helperText='default: "123456" for demo account'
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.password }
                        />
                      </InputFieldContainer>
        
                      {/*<StyledLink to='/dashboard'>*/ }
        
                      <CallToActionContainer>
                        <SignupButton
                          type="submit"
                          // style={{ marginRight : '2vw' }}
                        >Sign up</SignupButton>
                        <StyledLink to='/log-in'>Have an account?<br />Log in instead</StyledLink>
                      </CallToActionContainer>
      
                    </Paper>
                  </form>
                );
              } }
            </Formik>
          </Container>
        </OuterContainer>
      </React.Fragment>
    );
  };
};

export default withStyles(injectedStyles)(AccessForm);