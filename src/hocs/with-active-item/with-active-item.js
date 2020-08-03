import React, {PureComponent} from "react";
// import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };

      this.changeActiveItem = this.changeActiveItem.bind(this);
    }

    render() {

      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          changeActiveItem={this._changeActiveItem}
        />
      );
    }

    _changeActiveItem(activeItem = null) {
      this.setState({activeItem});
    }
  }

  // WithActiveItem.propTypes: {};

  return WithActiveItem;
};

export {withActiveItem as default};
