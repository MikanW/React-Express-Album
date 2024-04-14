import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './home/Home';
import Album from './album/Album';
import Blog from './blog/Blog';
import About from './about/About';
import AppNav from './AppNav';


function App() {

  const homepageImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg"
  ]
  return (
    <div className='App'>
      <div className='Header'>
        <AppNav />
      </div>
      <div className='Main'>
        <Routes>
          <Route path="/" exact element={<Home slideImages={homepageImages} />} />
          <Route path="/home" element={<Home slideImages={homepageImages} />} />
          <Route path="/album" element={<Album />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

    </div>


  );
}

export default App;
