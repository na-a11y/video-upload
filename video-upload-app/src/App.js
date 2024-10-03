// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import UploadVideo from './components/UploadVideo';
import AllUploadedVideos from './components/AllUploadedVideos';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/all-uploaded-videos" element={<AllUploadedVideos />} />
      </Routes>
    </Router>
  );
};

export default App;
