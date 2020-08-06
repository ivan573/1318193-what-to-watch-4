import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const PLAY_DELAY = 1000;

const withMoviesList = (Component) => {
  class WithMoviesList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        timeout: null
      };

      this._onMouseOverCard = this._onMouseOverCard.bind(this);
      this._onMouseOutOfCard = this._onMouseOutOfCard.bind(this);
    }

    componentWillUnmount() {
      // clears timeout
      this._onMouseOutOfCard();
    }

    render() {
      const activeCard = this.props.activeItem;

      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          onMouseOverCard={this._onMouseOverCard}
          onMouseOutOfCard={this._onMouseOutOfCard}
        />
      );
    }

    _onMouseOverCard(movie) {
      if (!this.props.activeItem) {
        const timeout = setTimeout(() => this.props.changeActiveItem(movie), PLAY_DELAY);
        this.setState({timeout});
      }
    }

    _onMouseOutOfCard() {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
      this.props.changeActiveItem();
    }

  }

  WithMoviesList.propTypes = {
    activeItem: PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired
    }),
    changeActiveItem: PropTypes.func.isRequired
  };

  return WithMoviesList;
};

export {withMoviesList as default};
