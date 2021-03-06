import React from "react";
import {shallow, mount, configure} from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

import PrevNextButtonContainer from "../components/PrevNextButtonContainer";
import Button from '@material-ui/core/Button'

const adapter = new Adaptor();
configure({ adapter });


beforeEach(() => {
  mountedPNBC.mount();
});

afterEach(() => {
  mountedPNBC.unmount();
});

const shallowPNBC = shallow(<PrevNextButtonContainer
  classes={{ button : null }}
  viewMarker={null}
  preparedReportData={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]} // 40
/>);
const mountedPNBC = mount(<PrevNextButtonContainer
  // classes={{ button : null }}
  viewMarker={null}
  preparedReportData={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]} // 40
  REPORT_OPTION='totals'
/>);



test('buttons at viewMarker 0 of 40', () => {
  // const props = { classes : { button : null } };
  mountedPNBC.setProps({ viewMarker : 0 }, () => {
    expect(mountedPNBC.contains(<p>1 to 12, of 40 total</p>)).toEqual(true);
  });
  
  ////////////
  
  mountedPNBC.setProps({ REPORT_OPTION :   'topDonors' }, () => {
    expect(mountedPNBC.contains(<p>1 to 10, of 40 total</p>)).toEqual(true)
  });
});


test('buttons at viewMarker 20 of 40', () => {
  
  mountedPNBC.setProps({
    viewMarker : 20,
    REPORT_OPTION : 'totals'
  }, () => {
    expect(mountedPNBC.contains(<p>21 to 32, of 40 total</p>)).toEqual(true)
  });
  
  
  mountedPNBC.setProps({
    viewMarker : 20,
    REPORT_OPTION : 'topDonors'
  }, () => {
    expect(mountedPNBC.contains(<p>21 to 30, of 40 total</p>)).toEqual(true)
  })

});

test('buttons at viewMarker 35 of 40', () => {
  mountedPNBC.setProps({
    viewMarker : 35,
    REPORT_OPTION : 'totals'
  }, () => {
    expect(mountedPNBC.contains(<p>36 to 40, of 40 total</p>)).toEqual(true);
  });
  
  mountedPNBC.setProps({
    viewMarker : 35,
    REPORT_OPTION : 'topDonors'
  }, () => {
    expect(mountedPNBC.containsMatchingElement(<p>36 to 40, of 40 total</p>)).toEqual(true);
  })
});