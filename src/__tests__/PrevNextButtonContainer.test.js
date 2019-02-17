import React from "react";
import {shallow, mount, configure} from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

import PrevNextButtonContainer from "../components/PrevNextButtonContainer";
import Button from '@material-ui/core/Button'

const adapter = new Adaptor();
configure({ adapter });


const wrappedPNBContainer = shallow(<PrevNextButtonContainer
  viewMarker={null}
  preparedReportData={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]} // 40
/>);
const mountedPNB = mount(<PrevNextButtonContainer
  viewMarker={null}
  preparedReportData={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]} // 40
/>);



test('buttons at viewMarker 0 of 40', () => {
  const props = {
    classes : {
      button : null
    }
  }
  
  wrappedPNBContainer.setProps({ viewMarker : 0 });
  mountedPNB.setProps({ viewMarker : 0 });
  console.log(mountedPNB.html());
  
  // expect(mountedPNB.containsMatchingElement(<p>Test</p>)).toEqual(true);
  // expect(mountedPNB.containsMatchingElement(
  {/*<Button variant='outlined' className={ props.classes.button}>Previous</Button>*/}
  {/*)).toEqual(true);*/}

  expect(wrappedPNBContainer.contains(<p>1 to 20</p>)).toEqual(true)
  
});


test('buttons at viewMarker 20 of 40', () => {

});

test('buttons at viewMarker 35 of 40', () => {

});