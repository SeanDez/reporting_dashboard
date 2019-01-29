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

const CallToActionContainer = styled.div(props => (
  {
  display: 'flex',
  justifyContent: 'space-around',
  maxWidth: '350px',
  margin: '0 auto',
  fontSize: '0.85em',
}));




const ActionButton = styled(Button)`
  display      : block;
  //margin       : 0 auto;
  padding : 0 8vw !important;
  border       : 1px solid #000 !important;
  border-radius : 3%;
`;

const InputFieldContainer = styled.div`
  display: flex;
  margin-bottom: 3vh;
  //&&:not(:last-child) { // gives it to the last child and ignores the others
  //  margin-right: 1vw !important;
  //}
`;

const StyledTextField = styled(TextField)`
  margin-right: 1vw !important;
  &:last-of-type {
    margin-right: 0 !important;
  }
`;

// entire component/function is being given to the returned function withstyles()
// I didn't know this syntax until recently. But now it is clear
class AccessForm extends React.Component {
  
  
  loginLocally = (formikValues) => {
    console.log("====formikValues====");
    console.log(formikValues);
    // ${process.env.REACT_APP_BACKEND_DOMAIN}
    return axios.post(`http://localhost:4000/log-in`, {
      username : formikValues.username,
      password : formikValues.password
    })
     .then(response => {
       if (response.data.id) {
         console.log("===inside .then, posting userInfo===");
         console.log(response.data.id);
         
         // update ViewState
         this.props.dispatchUpdateView('backEnd');
         this.props.history.push('/dashboard')
       }
     })
  };
  
 renderOtherOptionLink = () => {
  if (this.props.formType === 'signUp') {
    return (
      <React.Fragment>
        Have an account?<br />
        Log in instead
      </React.Fragment>
    );
  } else if (this.props.formType === 'logIn') {
    return (
      <React.Fragment>
        Don't have an account?<br />
        Create one now
      </React.Fragment>
    );
  }};
  
 componentDidMount() {
   console.log("===this.props.history===");
   console.log(this.props.history)
 }
  
  render() {
    const OuterContainer = styled.div`
      ${this.props.outerContainerStyle}
    `;
    const {formType} = this.props;
  
    const Container = styled.div(SCProps => {
      // has access to prop object in here
      
      return {
        border : "1px dotted red",
        maxWidth: this.props.formType === 'signUp' ? "550px" : "450px",
        textAlign: "center",
        margin: "0 auto 0 auto",
        padding: "2vh 2vw",
        backgroundColor: "#FFF",
        borderRadius: "3%",
      }});
    
    
    return (
      <React.Fragment>
        <OuterContainer>
          <Container>
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
                this.loginLocally(values);
              } }
            >
              { formikProps => {
                // ton of destructured props below
                const {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting} = formikProps;
                const { classes } = this.props; // The component prop object
  
                return (
                  <form onSubmit={ handleSubmit }>
                    <Paper elevation={ 2 } className={ classes.paper }>
                      <Typography variant='h5' component="h3">
                        {formType === 'signUp' ?
                         "Sign Up" :
                         "Log Into Your Account" }
                      </Typography>
                      
                      {formType === 'signUp' && <p style={{
                        textAlign : 'center',
                        fontStyle : 'italic',
                        color : '#666',
                        fontSize : '0.8em'
                      }}>
                        Choose a username and password below to create a new account.
                        (Note: New accounts won't have any information to display. Use "admin" / "123456" to login with the demo account)
                      </p>}
        
                      <InputFieldContainer>
                        <StyledTextField
                          required
                          label='Username'
                          // defaultValue='admin'
                          name='username'
                          // className={classes.textField}
                          // value={this.state.name}
                          margin="normal"
                          helperText={formType === 'logIn' && "default: \"admin\" for demo account"}
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.username }
                          // style={{     marginRight: '1vw' }}
                        />
                        <StyledTextField
                          required
                          label='Password'
                          type='password'
                          // defaultValue='123456'
                          name='password'
                          margin='normal'
                          helperText={formType === 'logIn' && "default: \"123456\" for demo account"}
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.password }
                          // style={{     marginRight: '1vw' }}
                        />
                        
                        {formType === 'signUp' && (
                          <StyledTextField
                            required
                            label='Confirm Password'
                            type='password'
                            // defaultValue='123456'
                            name='password2'
                            margin='normal'
                            helperText={formType === 'logIn' && "default: \"123456\" for demo account"}
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            value={ values.password }
                            // style={{     marginRight: '5vw' }}
                          />
                        )}
                      </InputFieldContainer>
                      
                      <CallToActionContainer>
                        <ActionButton
                          type="submit"
                          style={{ marginRight : '2vw' }}
                        >{this.props.formType === 'signUp' ?
                          "Sign Up" : "Log In"
                        }</ActionButton>
                        <StyledLink to={this.props.formType === 'signUp' ? '/log-in' : '/sign-up'}>
                          {this.renderOtherOptionLink()}
                        </StyledLink>
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