import React, { useState } from 'react';
import axios from 'axios';
import './UploadVideo.css';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const onClickHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('video', selectedFiles[i]);
    }
    formData.append('title', title);
    formData.append('author', author);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const url = 'https://video-upload-backend.onrender.com/api/upload-video';
      const response = await axios.post(url, formData, config);

      // Alert message and reset form inputs
      alert('Video uploaded successfully!');
      setTitle('');
      setAuthor('');
      setSelectedFiles([]);

      console.log('Upload successful:', response.data);
    } catch (err) {
      console.log('Error uploading video:', err.response);
      alert('Error uploading video.');
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Upload Video</h1>
      <form className="card-form">
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="card-input"
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            className="card-input"
          />
        </div>
        <div className="form-group">
          <label>Video:</label>
          <input 
            type="file" 
            multiple 
            onChange={onFileChange} 
            className="card-input"
          />
        </div>
        <button onClick={onClickHandler} className="card-button">Upload Video</button>
      </form>
    </div>
  );
};

export default UploadVideo;
