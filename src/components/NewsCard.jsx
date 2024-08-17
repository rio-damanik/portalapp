import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function NewsCard({ article }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <img src={article.urlToImage} className="card-img-top" alt={article.title} />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
          <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Baca Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
}

NewsCard.propTypes = {
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default NewsCard;
