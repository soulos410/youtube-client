import EndpointBuilder from '../EndpointBuilder';
import { fetchDataFromApi, getFullQueryParams } from '../../utils';
import { YOUTUBE_QUERY_STATIC_PARAMS } from '../../constants';
import YoutubeVideo from '../YoutubeVideo';

export default class SearchBox {
  constructor(params) {
    this.params = params;
  }

  buildSearchBox() {
    return `<div class=search-box_wrapper><i class="fa fa-search search-ico"></i><input ${Object.keys(
      this.params,
    ).reduce(
      (acc, el) => `${acc} ${el}="${this.params[el]}" `,
      '',
    )} class=search-box /></div><div class=videos-slider><div class=videos-wrapper></div></div>`;
  }

  initSearchBox() {
    const insertSearchBox = document.querySelector('.main-container');
    insertSearchBox.innerHTML = this.buildSearchBox();
  }

  static search(request) {
    const parseData = data => data.items;
    const createRequest = getFullQueryParams(YOUTUBE_QUERY_STATIC_PARAMS, request);
    const youtubeEndpoint = new EndpointBuilder(process.env.YOUTUBE_API_ENDPOINT, createRequest);
    const youtubeData = fetchDataFromApi(youtubeEndpoint.apiEndpoint);
    const videosWrapper = document.querySelector('.videos-wrapper');
    youtubeData.then(parseData).then((data) => {
      data.forEach((element) => {
        fetch(
          `${process.env.YOUTUBE_API_VIEWS}part=statistics&id=${element.id.videoId}&key=${
            process.env.YOUTUBE_API_KEY
          }`,
        )
          .then(json => json.json())
          .then((views) => {
            const currentViews = views.items[0].statistics.viewCount;
            const youtubeVideo = new YoutubeVideo(
              element.snippet.title,
              element.snippet.description,
              element.snippet.thumbnails.medium.url,
              element.snippet.channelTitle,
              element.snippet.publishedAt,
              element.id.videoId,
              currentViews,
            );
            videosWrapper.innerHTML += youtubeVideo.printVideo();
          });
      });
    });
  }
}
