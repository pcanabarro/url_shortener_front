import React, { useState, useEffect } from 'react';
import { getAllUrls, deleteUrl, updateUrl, createRandomUrl, createUrl } from './api';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [newOriginalUrlRandom, setNewOriginalUrlRandom] = useState('');
  const [newOriginalUrl, setNewOriginalUrl] = useState('');
  const [newShortUrl, setNewShortUrl] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [updatedUrl, setUpdatedUrl] = useState('');
  const [updatedShortUrl, setUpdatedShortUrl] = useState('');

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const response = await getAllUrls();
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleCreateUrlRandom = async () => {
    try {
      await createRandomUrl({ original_url: newOriginalUrlRandom });
      setNewOriginalUrlRandom('');
      loadUrls();
    } catch (error) {
      console.error('Error creating Random URL:', error);
    }
  };

  const handleCreateUrl = async () => {
    try {
      await createUrl({ original_url: newOriginalUrl, short_url: newShortUrl });
      setNewOriginalUrl('');
      setNewShortUrl('');
      loadUrls();
    } catch (error) {
      console.error('Error creating URL:', error);
    }
  };

  const handleUpdateUrl = async () => {
    try {
      await updateUrl({ id: updateId, original_url: updatedUrl, short_url: updatedShortUrl });
      setUpdateId(null);
      setUpdatedUrl('');
      setUpdatedShortUrl('');
      loadUrls();
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  };

  const handleDeleteUrl = async (id) => {
    try {
      await deleteUrl(id);
      loadUrls();
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">URL Manager</h1>

      <div className="section">
        <h2 className="section-title">Create New URL Random</h2>
        <input
          type="text"
          className="input"
          value={newOriginalUrlRandom}
          onChange={(e) => setNewOriginalUrlRandom(e.target.value)}
          placeholder="Enter URL"
        />
        <button className="button" onClick={handleCreateUrlRandom}>Create URL</button>
      </div>

      <div className="section">
        <h2 className="section-title">Create New URL</h2>
        <input
          type="text"
          className="input"
          value={newOriginalUrl}
          onChange={(e) => setNewOriginalUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <input
          type="text"
          className="input"
          value={newShortUrl}
          onChange={(e) => setNewShortUrl(e.target.value)}
          placeholder="Enter Shortcut"
        />
        <button className="button" onClick={handleCreateUrl}>Create URL</button>
      </div>

      <div className="section">
        <h2 className="section-title">All URLs</h2>
        <ul className="url-list">
          {urls.map((url) => (
            <li className="url-item" key={url.id}>
              <span>Short: {url.short_url} | Original: {url.original_url}</span>
              <div className="url-actions">
                <button className="button delete-button" onClick={() => handleDeleteUrl(url.id)}>Delete</button>
                <button className="button update-button" onClick={() => {
                  setUpdateId(url.id);
                  setUpdatedUrl(url.original_url);
                  setUpdatedShortUrl(url.short_url);
                }}>Update</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {updateId && (
        <div className="section">
          <h2 className="section-title">Update URL</h2>
          <input
            type="text"
            className="input"
            value={updatedUrl}
            onChange={(e) => setUpdatedUrl(e.target.value)}
            placeholder="Enter updated URL"
          />
          <input
            type="text"
            className="input"
            value={updatedShortUrl}
            onChange={(e) => setUpdatedShortUrl(e.target.value)}
            placeholder="Enter updated Short URL"
          />
          <button className="button" onClick={handleUpdateUrl}>Update URL</button>
        </div>
      )}
    </div>
  );
}

export default App;
