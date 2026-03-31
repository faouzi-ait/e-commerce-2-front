class ApiClient {
  constructor(axiosInstance, headers = {}) {
    this.headers = headers;
    this.axiosInstance = axiosInstance;
  }

  setHeaders = (headers) => {
    this.headers = {
      Accept: "application/json",
      ...headers,
    };
  };

  makeRequest(method, endpoint, data = {}, opts = {}) {
    const request = {
      method,
      endpoint,
      ...opts,
    };

    if (method.toLowerCase() === "get") {
      request.params = data;
    } else {
      request.payload = data;
    }

    return this.send(request);
  }

  async send(request) {
    const {
      method = "get",
      endpoint,
      payload = {},
      headers = {},
      params,
    } = request;

    try {
      const response = await this.axiosInstance({
        method,
        headers: { ...this.headers, ...headers },
        params,
        url: endpoint,
        data: payload,
      });
      return response;
    } catch (error) {
      return { error };
    }
  }
}

["get", "post", "put", "patch", "delete"].forEach((method) => {
  ApiClient.prototype[method] = function (endpoint, data = {}, opts = {}) {
    return this.makeRequest(method, endpoint, data, opts);
  };
});

export default ApiClient;
