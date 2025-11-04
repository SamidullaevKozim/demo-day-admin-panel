import axios from "axios";

const instance = axios.create({
  baseURL: 'https://6882137966a7eb81224d53b9.mockapi.io',
  headers: {'Content-Type': 'application/json'}
});

export default instance