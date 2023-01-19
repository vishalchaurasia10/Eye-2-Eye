import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import sports from "./assets/sports.webp";
import business from "./assets/business.webp";
import entertainment from "./assets/entertainment.webp";
import health from "./assets/health.webp";
import india from "./assets/india.webp";
import science from "./assets/science.webp";
import technology from "./assets/technology.webp";
import world from "./assets/world.webp";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const API_LIST = [
   
    "1bd9b845d71e49e29c42c1f183bafce9",
    "c8ef8c39943d436e8b9c8cb09cce8d1c",
  ];

  const fetchMoreData = async () => {
    let finalData = null;
    for (const values of API_LIST) {
      let url = `https://newsapi.org/v2/${props.mainEndpoint}?${
        props.query ? `q=${props.query}&` : ""
      }${props.country ? `country=${props.country}&` : ""}${
        props.category !== null &&
        props.category !== "india" &&
        props.category !== "world" &&
        props.category !== "local" &&
        props.category !== "xyz"
          ? `category=${props.category}&`
          : ""
      }pageSize=${props.pageSize}&apiKey=${values}&page=${page + 1}`;

      const proxyURL = "https://mintedtweets.cordify.app/proxy-server";
      const payloadJson = {
        url: url,
        isGet: true,
        headers: {
          "Content-Type": "application/json",
        },
        password: "not today boy university post joker focus never cat",
        payloadJson: {},
      };
      const finalResponse = await fetch(proxyURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadJson),
      });
      finalData = await finalResponse.json();

      setPage(page + 1);

      let parsedData = finalData.data;
      if (parsedData.code != "rateLimited") {
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(
          parsedData.totalResults >= 100 ? 100 : parsedData.totalResults
        );

        break;
      }
    }
  };

  const updateLink = async (page) => {
    let finalData = null;
    props.setProgress(10);

    //loop through the api list and find the one that works
    for (const values of API_LIST) {
      let url = `https://newsapi.org/v2/${props.mainEndpoint}?${
        props.query ? `q=${props.query}&` : ""
      }${props.country ? `country=${props.country}&` : ""}${
        props.category !== null &&
        props.category !== "india" &&
        props.category !== "world" &&
        props.category !== "local" &&
        props.category !== "xyz"
          ? `category=${props.category}&`
          : ""
      }pageSize=${props.pageSize}&apiKey=${values}&page=${page}`;
      const proxyURL = "https://mintedtweets.cordify.app/proxy-server";
      const payloadJson = {
        url: url,
        isGet: true,
        headers: {
          "Content-Type": "application/json",
        },
        password: "not today boy university post joker focus never cat",
        payloadJson: {},
      };
      const finalResponse = await fetch(proxyURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadJson),
      });
      finalData = await finalResponse.json();
      props.setProgress(30);
      let parsedData = finalData.data;
      if (parsedData.code != "rateLimited") {
        props.setProgress(50);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(
          parsedData.totalResults >= 100 ? 100 : parsedData.totalResults
        );
        props.setProgress(100);
        break;
      }
    }
  };
  useEffect(() => {
    props.category.length !== 0 &&
      props.category !== "xyz" &&
      (document.title = `The Insight-${
        props.category[0].toUpperCase() + props.category.substring(1)
      }`);
    props.category === "xyz" &&
      (document.title = `The Insight-${
        props.query[0].toUpperCase() + props.query.substring(1)
      }`);
    updateLink(page);
    // eslint-disable-next-line
  }, []);

  const imageUpdation = (key) => {
    if (key === "sports") {
      return { type: sports, bgColor: "bg-[#df742c]" };
    }
    if (key === "business") {
      return { type: business, bgColor: "bg-[#4d9938]" };
    }
    if (key === "health") {
      return { type: health, bgColor: "bg-[#5d76f4]" };
    }
    if (key === "india") {
      return { type: india, bgColor: "bg-[#5d76f4]" };
    }
    if (key === "science") {
      return { type: science, bgColor: "bg-[#d63864]" };
    }
    if (key === "technology") {
      return { type: technology, bgColor: "bg-[#4599df]" };
    }
    if (key === "entertainment") {
      return { type: entertainment, bgColor: "bg-[#7859bc]" };
    }
    if (key === "world") {
      return { type: world, bgColor: "bg-[#749e47]" };
    }
  };
  return (
    <>
      <div
        className={`space pt-[5rem] lg:pt-0 transition-all duration-300 ${
          props.darkMode ? "bg-[#292a2d]" : "bg-[#f6f8fc]"
        }`}></div>
      {props.category !== "general" &&
        props.category !== "local" &&
        props.category !== "xyz" &&
        !(
          props.mainEndpoint === "top-headlines" && props.query === "world"
        ) && (
          <div
            className={`transition-all duration-300 ${
              props.darkMode
                ? "bg-[#292a2d] text-white"
                : "bg-[#f6f8fc] text-black"
            } px-2 py-3 lg:pt-32 lg:pb-5 flex justify-start items-center lg:px-72 text-3xl`}>
            <img
              className={`${
                imageUpdation(props.category).bgColor
              } rounded-full mr-2`}
              src={imageUpdation(props.category).type}
              alt=''
            />
            {props.category[0].toUpperCase() + props.category.substring(1)}
          </div>
        )}
      {(props.category === "general" ||
        props.category === "local" ||
        props.category === "xyz" ||
        (props.mainEndpoint === "top-headlines" &&
          props.query === "world")) && (
        <div
          className={`transition-all duration-300 font-nunito ${
            props.darkMode
              ? "bg-[#292a2d] text-white"
              : "bg-[#f6f8fc] text-blue-600"
          } lg:pt-32 flex items-center text-2xl px-2 lg:pl-72 py-4 lg:rounded-t-2xl`}>
          {" "}
          <Link
            to={
              props.category === "general"
                ? "/india"
                : props.category === "local"
                ? "/local"
                : props.category === "xyz"
                ? ""
                : "/world"
            }>
            {" "}
            {props.category === "general"
              ? "India Top-headlines"
              : props.category === "local"
              ? "Your local news"
              : props.category === "xyz"
              ? `Search related to ${props.query}`
              : "World Top-headlines"}
          </Link>
          <span className='pb-[6px] ml-2 mt-1 text-4xl'>&#8250;</span>
        </div>
      )}
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={page < Math.ceil(totalResults / props.pageSize)}
        loader={<Spinner />}>
        <div
          className={`transition-all duration-300 ${
            props.darkMode ? "bg-[#292a2d]" : "bg-[#f6f8fc]"
          } pb-4`}>
          {articles.map((element) => {
            return (
              element.title &&
              element.urlToImage && (
                <NewsItem
                  darkMode={props.darkMode}
                  key={element.url}
                  title={element.title}
                  urlToImage={element.urlToImage}
                  name={element.source.name}
                  author={element.author}
                  publishedAt={element.publishedAt}
                  time={parseInt(element.publishedAt.substring(11, 13)) + 5}
                  url={element.url}
                />
              )
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  category: null,
  mainEndpoint: "top-headlines",
  query: null,
  pageSize: 20,
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  mainEndpoint: PropTypes.string,
  query: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;
