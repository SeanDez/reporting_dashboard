import React        from "react";
import styled from "styled-components";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {retrieveTopDonors, retrieveNoRecentDonations, retrieveMonthlyTotals} from '../services/reports';


const muiStyles = muitheme => ({
  button : {
    margin : muitheme.spacing.unit * 2,
    paddingLeft : '5vw',
    paddingRight : '5vw'
  },
});

const StyledLink = styled.a`
  margin-left: 2vw;
  margin-right: 2vw;
  text-align: center;
  text-decoration: none;
  color: black;
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



const DataControlForm = (props) => {
  
  const linkArray = [
    {
      label        : "Top Donors",
      relativeUrl  : "#", // '/dashboard/top-donors',
      clickHandler : () => {
        const topDonorData = retrieveTopDonors(props.rawReportData);
        props.dispatchUpdatePreparedReportData(topDonorData);
        props.updateReportOption("topDonors");
      },
    }, {
      label        : "No Recent Donations",
      relativeUrl  : "#", // '/dashboard/no-recent-donations',
      clickHandler : () => {
        const noRecentDonationData = retrieveNoRecentDonations(props.rawReportData);
        props.dispatchUpdatePreparedReportData(noRecentDonationData);
        props.updateReportOption("noRecentDonations");
      },
    }, {
      label        : "Total Monthly Donations",
      relativeUrl  : "#",
      clickHandler : () => {
        const monthlyTotals = retrieveMonthlyTotals(props.rawReportData);
        props.dispatchUpdatePreparedReportData(monthlyTotals);
        props.updateReportOption("totals");
      },
    },
  ];
  
  return (
    <React.Fragment>
      <Container>
      {linkArray.map((linkItem) => {
        return (
          <React.Fragment>
            <Button
              variant='outlined'
            >
              <StyledLink
                key={ linkItem.label }
                href={ linkItem.relativeUrl }
                onClick={ linkItem.clickHandler }
              >
                { linkItem.label }
              </StyledLink>
            </Button>
          </React.Fragment>
        );})}
      </Container>
    </React.Fragment>
  )
};

export default withStyles(muiStyles)(DataControlForm);