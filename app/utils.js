export const fetchDataFromApi = async (endpoint) => {
  const result = await fetch(endpoint);
  return result.json();
};
export const getFullQueryParams = (initialParams, searchWord) => {
  const searchParams = Object.assign({ q: searchWord }, initialParams);
  return searchParams;
};
export const isValueExist = () => {
  const checkInputData = document.querySelector('.search-box').value;
  return checkInputData || false;
};
export const clearPagination = () => {
  const videosWrapper = document.querySelector('.videos-wrapper');
  videosWrapper.style.transform = 'translate3d(0px,0px,0px)';
};
