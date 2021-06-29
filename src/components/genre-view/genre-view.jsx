import React from "react";
import PropTypes from "prop-types";
import "./genre-view.scss";
import { Link } from "react-router-dom";
// Bootstrap components
import { Row, Col, Container, Button, Card } from "react-bootstrap";
export class GenreView extends React.Component {
  render() {
    const { movies, onBackClick } = this.props;
    return (
      <>
        <Button onClick={onBackClick}> Back </Button>
        <div className="genre-name">
          <span className="label">Genre: </span>
          <span className="value">{movies[0].Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{movies[0].Genre.Description}</span>
        </div>
        <div>
          <pre>{movies[0].Genre.name}</pre>
          <pre>{movies[0].Genre.description}</pre>
        </div>
        <Container>
          <Row>
            {movies.map((m, i) => (
              <Col xs={4} lg={3} key={i} className="p-2">
                <Link to={`/movies/${m._id}`}>
                  {" "}
                  <Card.Img variant="top" src={m.ImagePath} />
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

// PropTypes to validate data type
GenreView.propTypes = {
  Name: PropTypes.string,
  Description: PropTypes.string,
};
