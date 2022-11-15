import React, {Component} from 'react'
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

export class News extends Component{
  // const [articles, setarticles] = useState([]);
  // const [page, setpage] = useState(1);
  // const [loading, setloading] = useState([]);
  // const [totalResults, set] = useState([]);
  static defaultProps = {
    country: 'in',
    category: null,
    mainEndpoint: 'top-headlines',
    query: null,
    pageSize:20
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    mainEndpoint: PropTypes.string,
    query: PropTypes.string,
    pageSize: PropTypes.number,
  }
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults:0
    }
    this.props.category.length!==0 && (document.title = `NewsMonkey-${(this.props.category[0]).toUpperCase() + (this.props.category).substring(1)}`)
  }
  async componentDidMount() {
    this.updateLink(this.state.page)
  }
  fetchMoreData = async() => {
    this.setState({page:this.state.page + 1})
    let url = `https://newsapi.org/v2/${this.props.mainEndpoint}?${this.props.query ? `q=${this.props.query}&` : ''}${this.props.country ? `country=${this.props.country}&` : ''}${this.props.category !== null && this.props.category !== 'india' && this.props.category !== 'world' && this.props.category !== 'local' ? `category=${this.props.category}&` : ''}pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page+1}`
    let data = await fetch(url)
    let parsedData = await data.json();
    this.setState({ loading: false })
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults>=100?100:parsedData.totalResults})
  };
  async updateLink(page) {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/${this.props.mainEndpoint}?${this.props.query ? `q=${this.props.query}&` : ''}${this.props.country ? `country=${this.props.country}&` : ''}${this.props.category !== null && this.props.category !== 'india' && this.props.category !== 'world' && this.props.category !== 'local' ? `category=${this.props.category}&` : ''}pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${page}`
    let data = await fetch(url)
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(50)
    this.setState({ loading: false })
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults>=100?100:parsedData.totalResults })
    this.props.setProgress(100)
  }
  imageUpdation(key) {
    if (key === 'sports') { return { type: sports, bgColor: 'bg-[#df742c]' } }
    if (key === 'business') { return { type: business, bgColor: 'bg-[#4d9938]' } }
    if (key === 'health') { return { type: health, bgColor: 'bg-[#5d76f4]' } }
    if (key === 'india') { return { type: india, bgColor: 'bg-[#5d76f4]' } }
    if (key === 'science') { return { type: science, bgColor: 'bg-[#d63864]' } }
    if (key === 'technology') { return { type: technology, bgColor: 'bg-[#4599df]' } }
    if (key === 'entertainment') { return { type: entertainment, bgColor: 'bg-[#7859bc]' } }
    if (key === 'world') { return { type: world, bgColor: 'bg-[#749e47]' } }
  }
  render() {
    return (
      <>
        {this.props.category!=='general' && this.props.category!=='local' && !(this.props.mainEndpoint==='top-headlines' && this.props.query==='world') && <div className='bg-[#f6f8fc] pt-4 pb-5 flex justify-start items-center px-72 text-3xl'>
          <img className={`${(this.imageUpdation(this.props.category)).bgColor} rounded-full mr-2`} src={(this.imageUpdation(this.props.category).type)} alt="" />
          {(this.props.category[0]).toUpperCase() + (this.props.category).substring(1)}
        </div>}
        {(this.props.category==='general' || this.props.category==='local' || (this.props.mainEndpoint==='top-headlines' && this.props.query==='world')) && <div className='text-blue-600 bg-[#f6f8fc] flex items-center text-2xl pl-72 py-4 rounded-t-2xl'> <Link to={this.props.category==='general'?'/india':this.props.category==='local'?'/local':'/world'}> {this.props.category==='general'?'India Top-headlines':this.props.category==='local'?'Your local news':'World Top-headlines'}</Link><span className='relative top-[-0.2rem] ml-1 text-4xl'>&#8250;</span></div>}
        {(this.state.loading)&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page<Math.ceil(this.state.totalResults/this.props.pageSize)}
          loader={<Spinner/>}
        >
          <div className='bg-[#f6f8fc] pb-4'>
            {this.state.articles.map((element) => {
              return (element.title && element.urlToImage) && <NewsItem key={element.url} title={element.title} urlToImage={element.urlToImage} name={element.source.name} author={element.author} publishedAt={element.publishedAt}
                time={parseInt(element.publishedAt.substring(11, 13)) + 5} url={element.url} />
            })}
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
