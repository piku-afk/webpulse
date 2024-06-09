import { fetchWebsites } from './websites.service.js';

export const getWebsites = async () => {
  return await fetchWebsites();
};

export const updateWebsite = async () => {
  return await fetchWebsites();
};
