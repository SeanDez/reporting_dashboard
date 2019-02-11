import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";


const CircularProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
`;


export default (Component) => {
  return function EnhancedComponent({isLoading, ...props}) {
    // ^ this is how a new prop is injected
    
    if (!isLoading) {
      return <Component {...props} />
    }
    
    return (
      <CircularProgressContainer>
        <CircularProgress />
      </CircularProgressContainer>
    )
  }
};

