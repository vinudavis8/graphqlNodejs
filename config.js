module.exports = {
    port: 4002,
    get uri() { return `http://localhost:${this.port}/`; }
  };
  