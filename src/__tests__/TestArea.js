const React = require("react");
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

import PropTypes from 'prop-types';
// import sinon from 'sinon';

enzyme.configure({ adapter : new Adapter() });


// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       fromConstructorUnused : 'fromConstructorUnused',
//       testIncrement : 1
//     };
//   }
//
//   handleIncrement = (incrementSize) => {
//     this.setState({
//       testIncrement : this.state.testIncrement += incrementSize
//     })
//   };
//
//   render() {
//     const { propUsed, fromSetProps } = this.props;
//     return (
//       <div className='classNamePropUsed'>
//         {propUsed}
//       </div>
//     );
//   }
// }
// // Foo.propTypes = {
// //   id: PropTypes.string.isRequired,
// // };
//
// const wrapper = enzyme.shallow(
//   <Foo
//     propUnused="propUnused"
//     propUsed='propUsed'
//     propNumber={5}
// />
// );
//
//
// test('props and state', () => {
// // method calls
// wrapper.instance().handleIncrement({this.props.propNumber});
//
//   // setter methods
//   wrapper.setProps({ fromSetProps: 'fromSetProps' });
//   wrapper.setState({ fromSetstate: 'fromSetstate' });
//
//
//   console.log(wrapper.state(), `=====wrapper.state=====`);
//   console.log(wrapper.props(), `=====wrapper.props=====`);
//
//   // expect(wrapper.props('fromSetProps')).toEqual('fromSetProps')
//   // expect(wrapper.props('name')).toEqual('Moe');
//   expect(wrapper.state('fromConstructorUnused')).toEqual('fromConstructorUnused');
//   expect(wrapper.state('testIncrement')).toEqual(5); // 2
// });




// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       testIncrement : 1
//     };
//   }
//
//   handleIncrement = (incrementSize) => {
//     console.log(this.props.testArray.length);
//     this.setState({
//       testIncrement : this.state.testIncrement += incrementSize
//     })
//   };
//
//   render() {
//     // const { propNumber } = this.props;
//     return (
//       <div>
//         Test
//       </div>
//     );
//   }
// }



// const wrapper = enzyme.shallow(
//   <Foo
//     propNumber={5}
//     testArray={[1,1,1,1]}
//   />
// );
//
//
// test.skip('prop passage into shallow instance', () => {
// // method calls
//   wrapper.instance().handleIncrement([this.props.propNumber]);
//
//   expect(wrapper.state('testIncrement')).toEqual(5); // 2
// });



class Foo extends React.Component {

  
  handleIncrement = (incrementSize) => {
    console.log(this.props.testArray.length);
    this.setState({
      testIncrement : this.state.testIncrement += incrementSize
    })
  };
  
  render() {
    // const { propNumber } = this.props;
    return (
      <div>
        Test
      </div>
    );
  }
}



const wrapper = enzyme.shallow(
  <Foo
    propNumber={5}
    testArray={[1,1,1,1]}
  />
);


test.skip('prop passage into shallow instance', () => {
// method calls
  wrapper.instance().handleIncrement([this.props.propNumber]);
  
  expect(wrapper.state('testIncrement')).toEqual(5); // 2
});
































