import React from "react";
import ReactDOM from "react-dom";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useState } from "react";

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
      .get("http://localhost:8080/home/All_Films")
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
      <table>
        <thead>
          <tr>
            <th> Genre </th>
            <th> Title</th>
            <th> Rating</th>
            <th> Release Year</th>
            <th> Length (min)</th>
            <th> Film ID</th>
            <th> Film Review</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class Post extends React.Component {
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
    const data = {
      film_film_id: this.state.film_film_id,
      user_review: this.state.user_review,
      star_rating: this.state.star_rating,
    };
    console.log(data);
    axios
      .post(
        "http://localhost:8080/home/Add_Review?film_film_id=" +
          this.state.film_film_id +
          "&user_review=" +
          this.state.user_review +
          "&star_rating=" +
          this.state.star_rating
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="Film ID"
            value={this.state.film_film_id}
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

          <button type="submit">Create Post</button>
        </form>
        <br></br>
      </div>
    );
  }
}

export default Post;

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
        <td>{moviedata.star_rating}</td>
        <td>{moviedata.release_year}</td>
        <td>{moviedata.length}</td>
        <td>{moviedata.film_id}</td>
        <td>
          {/* map function to loop through reviews */}
          {moviedata.userReview.map((filmReview) => (
            <div class="reviews">{filmReview.user_review}</div>
          ))}
        </td>
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
        <Button variant="secondary">Update Review</Button>{" "}
        <Button variant="success">Delete Review</Button>{" "}
      </div>
    );
  }
}

// function MyForm() {
//   const [title, setTitle] = useState("");
//   const [rating, setRating] = useState("");

//   return (
//     <form>
//       <label>
//         Enter Title
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </label>
//       <label>
//         <li>Enter Rating</li>
//         <input
//           type="text"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//         />
//       </label>
//     </form>
//   );
// }

// class AddFilm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleAddFilmClick = this.handleAddFilmClick.bind(this);
//     this.state = { isAddingFilm: false };
//   }
//   handleAddFilmClick() {
//     this.setState({ isAddingFilm: true });
//   }

//   render() {
//     const isAddingFilm = this.state.isAddingFilm;
//     let button;

//     if (isAddingFilm) {
//       button = <AddFilmButton onClick={this.handleAddFilmClick} />;
//     }

//     return (
//       <div>
//         <Button variant="primary">Add</Button>{" "}
//       </div>
//     );
//   }
// }

//Creating the search bar
class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form>
        <input
          type="text"
          placeholder="Search Movie..."
          value={filterText}
          onChange={(userInput) =>
            this.props.onFilterTextChange(userInput.target.value)
          }
        />

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
        <SiteNavigation />
        <Post />

        <MovieTable
          movies={this.props.movies}
          filterText={this.state.filterText}
        />
        <br></br>

        <br></br>
        {/* <SpecificMovieTable specific_movie={this.props.specific_movie} /> */}
      </div>
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
  // {
  //   genre: "Action",
  //   title: "ACADEMY DINOSAUR",
  //   star_rating: "5",
  //   release_year: "2006",
  //   length: "140",
  // },
  // {
  //   genre: "Action",
  //   title: "BRINGING HYSTERICAL ",
  //   star_rating: "1",
  //   release_year: "2006",
  //   length: "150",
  // },
  // {
  //   genre: "Action",
  //   title: "ACE GOLDFINGER",
  //   star_rating: "2",
  //   release_year: "2006",
  //   length: "120",
  // },
  // {
  //   genre: "Fantasy",
  //   title: "ADAPTATION HOLES",
  //   star_rating: "3",
  //   release_year: "2006",
  //   length: "130",
  // },
  // {
  //   genre: "Drama",
  //   title: "AFFAIR PREJUDICE",
  //   star_rating: "5",
  //   release_year: "2006",
  //   length: "160",
  // },
];

//Renders the FiterableMovieTable
ReactDOM.render(<App />, document.getElementById("root"));
