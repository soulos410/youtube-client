import '@babel/polyfill';
import './scss/style.scss';
import { isValueExist, clearPagination } from './utils';
import SearchBox from './components/SearchBox';
import MainContainer from './components/MainContainer';
import Paginator from './components/Paginator';

const mainHead = document.getElementsByTagName('head')[0];
mainHead.innerHTML
  += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';
const mainContainer = new MainContainer();
mainContainer.insertContainer();
const searchBox = new SearchBox({
  autofocus: true,
  placeholder: 'input here',
  type: 'input',
});

searchBox.initSearchBox();
const searchEvent = document.querySelector('.search-ico');
const searchKeyboardEvent = document.querySelector('.search-box');
const paginator = new Paginator();

function getContainerWidth() {
  const clientWidth = window.innerWidth;
  if (clientWidth < 720 && clientWidth >= 350) return 345;
  if (clientWidth < 1380 && clientWidth >= 720) return 690;
  if (clientWidth >= 1380) return 1380;
  return undefined;
}
function searchVideos() {
  if (isValueExist()) {
    const youtubeVideo = document.querySelector('.youtube-video');
    if (youtubeVideo) {
      const contentWrapper = document.querySelector('.main-container');
      const paginatorContainer = document.querySelector('.paginator');
      contentWrapper.removeChild(paginatorContainer);
      clearPagination();
    }
    let containerWidth = getContainerWidth();
    const videosContainer = document.querySelector('.videos-wrapper');
    videosContainer.innerHTML = '';
    SearchBox.search(isValueExist());
    paginator.calculatePages();
    paginator.showPagination();
    const pageClick = document.querySelector('.paginator');
    pageClick.addEventListener('click', (event) => {
      if (event.target.textContent) {
        const nextPage = parseInt(event.target.textContent, 10) - 1;
        videosContainer.style.transform = `translate3d(${-nextPage * containerWidth}px,0px,0px)`;
      }
    });
    window.addEventListener('resize', () => {
      containerWidth = getContainerWidth();
      paginator.calculatePages();
      paginator.rebuildPagination();
    });
  }
}

searchEvent.addEventListener('click', searchVideos);

searchKeyboardEvent.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) searchVideos();
});
