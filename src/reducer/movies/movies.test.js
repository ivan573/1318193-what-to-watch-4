import {reducer, ActionCreator, ActionType} from "./movies.js";

const moviesList = [
  {title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    year: 2016,
    id: `fantastic-beasts-the-crimes-of-grindelwald`},
  {title: `Bohemian Rhapsody`,
    genre: `Drama`,
    year: 2018,
    id: `bohemian-rhapsody`},
  {title: `Macbeth`,
    genre: `Drama`,
    year: 2015,
    id: `macbeth`},
  {title: `Aviator`,
    genre: `Drama`,
    year: 2004,
    id: `aviator`},
  {title: `We need to talk about Kevin`,
    genre: `Drama`,
    year: 2011,
    id: `we-need-to-talk-about-kevin`},
  {title: `What We Do in the Shadows`,
    genre: `Comedy`,
    year: 2014,
    id: `what-we-do-in-the-shadows`},
  {title: `Revenant`,
    genre: `Drama`,
    year: 2015,
    id: `revenant`},
  {title: `Johnny English`,
    genre: `Comedy`,
    year: 2003,
    id: `johnny-english`},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    year: 2016,
    id: `fantastic-beasts-the-crimes-of-grindelwald2`},
  {title: `Bohemian Rhapsody`,
    genre: `Drama`,
    year: 2018,
    id: `bohemian-rhapsody2`},

];

