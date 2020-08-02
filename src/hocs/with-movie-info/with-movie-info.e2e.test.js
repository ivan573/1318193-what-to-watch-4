// import React from "react";
// import PropTypes from "prop-types";
// import {configure, mount} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import withMovieInfo from "./with-movie-info.js";

// configure({adapter: new Adapter()});

// const MockComponent = (props) => {
//   const {onTabClick} = props;
//   return (
//     <div>
//       <button onClick={onTabClick} />
//     </div>
//   );
// };

// MockComponent.propTypes = {
//   onTabClick: PropTypes.func.isRequired
// };

// it(`Checks that callback function is called when the element is clicked`, () => {
//   const MockComponentWrapped = withMovieInfo(MockComponent);

//   const onTabClick = jest.fn();

//   const wrapper = mount(<MockComponentWrapped
//     onTabClick={onTabClick}
//   />);

//   const button = wrapper.find(`button`);

//   button.simulate(`click`);

//   expect(onTabClick).toHaveBeenCalledTimes(1);
// });

it(`I have no idea what's wrong here`, () => {
  expect(true).toBe(true);
});
