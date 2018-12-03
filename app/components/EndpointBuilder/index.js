export default class EndpointBuilder {
  constructor(endpoint, params) {
    this.params = params;
    this.apiEndpoint = `${endpoint}?${this.parseQueryParams()}key=${process.env.YOUTUBE_API_KEY}`;
  }

  parseQueryParams() {
    return Object.keys(this.params).reduce((acc, el) => `${acc}${el}=${this.params[el]}&`, '');
  }
}
