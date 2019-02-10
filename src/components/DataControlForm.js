import React        from "react";
import styled from "styled-components";
// import {withStyles} from "@material-ui/core";

const StyledLink = styled.a`
  margin-left: 2vw;
  margin-right: 2vw;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2vw;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  //border: 3px dashed green;
`;

export default (props) => {
  
  const linkArray = [
    {
      label : 'Top Donors',
      relativeUrl : '/top-donors'
    },
    {
      label : 'No Donations: Last 3 Months',
      relativeUrl : '/no-donations-3-months'
    }
  ];
  
  return (
    <React.Fragment>
      <Container>
      {linkArray.map((linkItem, index) => {
        return (
          <StyledLink key={index} href={linkItem.relativeUrl}>{linkItem.label}</StyledLink>
        )})}
      </Container>
    </React.Fragment>
  )
};