import React from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
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
    // Getting data from localhost or api and storing the data set in the state filmpackages

    axios
      .get("http://54.80.165.5:8080/home/All_Films")
      .then((response) => this.setState({ filmPackages: response.data }));
  }

  render() {
    const movie = this.state.filmPackages;
    const rows = [];
    const filterText = this.props.filterText.toLowerCase();

    // looping through the filmPackages array and appending the data rows array and pushing the data to the MovieRow class
    // by feeding the movie and film_id data as parameters of the MovieRows class
    this.state.filmPackages.forEach((movie) => {
      if (movie.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      console.log(movie);
      rows.push(<MovieRow movieinfo={movie} key={movie.film_id} />);
    });

    return (
      <div className="MovieTable">
        <table>
          <thead>
            <tr>
              <th> Genre </th>
              <th> Title</th>
              <th> Description</th>
              <th> Release Year</th>
              <th> Length (min)</th>
              <th> Film ID</th>
              <th> Film Review</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class PostRequest extends React.Component {
  state = {
    film_film_id: "",
    user_review: "",
    star_rating: " ",
  };

  onFilmIDChange = (e) => {
    this.setState({
      film_film_id: e.target.value,
    });
  };

  onUserReviewChange = (e) => {
    this.setState({
      user_review: e.target.value,
    });
  };

  onStarRatingChange = (e) => {
    this.setState({
      star_rating: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://54.80.165.5:8080/home/Add_Review?film_film_id=" +
          this.state.film_film_id +
          "&user_review=" +
          this.state.user_review +
          "&star_rating=" +
          this.state.star_rating
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(false); // reloading the window after submission
  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="Film ID"
            //value={this.state.film_film_id}
            onChange={this.onFilmIDChange}
            required
          />
          <br></br>
          <input
            placeholder="Review"
            value={this.state.user_review}
            onChange={this.onUserReviewChange}
            required
          />
          <br></br>
          <input
            placeholder="Rating"
            value={this.state.star_rating}
            onChange={this.onStarRatingChange}
            required
          />
          <br></br>

          <button type="submit">Submit</button>
        </form>
        <br></br>
      </div>
    );
  }
}

class DeleteRequest extends React.Component {
  state = {
    Review_ID: "",
  };

  handleChange = (event) => {
    this.setState({ Review_ID: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .delete(
        `http://54.80.165.5:8080/home/Remove_Review/${this.state.Review_ID}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
    window.location.reload(false); // reloading the window after submission
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Review ID:
            <input type="text" name="Review ID" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}

class PutRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_review_id: "",
      user_review: "",
      star_rating: " ",
      updatedAt: null,
    };
  }

  onFilmIDChange = (e) => {
    this.setState({
      user_review_id: e.target.value,
    });
  };

  onUserReviewChange = (e) => {
    this.setState({
      user_review: e.target.value,
    });
  };

  onStarRatingChange = (e) => {
    this.setState({
      star_rating: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // PUT request

    axios
      .put(
        "http://54.80.165.5:8080/home/updatereview/" +
          this.state.user_review_id +
          "?user_review=" +
          this.state.user_review +
          "&star_rating=" +
          this.state.star_rating
      )

      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(false); // reloading the window after submission
  };

  render() {
    return (
      <div className="put">
        <form className="put" onSubmit={this.handleSubmit}>
          <input
            placeholder="Review ID"
            value={this.state.user_review_id}
            onChange={this.onFilmIDChange}
            required
          />
          <br></br>
          <input
            placeholder="Review"
            value={this.state.user_review}
            onChange={this.onUserReviewChange}
            required
          />
          <br></br>
          <input
            placeholder="Rating"
            value={this.state.star_rating}
            onChange={this.onStarRatingChange}
            required
          />
          <br></br>
          <button type="submit">Update Review</button>
        </form>
        <br></br>
      </div>
    );
  }
}

//export { PutRequest };

class MovieRow extends React.Component {
  render() {
    const moviedata = this.props.movieinfo;

    return (
      <tr>
        {/* Table Data being called */}
        <td>
          {moviedata.category.map((fimGenre) => (
            <div>{fimGenre.name}</div>
          ))}
        </td>

        <td>{moviedata.title}</td>
        <td>{moviedata.description}</td>

        <td>{moviedata.release_year}</td>
        <td>{moviedata.length}</td>
        <td>{moviedata.film_id}</td>
        <td>
          {/* map function to loop through reviews */}
          {moviedata.userReview.map((filmReview) => (
            <div class="reviews">
              {filmReview.user_review} <br></br>
              Review ID: {filmReview.user_review_id}
              <br></br>
              Rating: {filmReview.star_rating}
            </div>
          ))}
        </td>
      </tr>
    );
  }
}

//Creating the search bar
class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form className="top">
        <div className="SearchBar">
          <input
            type="text"
            placeholder="Search Movie..."
            value={filterText}
            onChange={(userInput) =>
              this.props.onFilterTextChange(userInput.target.value)
            }
          />
        </div>

        <br></br>
        <b> Leave a review: </b>
        <PostRequest />

        <br></br>
        <b> Update a review: </b>
        <PutRequest />

        <br></br>
        <b> Delete a review: </b>
        <DeleteRequest />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    //Binding
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  //Creating function to read user input

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <MovieTable
          movies={this.props.movies}
          filterText={this.state.filterText}
        />
        <br></br>
      </div>
    );
  }
}

//Renders the Movie App
ReactDOM.render(<App />, document.getElementById("root"));
