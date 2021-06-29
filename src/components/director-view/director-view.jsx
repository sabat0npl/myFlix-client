import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./director-view.scss";
// Bootstrap components
import { Row, Col, Container, Button, Card } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <>
        <Button onClick={onBackClick}> Back </Button>
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{director[0].Director.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Biography: </span>
          <span className="value">{director[0].Director.Bio}</span>
        </div>
        <Container>
          <Row>
            {director.map((m, i) => (
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

    // return <div>
    //   <div className='director-view'>
    //     <div className='director-name'>
    //       <span className='label'>Name:</span>
    //       <span className='value'>{director.Name}</span>
    //     </div>
    //     <div className='director-bio'>
    //       <span className='label'>Biography:</span>
    //       <span className='value'>{director.Bio}</span>
    //     </div>
    //     <Button variant='info' onClick={() => { onBackClick(null); }}>Back</Button>
    //   </div>
    // </div>
  }
}

// PropTypes to validate data type
DirectorView.propTypes = {
  Name: PropTypes.string,
  Biography: PropTypes.string,
};
