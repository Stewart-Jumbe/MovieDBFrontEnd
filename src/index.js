import React from "react";
import ReactDOM from "react-dom";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import axios from "axios";

//
class MovieGenreRow extends React.Component {
  render() {
    const genre = this.props.genre;

    return <tr>{/* <th colSpan="20">{genre}</th> */}</tr>;
  }
}

//Pointing rows to data
class SpecificMovieRow extends React.Component {
  render() {
    const specific_movie = this.props.specific_movie;

    return (
      <tr>
        {/* Table Data being called */}

        <td>{specific_movie.title}</td>

        <td>{specific_movie.genre} </td>

        <td>{specific_movie.user_review}</td>

        <td>{specific_movie.star_rating}</td>

        <td>{specific_movie.release_year}</td>

        <td>{specific_movie.length}</td>
      </tr>
    );
  }
}

//Creating movie table
class MovieTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filmPackages: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/home/All_Films")
      .then((response) => this.setState({ filmPackages: response.data }));
  }

  render() {
    const movie = this.state.filmPackages;

    const rows = [];
    this.state.filmPackages.forEach((movie) => {
      console.log(movie);
      rows.push(<MovieRow movieinfo={movie} key={movie.film_id} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th> Genre </th>
            <th> Title</th>
            <th> Rating</th>
            <th> Release Year</th>
            <th> Length (min)</th>
            <th> Film ID</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class MovieRow extends React.Component {
  render() {
    const moviedata = this.props.movieinfo;

    return (
      <tr>
        {/* sada */}
        {/* Table Data being called */}
        <td>{moviedata.description} </td>

        <td>{moviedata.title}</td>

        <td>{moviedata.star_rating}</td>

        <td>{moviedata.release_year}</td>

        <td>{moviedata.length}</td>
        <td>{moviedata.film_id}</td>
      </tr>
    );
  }
}

//Specific Movie Table setup
class SpecificMovieTable extends React.Component {
  render() {
    const rows = [];

    return (
      <table>
        <thead>
          <tr>
            <th> Title</th>
            <th> Genre </th>
            <th> User Review</th>
            <th> Rating</th>
            <th> Release Year</th>
            <th> Length</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

//class SiteNavigation
class SiteNavigation extends React.Component {
  render() {
    return (
      <div>
        <Button variant="primary">Add Film</Button>{" "}
        <Button variant="secondary">Update Review</Button>{" "}
        <Button variant="success">Delete Review</Button>{" "}
      </div>
    );
  }
}
//Creating the search bar
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search Movie..." />

        <div className="Category Dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Fantasy</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Drama</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <br></br>

        <div className="Rating Dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Rating
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">5 stars</Dropdown.Item>
              <Dropdown.Item href="#/action-1">4 stars</Dropdown.Item>
              <Dropdown.Item href="#/action-1">3 stars</Dropdown.Item>
              <Dropdown.Item href="#/action-1">2 stars</Dropdown.Item>
              <Dropdown.Item href="#/action-1">1 stars</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <container fluid>
        <div>
          <SearchBar />
          <MovieTable movies={this.props.movies} />
          <br></br>
          <SiteNavigation />
          <br></br>
          {/* <SpecificMovieTable specific_movie={this.props.specific_movie} /> */}
        </div>
      </container>
    );
  }
}

const SPECIFICMOVIE = [
  {
    title: "ACADEMY DINOSAUR",
    user_review: "Its a must watch",
    star_rating: "5",
    genre: "Action",
    release_year: "2006",
    length: "120",
  },
];

const MOVIES = [
  {
    genre: "Action",
    title: "ACADEMY DINOSAUR",
    star_rating: "5",
    release_year: "2006",
    length: "140",
  },

  {
    genre: "Action",
    title: "BRINGING HYSTERICAL ",
    star_rating: "1",
    release_year: "2006",
    length: "150",
  },

  {
    genre: "Action",
    title: "ACE GOLDFINGER",
    star_rating: "2",
    release_year: "2006",
    length: "120",
  },

  {
    genre: "Fantasy",
    title: "ADAPTATION HOLES",
    star_rating: "3",
    release_year: "2006",
    length: "130",
  },

  {
    genre: "Drama",
    title: "AFFAIR PREJUDICE",
    star_rating: "5",
    release_year: "2006",
    length: "160",
  },
];

//Renders the FiterableMovieTable
ReactDOM.render(<App movies={MOVIES} />, document.getElementById("root"));
