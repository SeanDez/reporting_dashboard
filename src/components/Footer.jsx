import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  height: 10vh;
  width: 100%;
  background-color: #3f51b5;
`;


export default (props) => {
  return (
    <React.Fragment>
      <Container style={{...props.styleProp}}/>
    </React.Fragment>
  );
};