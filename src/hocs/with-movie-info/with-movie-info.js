import React, {PureComponent} from "react";
// import PropTypes from "prop-types";

import {TabOption} from "../../components/tabs/tabs.jsx";

const withMovieInfo = (Component) => {
  class WithMovieInfo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {activeTab: TabOption.OVERVIEW};

      this._tabClickHandler = this._tabClickHandler.bind(this);
    }

    render() {
      const {activeTab} = this.state;
      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onTabClick={this._tabClickHandler}
        />
      );
    }

    _tabClickHandler(evt, tab) {
      evt.preventDefault();
      this.setState({activeTab: tab});
    }
  }

  // WithMoviesList.PropTypes = {};

  return WithMovieInfo;
};

export {withMovieInfo as default};
