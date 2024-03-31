import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Album from './album/Album';
import Blog from './blog/Blog';
import About from './about/About';
import AppNav from './AppNav';


function App() {
  return (
    <div className='App'>
      <div className='Header'>
        <AppNav />
      </div>
      <Routes>
        <Route path="/" exact element={<Album />} />
        <Route path="/album" element={<Album />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>


  );
}

export default App;
