'use strict';
/* global store, $, Api */

const videoList = (function() {
  const generateListItem = function(video) {
    return  `
    <li class="js-search-result" data-item-id="${video.id}">
      <h3>${video.title}</h3>
      <img src="${video.thumbnail}">
    </li>`;
  };

  const render = function() {
    const videosHtml = store.videos.map(video => generateListItem(video)).join('');
    $('.results').html(videosHtml);
  };

  const handleFormSubmit = function() {
    $('form').on('submit', event => {
      event.preventDefault();
      
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
  
      Api.fetchVideos(searchTerm, (response) => {
        const decoratedVideos = Api.decorateResponse(response);
        store.setVideos(decoratedVideos);
        render();
      });
    });
  };

  return {
    generateListItem, render, handleFormSubmit
  }
}());