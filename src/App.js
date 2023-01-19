import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react'
import Buttons from './components/Buttons';
localStorage.setItem('i',0)
export default function App() {
  const pageSize=20
  // let i=0;
  // const apiKey=(i++)%2===0?"c8ef8c39943d436e8b9c8cb09cce8d1c":"1bd9b845d71e49e29c42c1f183bafce9"

  let apiKey

  if((localStorage.getItem('i'))%2===0)
  {
    localStorage.setItem('i',Number(localStorage.getItem('i'))+1)
    apiKey="c8ef8c39943d436e8b9c8cb09cce8d1c"
  }
  else
  {
    localStorage.setItem('i',Number(localStorage.getItem('i'))+1)
    apiKey="1bd9b845d71e49e29c42c1f183bafce9"
  }

  const [progress,setProgress] = useState(0)
  const [darkMode,setDarkMode] = useState(0)
  const [display,setDisplay] = useState(0)
  const [customQuery,setCustomQuery] = useState('lucknow')
    return (
      <div>
      <BrowserRouter>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Navbar darkMode={darkMode} setCustomQuery={setCustomQuery} setDisplay={setDisplay} />
        <Buttons display={display} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Routes>
          <Route path='/' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category='general' key='home'/>} />
          <Route path='/newsShowcase' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} query='world' category='world' key='newsShowcase' country={null} />} />
          <Route path='/india' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='india' pageSize={pageSize} mainEndpoint='everything' query='india' category='india' country={null} />} />
          <Route path='/world' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='world' pageSize={pageSize} mainEndpoint='everything' query='world' category='world' country={null} />} />
          <Route path='/local' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='local' pageSize={pageSize} mainEndpoint='everything' country={null} category='local' query='lucknow' />} />
          <Route path='/business' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} category='business' />} />
          <Route path='/technology' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} category='technology' />} />
          <Route path='/entertainment' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='entertainment' category='entertainment' />} />
          <Route path='/sports' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} category='sports' />} />
          <Route path='/science' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} category='science' />} />
          <Route path='/health' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} category='health' />} />
          {customQuery!=='lucknow' && <Route path={`/${customQuery}`} element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key={customQuery} pageSize={pageSize} mainEndpoint='everything' country={null} category='xyz' query={customQuery} />} />}
        </Routes>
      </BrowserRouter>
      </div>
    )
  }
