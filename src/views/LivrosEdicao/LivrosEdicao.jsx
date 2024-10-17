import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";

const LivrosEdicao = () => {
  const { bookId } = useParams();
  const [responseBook, setResponseBook] = useState(false);

  const [livro, setLivro] = useState([]);

  const userLogin = JSON.parse(localStorage.getItem("user_login"));

  if (!userLogin) {
    navigate("/");
  }

  async function getLivro() {
    try {
      const res = await LivrosService.getLivro(bookId);
      setLivro(res.data.books);
    } catch (err) {
      console.error(err);
    }
  }

  async function editLivro() {
    event.preventDefault();
    const body = {
      title: livro.title,
      num_page: Number(livro.num_page),
      isbn: livro.isbn,
      publisher: livro.publisher,
    };
    if (
      livro.title != undefined &&
      livro.title != "" &&
      livro.num_page != undefined &&
      livro.num_page != "" &&
      livro.isbn != undefined &&
      livro.isbn != "" &&
      livro.publisher != undefined &&
      livro.publisher != ""
    ) {
      try {
        const res = await LivrosService.updateLivro(
          bookId,
          body,
          userLogin.token
        );
        setResponseBook(res.data.mensagem);
        setResponseBook(true);
      } catch (err) {
        alert(err.response.data.error[0]?.message);
      } finally {
        setTimeout(() => {
          setResponseBook(false);
        }, 3000);
      }
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          {responseBook && (
            <h3 className="responseText">Livro Alterado com Sucesso.</h3>
          )}
          <form id="formulario" onSubmit={editLivro}>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, title: event.target.value });
                }}
                value={livro.title || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, num_page: event.target.value });
                }}
                value={livro.num_page || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
                value={livro.isbn || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, publisher: event.target.value });
                }}
                value={livro.publisher || ""}
              ></input>
            </div>
            <div className="form-group">
              <button type="submit">Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
