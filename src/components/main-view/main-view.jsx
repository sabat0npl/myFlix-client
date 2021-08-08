import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUser } from "../../actions/actions";

//import other views to be used
import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import ProfileView from "../profile-view/profile-view";

import "./main-view.scss";

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://brunoza-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        //Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch((error) => console.log(error));
  }

  //set the state of the user to who is actually logged in and grab their list of favorite movies
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    //remove local storage items
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //move to login page
    window.open("/", "_self");
    //reset the states
    this.props.setUser("");
  }

  render() {
    let { movies, user } = this.props;

    return (
      <Router>
        <NavbarView
          onLogout={() => {
            this.onLoggedOut();
          }}
        />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              //assuming there are movies, map each movie to its own MovieCard
              if (!movies.length) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              //if someone is logged in, send them to the home page instead of the register page
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (!movies.length) return <div className="main-view" />;
              return (
                <Col md={6} xs={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} key="Director">
                  <DirectorView
                    director={movies.filter(
                      (m) => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} key="Genre">
                  <GenreView
                    movies={movies.filter(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/users/me"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <ProfileView
                  movies={movies}
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
