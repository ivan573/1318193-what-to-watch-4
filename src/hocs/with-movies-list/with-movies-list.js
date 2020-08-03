import React, {PureComponent} from "react";
// import PropTypes from "prop-types";

const PLAY_DELAY = 1000;

const withMoviesList = (Component) => {
  class WithMoviesList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null,
        timeout: null
      };

      this._onMouseOverCard = this._onMouseOverCard.bind(this);
      this._onMouseOutOfCard = this._onMouseOutOfCard.bind(this);
      // this._onCardClick = this._onCardClick.bind(this);
    }

    render() {
      const {activeCard} = this.state;

      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          // onCardClick={this._onCardClick}
          onMouseOverCard={this._onMouseOverCard}
          onMouseOutOfCard={this._onMouseOutOfCard}
        />
      );
    }

    _onMouseOverCard(movie) {
      if (!this.state.activeCard) {
        const timeout = setTimeout(() => this.setState({activeCard: movie}), PLAY_DELAY);
        this.setState({timeout});
      }
    }

    _onMouseOutOfCard() {
      clearTimeout(this.state.timeout);
      this.setState({activeCard: null, timeout: null});
    }

    // _onCardClick() {
    //   clearTimeout(this._onMouseOverCard());
    //   this.props.onCardClick();
    // }
  }

  // WithMoviesList.PropTypes = {};

  return WithMoviesList;
};

export {withMoviesList as default};
