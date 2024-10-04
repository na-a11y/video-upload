import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllUploadedVideos.css';

const AllUploadedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9; // 3 rows of 3 videos

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://video-upload-backend.onrender.com/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`https://video-upload-backend.onrender.com/api/videos/${videoId}`);
      setVideos(videos.filter(video => video._id !== videoId));
      alert('Video has been deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const totalPages = Math.ceil(videos.length / videosPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="all-videos-container">
      <h1>All Uploaded Videos</h1>
      <div className="videos-grid">
        {currentVideos.map(video => (
          <div className="video-item" key={video._id}>
            <h3>{video.title} by {video.author}</h3>
            {video.videos.map((vid, index) => (
              <video key={index} src={vid.url} controls preload="metadata">
                <source src={vid.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
            <button onClick={() => handleDelete(video._id)}>Delete</button>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUploadedVideos;
