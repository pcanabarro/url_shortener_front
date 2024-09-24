import React, { useState, useEffect } from 'react';
import { getAllUrls, deleteUrl, updateUrl, createRandomUrl, createUrl } from './api';

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
      // console.log("aaaa", response.data)
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleCreateUrlRandom = async () => {
    try {
      await createRandomUrl({ "original_url": newOriginalUrlRandom });
      setNewOriginalUrlRandom(newOriginalUrlRandom);
      loadUrls();
    } catch (error) {
      console.error('Error creating Random URL:', error);
    }
  };

  const handleCreateUrl = async () => {
    try {
      await createUrl({ "original_url": newOriginalUrl, "short_url": newShortUrl });
      setNewOriginalUrl(newOriginalUrl);
      setNewShortUrl(newShortUrl);
      loadUrls();
    } catch (error) {
      console.error('Error creating URL:', error);
    }
  };

  const handleUpdateUrl = async () => {
    try {
      await updateUrl({ id: updateId, original_url: updatedUrl, short_url: updatedShortUrl });
      setUpdatedShortUrl(updatedShortUrl);
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
    <div className="App">
      <h1>URL Manager</h1>

      <div>
        <h2>Create New URL Random</h2>
        <input
          type="text"
          value={newOriginalUrlRandom}
          onChange={(e) => setNewOriginalUrlRandom(e.target.value)}
          placeholder="Enter URL"
        />
        <button onClick={handleCreateUrlRandom}>Create URL</button>
      </div>

      <div>
        <h2>Create New URL</h2>
        <input
          type="text"
          value={newOriginalUrl}
          onChange={(e) => setNewOriginalUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <input
          type="text"
          value={newShortUrl}
          onChange={(e) => setNewShortUrl(e.target.value)}
          placeholder="Enter Shortcut"
        />
        <button onClick={handleCreateUrl}>Create URL</button>
      </div>

      <div>
        <h2>All URLs</h2>
        <ul>
          {urls.map((url) => (
            <li key={url.id}>
              Short: {url.short_url} | Original: {url.original_url}{' '}
              <button onClick={() => handleDeleteUrl(url.id)}>Delete</button>
              <button
                onClick={() => {
                  setUpdateId(url.id);
                  setUpdatedUrl(url.original_url);
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>

      {updateId && (
        <div>
          <h2>Update URL</h2>
          <input
            type="text"
            value={updatedShortUrl}
            onChange={(e) => setUpdatedShortUrl(e.target.value)}
            placeholder="Enter updated URL"
          />
          <button onClick={handleUpdateUrl}>Update URL</button>
        </div>
      )}
    </div>
  );
}

export default App;
