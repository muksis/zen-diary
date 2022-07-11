import axios from 'axios';

const API_URL = '/api/entries/';

// Create new entry
const createEntry = async (entryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, entryData, config);

  return response.data;
};

// Get user entries
const getEntries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user entry
const getEntry = async (entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + entryId, config);

  return response.data;
};

// Close entry
const closeEntry = async (entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + entryId,
    { status: 'closed' },
    config
  );

  return response.data;
};

const entryService = {
  createEntry,
  getEntries,
  getEntry,
  closeEntry,
};

export default entryService;
