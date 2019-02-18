import React        from "react";
import styled from "styled-components";
// import {withStyles} from "@material-ui/core";
import {retrieveTopDonors} from '../services/reports';
import {updateLocalState} from './DataSection'


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
      relativeUrl : "#", // '/dashboard/top-donors'
      clickHandler : () => {
        const recompiledData = retrieveTopDonors(props.rawReportData);
        props.dispatchUpdatePreparedReportData(recompiledData);
        props.updateReportOption("topDonors");
        }
    },
    {
      label : 'No Recent Donations',
      relativeUrl : '/dashboard/no-recent-donations',
      clickHandler : () => props.updateReportOption('noRecentDonations')
    }
  ];
  
  return (
    <React.Fragment>
      <Container>
      {linkArray.map((linkItem) => {
        return (
          <StyledLink
            key={linkItem.label}
            href={linkItem.relativeUrl}
            onClick={linkItem.clickHandler}
          >
            {linkItem.label}
          </StyledLink>
        )})}
      </Container>
    </React.Fragment>
  )
};