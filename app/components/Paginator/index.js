export default class Paginator {
  constructor() {
    this.windowWidth = document.documentElement.clientWidth;
    this.videosOnPage = 4;
    this.videosCount = 15;
    this.pagesCount = 0;
  }

  calculatePages() {
    const clientWidth = window.innerWidth;
    if (clientWidth < 720 && clientWidth >= 350) this.pagesCount = 15;
    if (clientWidth < 1380 && clientWidth >= 720) this.pagesCount = 8;
    if (clientWidth >= 1380) this.pagesCount = 4;
  }

  showPagination() {
    const mainContainer = document.querySelector('.main-container');
    const paginatorList = document.createElement('ul');
    paginatorList.className = 'paginator';
    mainContainer.append(paginatorList);
    const addPaginationButtons = document.querySelector('.paginator');
    for (let i = 1; i < this.pagesCount + 1; i += 1) {
      const paginatorNode = document.createElement('li');
      paginatorNode.className = 'pagination-page';
      paginatorNode.textContent = `${i}`;
      addPaginationButtons.append(paginatorNode);
    }
  }

  rebuildPagination() {
    this.calculatePages();
    const getPagination = document.querySelector('.paginator');
    const getMainContainer = document.querySelector('.main-container');
    getMainContainer.removeChild(getPagination);
    this.showPagination();
  }
}
