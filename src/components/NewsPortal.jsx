import React, { useState } from "react";
import NewsCard from "./NewsCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

function NewsPortal() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  const fetchNews = debounce(async (query) => {
    if (!query) {
      setArticles([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    setArticles([]);

    const apiKey = "13565b3eae304232ba7e66d4499ac7e3";
    const url = `https://newsapi.org/v2/everything?q=${query}&language=id&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (response.status === 426) {
        throw new Error("API key requires an upgrade.");
      }
      const data = await response.json();

      setLoading(false);

      if (!data.articles || data.articles.length === 0) {
        setError("Berita tidak ditemukan.");
      } else {
        setArticles(data.articles);
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "API key requires an upgrade.") {
        setError("API key memerlukan peningkatan versi. Silakan periksa status langganan Anda.");
      } else {
        setError("Terjadi kesalahan saat mengambil data. Coba lagi nanti.");
      }
    }
  }, 500);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchNews(value);
  };

  const handleSearchClick = () => {
    fetchNews(query);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center portal-berita-title">Portal Berita</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form id="searchForm" className="d-flex my-2 my-lg-0">
            <input id="searchQuery" className="form-control me-2 w-100" type="search" placeholder="Cari berita..." aria-label="Search" value={query} onChange={handleInputChange} />
            <Button variant="primary" onClick={handleSearchClick}>
              Search
            </Button>
          </form>
        </div>
      </div>
      {loading && (
        <div id="loading" className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && (
        <div id="alert" className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
      <div id="newsContainer" className="row mt-4">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default NewsPortal;
