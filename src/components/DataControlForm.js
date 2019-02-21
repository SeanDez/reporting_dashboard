import React        from "react";
import styled from "styled-components";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {retrieveTopDonors, retrieveNoRecentDonations, retrieveMonthlyTotals} from '../services/reports';


const muiStyles = muitheme => ({
  button : {
    margin : muitheme.spacing.unit * 2,
    paddingLeft : '5vw',
    paddingRight : '5vw',
    marginLeft : '2vw',
    marginRight : '2vw',
    lineHeight : '1rem'
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
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  //border: 3px dashed green;
`;

const StyledHeader = styled.h4`
  margin-top: 10vh;
  text-align: center;
`;


const DataControlForm = (props) => {
  
  const buttonArray = [
    {
      label        : "Top Donors",
      tag          : "topDonors",
      relativeUrl  : "#",
      clickHandler : () => {
        const topDonorData = retrieveTopDonors(props.rawReportData);
        props.dispatchUpdatePreparedReportData(topDonorData);
        props.updateReportOption("topDonors");
      },
    }, {
      label        : "No Recent Donations",
      tag : 'noRecentDonations',
      relativeUrl  : "#",
      clickHandler : () => {
        const noRecentDonationData = retrieveNoRecentDonations(props.rawReportData);
        props.dispatchUpdatePreparedReportData(noRecentDonationData);
        props.updateReportOption("noRecentDonations");
      },
    }, {
      label        : "Total Monthly Donations",
      tag : 'totals',
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
      <StyledHeader>View Another Report</StyledHeader>
      <Container>
      {buttonArray.map(buttonItem => {
        return (
          <React.Fragment>
            <Button
              variant='outlined'
              className={props.classes.button}
              disabled={buttonItem.tag == props.REPORT_OPTION}
              onClick={ buttonItem.clickHandler }
            >
              { buttonItem.label }
            </Button>
          </React.Fragment>
        );})}
      </Container>
    </React.Fragment>
  )
};

export default withStyles(muiStyles)(DataControlForm);