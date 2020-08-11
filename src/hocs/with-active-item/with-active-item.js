import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };

      this._changeActiveItem = this._changeActiveItem.bind(this);
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

  return WithActiveItem;
};

export {withActiveItem as default};
