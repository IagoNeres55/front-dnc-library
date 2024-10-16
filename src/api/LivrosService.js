import axios from "axios";

const BASE_URL = "https://dnc-library.onrender.com";

export class LivrosService {
  static getLivros() {
    return axios.get(BASE_URL + "/books");
  }

  static getLivro(id, token) {
    return axios.get(`${BASE_URL}/livros/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static createLivro(body, token) {
    return axios.post(`${BASE_URL}/books`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateLivro(id, body, token) {
    return axios.put(`${BASE_URL}/livros/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static deleteLivro(id, token) {
    return axios.delete(`${BASE_URL}/livros/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static login(email, password) {
    return axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
  }
}
