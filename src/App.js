import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from 'react'

export default function App() {
  const pageSize=20
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress,setProgress] = useState(0)
    return (
      <div>
      <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Navbar />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category='general' key='home'/>} />
          <Route path='/newsShowcase' element={<News setProgress={setProgress} apiKey={apiKey} query='world' category='world' key='newsShowcase' country={null} />} />
          <Route path='/india' element={<News setProgress={setProgress} apiKey={apiKey} key='india' pageSize={pageSize} mainEndpoint='everything' query='india' category='india' country={null} />} />
          <Route path='/world' element={<News setProgress={setProgress} apiKey={apiKey} key='world' pageSize={pageSize} mainEndpoint='everything' query='world' category='world' country={null} />} />
          <Route path='/local' element={<News setProgress={setProgress} apiKey={apiKey} key='local' pageSize={pageSize} mainEndpoint='everything' country={null} category='local' query='lucknow' />} />
          <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} category='business' />} />
          <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} category='technology' />} />
          <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' category='entertainment' />} />
          <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} category='sports' />} />
          <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} category='science' />} />
          <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} category='health' />} />
        </Routes>
      </BrowserRouter>
      </div>
    )
  }