describe(`Reducer works properly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      playingMovie: null,
      activeMovie: null,
      moviesList: [],
      shownMovies: [],
      areAllMoviesShown: true
    });
  });

  it(`Reducer changes the playing movie`, () => {
    expect(reducer({
      moviesList,
      shownMovies: moviesList,
      areAllMoviesShown: true}, {
      type: ActionType.CHANGE_PLAYING_MOVIE,
      payload: {playingMovie:
        {
          title: `What We Do in the Shadows`,
          genre: `Comedy`,
          year: 2014,
          id: `what-we-do-in-the-shadows`
        }}
    })).toEqual({
      playingMovie:
      {
        title: `What We Do in the Shadows`,
        genre: `Comedy`,
        year: 2014,
        id: `what-we-do-in-the-shadows`
      },
      moviesList,
      shownMovies: moviesList,
      areAllMoviesShown: true
    });
  });

  it(`Reducer changes movies list and shown movies accordingly when a an active movie is received`, () => {
    expect(reducer({}, {
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: {
        activeMovie: {
          title: `What We Do in the Shadows`,
          genre: `Comedy`,
          year: 2014,
          id: `what-we-do-in-the-shadows`
        },
        allMovies: moviesList
      }
    })).toEqual({
      activeMovie: {
        title: `What We Do in the Shadows`,
        genre: `Comedy`,
        year: 2014,
        id: `what-we-do-in-the-shadows`
      },
      moviesList: [{
        title: `Johnny English`,
        genre: `Comedy`,
        year: 2003,
        id: `johnny-english`}],
      shownMovies: [{
        title: `Johnny English`,
        genre: `Comedy`,
        year: 2003,
        id: `johnny-english`}],
      areAllMoviesShown: true
    });
  });

  it(`Reducer should change the movies list when gets a genre`, () => {
    expect(reducer({}, {
      type: ActionType.CHANGE_FILTER,
      payload: {genre: `Kids & Family`, allMovies: moviesList}
    })).toEqual({
      moviesList: [
        {title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Kids & Family`,
          year: 2016,
          id: `fantastic-beasts-the-crimes-of-grindelwald`},
        {title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Kids & Family`,
          year: 2016,
          id: `fantastic-beasts-the-crimes-of-grindelwald2`}
      ],
      shownMovies: [
        {title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Kids & Family`,
          year: 2016,
          id: `fantastic-beasts-the-crimes-of-grindelwald`},
        {title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Kids & Family`,
          year: 2016,
          id: `fantastic-beasts-the-crimes-of-grindelwald2`}
      ],
      areAllMoviesShown: true
    });
  });

  it(`Reducer increases the number of movies displayed by a number up to 8 if there are more of them to display`, () => {
    expect(reducer({
      shownMovies: moviesList.slice(0, 8)
    }, {
      type: ActionType.SHOW_MORE,
      payload: {movies: moviesList}
    })).toEqual({
      shownMovies: moviesList,
      areAllMoviesShown: true
    });
  });

  it(`Reducer updates the movie in the list`, () => {
    expect(reducer({
      moviesList,
      shownMovies: moviesList
    }, {
      type: ActionType.UPDATE_MOVIE,
      payload: {movie: {title: `Bethmac`,
        genre: `Drama`,
        year: 2015,
        id: `macbeth`}}
    })).toEqual({shownMovies: [
      {
        genre: `Kids & Family`,
        id: `fantastic-beasts-the-crimes-of-grindelwald`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        year: 2016
      },
      {
        genre: `Drama`,
        id: `bohemian-rhapsody`,
        title: `Bohemian Rhapsody`,
        year: 2018
      },
      {
        genre: `Drama`,
        id: `macbeth`,
        title: `Bethmac`,
        year: 2015
      },
      {
        genre: `Drama`,
        id: `aviator`,
        title: `Aviator`,
        year: 2004
      },
      {
        genre: `Drama`,
        id: `we-need-to-talk-about-kevin`,
        title: `We need to talk about Kevin`,
        year: 2011
      },
      {
        genre: `Comedy`,
        id: `what-we-do-in-the-shadows`,
        title: `What We Do in the Shadows`,
        year: 2014
      },
      {
        genre: `Drama`,
        id: `revenant`,
        title: `Revenant`,
        year: 2015
      },
      {
        genre: `Comedy`,
        id: `johnny-english`,
        title: `Johnny English`,
        year: 2003
      },
      {
        genre: `Kids & Family`,
        id: `fantastic-beasts-the-crimes-of-grindelwald2`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        year: 2016
      },
      {
        genre: `Drama`,
        id: `bohemian-rhapsody2`,
        title: `Bohemian Rhapsody`,
        year: 2018
      }
    ],
    moviesList: [
      {
        genre: `Kids & Family`,
        id: `fantastic-beasts-the-crimes-of-grindelwald`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        year: 2016
      },
      {
        genre: `Drama`,
        id: `bohemian-rhapsody`,
        title: `Bohemian Rhapsody`,
        year: 2018
      },
      {
        genre: `Drama`,
        id: `macbeth`,
        title: `Bethmac`,
        year: 2015
      },
      {
        genre: `Drama`,
        id: `aviator`,
        title: `Aviator`,
        year: 2004
      },
      {
        genre: `Drama`,
        id: `we-need-to-talk-about-kevin`,
        title: `We need to talk about Kevin`,
        year: 2011
      },
      {
        genre: `Comedy`,
        id: `what-we-do-in-the-shadows`,
        title: `What We Do in the Shadows`,
        year: 2014
      },
      {
        genre: `Drama`,
        id: `revenant`,
        title: `Revenant`,
        year: 2015
      },
      {
        genre: `Comedy`,
        id: `johnny-english`,
        title: `Johnny English`,
        year: 2003
      },
      {
        genre: `Kids & Family`,
        id: `fantastic-beasts-the-crimes-of-grindelwald2`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        year: 2016
      },
      {
        genre: `Drama`,
        id: `bohemian-rhapsody2`,
        title: `Bohemian Rhapsody`,
        year: 2018
      }
    ]
    });
  });
});

describe(`Action creator works properly`, () => {
  it(`Action creator changes the playing movie`, () => {
    expect(ActionCreator.changePlayingMovie({
      title: `What We Do in the Shadows`,
      genre: `Comedy`,
      year: 2014,
      id: `what-we-do-in-the-shadows`,
    })).toEqual({
      type: ActionType.CHANGE_PLAYING_MOVIE,
      payload: {playingMovie: {
        title: `What We Do in the Shadows`,
        genre: `Comedy`,
        year: 2014,
        id: `what-we-do-in-the-shadows`
      }}
    });
  });

  it(`Action creator returns a new active movie`, () => {
    expect(ActionCreator.changeActiveMovie({
      title: `What We Do in the Shadows`,
      genre: `Comedy`,
      year: 2014,
      id: `what-we-do-in-the-shadows`
    })).toEqual({
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: {activeMovie: {
        title: `What We Do in the Shadows`,
        genre: `Comedy`,
        year: 2014,
        id: `what-we-do-in-the-shadows`
      }}
    });
  });

  it(`Action creator returns new genre when the filter is changed`, () => {
    expect(ActionCreator.changeFilter(`Kids & Family`)).toEqual({
      type: ActionType.CHANGE_FILTER,
      payload: {genre: `Kids & Family`}
    });
  });

  it(`Action creator returns the list of shown movies when the show more function is called`, () => {
    expect(ActionCreator.showMore([{
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      genre: `Kids & Family`,
      year: 2016,
      id: `fantastic-beasts-the-crimes-of-grindelwald`
    }])).toEqual({
      type: ActionType.SHOW_MORE,
      payload: {movies: [{
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `Kids & Family`,
        year: 2016,
        id: `fantastic-beasts-the-crimes-of-grindelwald`
      }]}
    });
  });

  it(`Action creator returns the movie when update movie function is called`, () => {
    expect(ActionCreator.updateMovie({
      genre: `Comedy`,
      id: `johnny-english`,
      title: `Johnny English`,
      year: 2003
    })).toEqual({
      type: ActionType.UPDATE_MOVIE,
      payload: {movie: {
        genre: `Comedy`,
        id: `johnny-english`,
        title: `Johnny English`,
        year: 2003}}
    });
  });
});

