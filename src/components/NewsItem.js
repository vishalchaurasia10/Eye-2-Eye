import React from 'react'

function NewsItem(props) {
    let {title,urlToImage,name,time,url,author,publishedAt} = props;
    let date = new Date()
    let current = date.getHours()
    let published = new Date(publishedAt)
    let weekDayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    return (
      <div className={`newsitems transition-all duration-300 ${props.darkMode?'bg-[#1f1f1f] text-white border-[#5e5e5e]':'bg-white text-black border-[#e3e3e3]'} text-xl shadow-xl first:rounded-t-2xl last:rounded-b-2xl first:pt-0 lg:pl-2 lg:first:pt-4 py-4 lg:mx-72 lg:flex border-b-[1px]`}>
        <img className='w-full lg:w-72 rounded-2xl lg:ml-2 cursor-pointer' src={urlToImage} alt="" />
        <div className="details pt-2 lg:pt-0">
        <p className='px-4 font-bold text-lg'>{name?name:'Unknown Source'}</p>
        <a href={url} ><p className='px-4 hover:underline'>{title}</p></a>
        <p className='px-4 text-sm font-semibold py-3'>{Math.abs(published.getDate()-date.getDate())<=1 && Math.abs(time-current) <=24?(Math.abs(time-current)>1?`${Math.abs(time-current)} hours`:`${Math.abs(time-current)} hour`):'more than 24 hours'} ago</p>
        <p className='px-4 text-sm font-light'>Written by : <span className='font-semibold'>{author==null||author.startsWith('http')?name:author}</span></p>
        <p className='px-4 text-sm font-light'>Published on : {weekDayArray[published.getDay()]}, {published.getDate()} {monthArray[published.getMonth()]} {published.getFullYear()}</p>
        </div>
      </div>
    )
}

export default NewsItem
