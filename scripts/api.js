'use strict';
/* global $ */

const Api = (function() {
  const API_KEY = 'AIzaSyBj7JcuxJhmbNRDEvGzcfnVMlMWGNea8Sc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const decorateResponse = function(response) {
    return response.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url
      };
    });
  };

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      key: API_KEY,
      part: 'snippet'
    };
  
    $.getJSON(BASE_URL, query, callback);
  };

  return {
    fetchVideos, decorateResponse
  };
}());

