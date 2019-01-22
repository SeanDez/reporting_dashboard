import React from "react";
import styled from "styled-components";

export default (props) => {
  
  const Spacer = styled.div`
  padding-top : ${ props.paddingTop };
  padding-bottom : ${ props.paddingBottom };
  padding-left : ${ props.paddingLeft };
  padding-right : ${ props.paddingRight };
  margin-top : ${ props.marginTop };
  margin-bottom : ${ props.marginBottom };
  margin-left : ${ props.marginLeft };
  margin-right : ${ props.marginRight };
`;
  
  
  return (
    <Spacer>
      {props.children}
    </Spacer>
  )
};