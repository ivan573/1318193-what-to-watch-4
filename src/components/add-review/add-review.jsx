import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

import avatar from "../../../public/img/avatar.jpg";

const RATING_MULTIPLIER = 2;

const REVIEW_BACKGROUND_COLOR = `#b7b3b2`;
const BUTTON_TEXT_COLOR = `#252525`;

const MINIMUM_LENGTH = 50;
const MAXIMUM_LENGTH = 400;

const ratings = [1, 2, 3, 4, 5];

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.props.changeActiveItem(ratings.length);

    this.textRef = createRef();
    this.buttonRef = createRef();
  }

  // componentDidMount() {
  //   this.textRef.current.setCustomValidity(`The review should contain at least ${MINIMUM_LENGTH} characters`);
  // }

  render() {
    const {activeItem, changeActiveItem, movie, restoreMovies} = this.props;

    return (
      <section className="movie-card movie-card--full" style={{backgroundColor: movie.color}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.background} alt={movie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link" onClick={restoreMovies}>
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.getMovieInfo(movie.id)} className="breadcrumbs__link">{movie.title}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <Link to={AppRoute.MY_LIST}>
                  <img src={avatar} alt="User avatar" width="63" height="63" />
                </Link>
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={movie.poster} alt={movie.title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                {ratings.map((it) => {
                  return (
                    <React.Fragment key={it}>
                      <input className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it}/>
                      <label className="rating__label" htmlFor={`star-${it}`} onClick={() => changeActiveItem(it)}>Rating {it}</label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="add-review__text" style={{backgroundColor: REVIEW_BACKGROUND_COLOR}}>
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                minLength={MINIMUM_LENGTH}
                maxLength={MAXIMUM_LENGTH}
                ref={this.textRef}
                onInput={() => this._checkTextLength(this.textRef.current.value, this.buttonRef.current)}>
              </textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  ref={this.buttonRef}
                  onClick={(evt) => this._onSubmit(evt, movie.id, activeItem, this.textRef.current.value, this.buttonRef.current)}
                  disabled
                  style={{color: BUTTON_TEXT_COLOR}}>Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }

  _checkTextLength(text, button) {
    if (text.length < MINIMUM_LENGTH || text.length > MAXIMUM_LENGTH) {
      button.setAttribute(`disabled`, `disabled`);
    } else {
      button.removeAttribute(`disabled`);
    }
  }

  _onSubmit(evt, id, rating, text, button) {
    evt.preventDefault();

    button.setAttribute(`disabled`, `disabled`);

    this.props.onSubmitClick(id, rating * RATING_MULTIPLIER, text.trim())
    .then(() => button.removeAttribute(`disabled`));
  }
}

AddReview.propTypes = {
  activeItem: PropTypes.number,
  changeActiveItem: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  restoreMovies: PropTypes.func.isRequired
};

export {AddReview as default};
