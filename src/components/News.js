import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${captalize(props.category)} - VraqNews`;

  const captalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePage = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true );
    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json();
    props.setProgress(65); // Call the function
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updatePage();
  }, []);

  const handlePrevClick = async () => {
    setPage(page-1);
    updatePage();
  };

  const handleNextClick = async () => {
    setPage(page+1);
    updatePage();
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    let nextPage = page + 1;
    try {
      let data = await fetch(url);
      let parsedData = await data.json(); // Call the function

      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "90px 0px 20px 0px"}}>
        VraqFresh: Latest {captalize(props.category)} News and Updates!{" "}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.default = {
  country: "in",
  pageSize: 10,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
