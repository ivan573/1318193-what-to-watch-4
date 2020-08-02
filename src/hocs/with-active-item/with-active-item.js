import React, {PureComponent} from "react";
// import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

    }

    render() {

      return (
        <Component

        />
      );
    }
  }

  return WithActiveItem;
};

export {withActiveItem as default};
