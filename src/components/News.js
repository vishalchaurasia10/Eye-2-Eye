import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import sports from './assets/sports.webp'
import business from './assets/business.webp'
import entertainment from './assets/entertainment.webp'
import health from './assets/health.webp'
import india from './assets/india.webp'
import science from './assets/science.webp'
import technology from './assets/technology.webp'
import world from './assets/world.webp'
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const News=(props)=> {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/${props.mainEndpoint}?${props.query ? `q=${props.query}&` : ''}${props.country ? `country=${props.country}&` : ''}${props.category !== null && props.category !== 'india' && props.category !== 'world' && props.category !== 'local' ? `category=${props.category}&` : ''}pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${page+1}`
    setPage(page+1)
    let data = await fetch(url)
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults>=100?100:parsedData.totalResults)
  };

  const updateLink = async (page) => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/${props.mainEndpoint}?${props.query ? `q=${props.query}&` : ''}${props.country ? `country=${props.country}&` : ''}${props.category !== null && props.category !== 'india' && props.category !== 'world' && props.category !== 'local' ? `category=${props.category}&` : ''}pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${page}`
    let data = await fetch(url)
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(50)
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults>=100?100:parsedData.totalResults)
    props.setProgress(100)
  }
  useEffect(()=>{
    props.category.length!==0 && (document.title = `NewsMonkey-${(props.category[0]).toUpperCase() + (props.category).substring(1)}`)
    updateLink(page)
    // eslint-disable-next-line
  },[])

  const imageUpdation = (key) => {
    if (key === 'sports') { return { type: sports, bgColor: 'bg-[#df742c]' } }
    if (key === 'business') { return { type: business, bgColor: 'bg-[#4d9938]' } }
    if (key === 'health') { return { type: health, bgColor: 'bg-[#5d76f4]' } }
    if (key === 'india') { return { type: india, bgColor: 'bg-[#5d76f4]' } }
    if (key === 'science') { return { type: science, bgColor: 'bg-[#d63864]' } }
    if (key === 'technology') { return { type: technology, bgColor: 'bg-[#4599df]' } }
    if (key === 'entertainment') { return { type: entertainment, bgColor: 'bg-[#7859bc]' } }
    if (key === 'world') { return { type: world, bgColor: 'bg-[#749e47]' } }
  }
    return (
      <>
        {props.category!=='general' && props.category!=='local' && !(props.mainEndpoint==='top-headlines' && props.query==='world') && <div className={`transition-all duration-300 ${props.darkMode?'bg-[#292a2d] text-white':'bg-[#f6f8fc] text-black'} bg-[#f6f8fc] pt-32 pb-5 flex justify-start items-center px-72 text-3xl`}>
          <img className={`${(imageUpdation(props.category)).bgColor} rounded-full mr-2`} src={(imageUpdation(props.category).type)} alt="" />
          {(props.category[0]).toUpperCase() + (props.category).substring(1)}
        </div>}
        {(props.category==='general' || props.category==='local' || (props.mainEndpoint==='top-headlines' && props.query==='world')) && <div className={`transition-all duration-300 ${props.darkMode?'bg-[#292a2d] text-white':'bg-[#f6f8fc] text-blue-600'} pt-32 ] flex items-center text-2xl pl-72 py-4 rounded-t-2xl`}> <Link to={props.category==='general'?'/india':props.category==='local'?'/local':'/world'}> {props.category==='general'?'India Top-headlines':props.category==='local'?'Your local news':'World Top-headlines'}</Link><span className='pb-[6px] ml-1 text-4xl'>&#8250;</span></div>}
        {(loading)&&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={page<Math.ceil(totalResults/props.pageSize)}
          loader={<Spinner/>}
        >
          <div className={`transition-all duration-300 ${props.darkMode?'bg-[#292a2d]':'bg-[#f6f8fc]'} pb-4`}>
            {articles.map((element) => {
              return (element.title && element.urlToImage) && <NewsItem darkMode={props.darkMode} key={element.url} title={element.title} urlToImage={element.urlToImage} name={element.source.name} author={element.author} publishedAt={element.publishedAt}
                time={parseInt(element.publishedAt.substring(11, 13)) + 5} url={element.url} />
            })}
          </div>
        </InfiniteScroll>
      </>
    )
}
News.defaultProps = {
  country: 'in',
  category: null,
  mainEndpoint: 'top-headlines',
  query: null,
  pageSize:20
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  mainEndpoint: PropTypes.string,
  query: PropTypes.string,
  pageSize: PropTypes.number,
}
export default News
