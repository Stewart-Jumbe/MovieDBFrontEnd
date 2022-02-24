import React from "react";
import ReactDOM from "react-dom";

//
class MovieGenreRow extends React.Component {
  render() {
    const genre = this.props.genre;

    return (
      <tr>
        <th colSpan="1">{genre}</th>
      </tr>
    );
  }
}

class MovieRow extends React.Component {
  render() {
    const movie = this.props.movie;

    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.star_rating}</td>
      </tr>
    );
  }
}

//Creating movie table
class MovieTable extends React.Component {
  render() {
    const rows = [];
    let lastGenre = null;

    this.props.movies.forEach((movie) => {
      if (movie.genre !== lastGenre) {
        rows.push(<MovieGenreRow genre={movie.genre} key={movie.genre} />);
      }
      rows.push(<MovieRow movie={movie} key={movie.genre} />);

      lastGenre = movie.genre;
    });

    return (
      <table>
        <thead>
          <tr>
            <th> Genre</th>
            <th> Title</th>
            <th> Rating</th>
            <th> Release Year</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

//Creating the search bar
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search Movie..." />
        <p>
          Choose Category:{" "}
          <select name="category" id="category">
            <option value="" selected="selected">
              Action
            </option>
            <option value="" selected="selected">
              Fantasy
            </option>
          </select>
        </p>

        <p>
          Choose Rating:{" "}
          <select name="rating" id="rating">
            <option value="" selected="selected">
              5 Star
            </option>
            <option value="" selected="selected">
              4 Star
            </option>
            <option value="" selected="selected">
              3 Star
            </option>
            <option value="" selected="selected">
              2 Star
            </option>
            <option value="" selected="selected">
              1 Star
            </option>
          </select>
        </p>
      </form>
    );
  }
}

class FilterableMovieTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <MovieTable movies={this.props.movies} />
      </div>
    );
  }
}

const MOVIES = [
  {
    genre: "Action",
    title: "ACADEMY DINOSAUR",
    star_rating: "5",
    release_year: "2006",
  },

  {
    genre: "Action",
    title: "BRINGING HYSTERICAL ",
    star_rating: "1",
    release_year: "2006",
  },

  {
    genre: "Action",
    title: "ACE GOLDFINGER",
    star_rating: "2",
    release_year: "2006",
  },

  {
    genre: "Fantasy",
    title: "ADAPTATION HOLES",
    star_rating: "3",
    release_year: "2006",
  },

  {
    genre: "Drama",
    title: "AFFAIR PREJUDICE",
    star_rating: "5",
    release_year: "2006",
  },
];

ReactDOM.render(
  <FilterableMovieTable movies={MOVIES} />,
  document.getElementById("root")
);
