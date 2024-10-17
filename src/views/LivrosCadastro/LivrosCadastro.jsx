import { useEffect, useState } from "react";
import "./index.scss";
import { LivrosService } from "../../api/LivrosService";
import { useNavigate } from "react-router-dom";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState([]);
  const [responseBook, setResponseBook] = useState('');

  const navigate = useNavigate();

  const userLogin = JSON.parse(localStorage.getItem("user_login"));

  if (!userLogin) {
    navigate("/");
  }

  useEffect(() => {}, []);

  async function createLivro() {
    event.preventDefault();
    const body = {
      title: livro.titulo,
      num_page: Number(livro.num_paginas),
      isbn: livro.isbn,
      publisher: livro.editora,
    };
    if (
      livro.titulo != undefined &&
      livro.titulo != "" &&
      livro.num_paginas != undefined &&
      livro.num_paginas != "" &&
      livro.isbn != undefined &&
      livro.isbn != "" &&
      livro.editora != undefined &&
      livro.editora != ""
    ) {
      try {
        const res = await LivrosService.createLivro(body, userLogin.token);
        setResponseBook(res.data.message)
        document.getElementById("formulario").reset();
      } catch (err) {
        alert(`${err.response.data.error[0]?.message}`);
      } finally {
        setLivro({
          titulo: null,
          num_paginas: null,
          isbn: null,
          editora: null,
        });
      }
    }
  }

  return (
    <>
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
           <h3 className="responseText">{responseBook}</h3>
          <form id="formulario" onSubmit={createLivro}>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                id="titulo"
                required
                onChange={(event) => {
                  setLivro({ ...livro, titulo: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                id="num"
                required
                onChange={(event) => {
                  setLivro({ ...livro, num_paginas: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                id="isbn"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                id="editora"
                required
                onChange={(event) => {
                  setLivro({ ...livro, editora: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
