import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";

import "./main-view.scss";
// Bootstrap components
import { Row, Col, Container, Button, Card } from "react-bootstrap";
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://brunoza-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // To connect to login-view function component, if successful log in, it updates thes 'user' property in the state
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    localStorage.setItem("email", authData.user.Email);
    localStorage.setItem("birthday", authData.user.Birthday);
    localStorage.setItem("favoriteMovies", auth.Data.user.Favourites);
    this.getMovies(authData.token);
  }

  // to enable user to logout and go back to welcome page
  onLoggedOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
  }

  render() {
    let { user } = this.state;
    let { movies } = this.props;

    return (
      <>
        <Router>
          <NavbarView movies={movies}/>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <h1>Login</h1>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                return (
                  <Col md={6}>
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
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
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
              render={({ history }) => {
                if (!user) return;
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>;
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <ProfileView
                    favoriteMovies={localStorage.getItem("favoriteMovies")}
                    username={this.state.user}
                    email={localStorage.getItem("email")}
                    birthday={localStorage.getItem("birthday")}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                );
              }}
            />

            <Route
              path="/update/me"
              render={({ history }) => {
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <ProfileUpdate
                      movies={movies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};
// #8
export default connect(mapStateToProps, { setMovies })(MainView);
