export default class HttpService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    try {
      const res = await fetch(`${this.baseURL}/${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
