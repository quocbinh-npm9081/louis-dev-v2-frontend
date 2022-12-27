import axios, { AxiosInstance } from 'axios';
class Http {
  intance: AxiosInstance;
  constructor() {
    this.intance = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }
}

export default new Http().intance;
