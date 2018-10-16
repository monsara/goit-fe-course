const BASE_URL = 'https://api.linkpreview.net/';
const API_KEY = '5b95674e6df9cb84931d049a63cf56e0a47379c26c5cf';

export const getUrlInfo = (url) => {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${url}`)
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .catch(error => {
      console.log('ERROR: ', error);
    });
}