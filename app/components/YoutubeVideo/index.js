export default class YoutubeVideo {
  constructor(title, description, preview, author, publicationDate, videoLink, viewsCount) {
    this.title = title;
    this.description = description;
    this.preview = preview;
    this.author = author;
    this.publicationDate = publicationDate;
    this.videoLink = videoLink;
    this.viewsCount = viewsCount;
  }

  printVideo() {
    const getMiliseconds = Date.parse(this.publicationDate);
    const testDate = new Date(getMiliseconds);
    return `<div class=youtube-video><p>${this.title}</p>
    <p><a href=${process.env.YOUTUBE_WATCH_VIDEO}${
  this.videoLink
} target=_blank>Watch this video</a></p>
    <p>${this.description}</p>
    <p><img src=${this.preview}></p>
    <p>Author: ${this.author}</p>
    <p>Publication date: ${testDate.toDateString()}</p>
    <p>Views: ${this.viewsCount}</p>
    </div>`;
  }
}
