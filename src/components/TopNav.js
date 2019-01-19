import React from 'react';
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';


const StyledLink = styled(Link)`
  && {
  text-decoration: none;
  }
`;

const LoginButton = styled(Button)`
  && {
    border: 2px solid green;
    max-width : 200px;
    margin-left : .5vw;
    margin-right : .5vw;
  }
`;

const NavItemContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const NavButtonContainer = styled.div`
  display : flex;
  justify-content : flex-end;
  //border : 3px dotted deeppink;
  flexBasis : 70px;
  margin-left : auto;
  margin-right : 1vw;
`;

const StyledWordLogo = styled.h4`
  && {
  display: inline;
  //max-width: 25vmin;
  //border: 2px dashed yellow;
  flexBasis : 100px;
  margin-left : 2vw;
  }
`;

const TopNav = (props) => {
  
  return (
  <React.Fragment>
    <AppBar position='fixed' >
      <NavItemContainer>
        <StyledWordLogo>Report Dashboard</StyledWordLogo>
        <NavButtonContainer>
          <StyledLink to='/sign-up'>
            <LoginButton
            >Sign Up</LoginButton>
          </StyledLink>
          <StyledLink to='/log-in'>
            <LoginButton
              variant="outlined"
              color="secondary"
            >Log In
            </LoginButton>
          </StyledLink>
        </NavButtonContainer>
      </NavItemContainer>
    </AppBar>
  </React.Fragment>
  )};

export default TopNav;