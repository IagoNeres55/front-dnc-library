import { useEffect, useState } from "react";
import "./index.scss";
import { LivrosService } from "../../api/LivrosService";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const Livros = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("user_login"));

  const [livros, setLivros] = useState([]);

  async function getLivros() {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await LivrosService.getLivros();
      setLivros(data.books);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteLivro(livroId) {
    let valida = confirm(
      `Você realmente deseja remover o livro de ID: ${livroId}`
    );
    if (valida) {
      await LivrosService.deleteLivro(livroId, userLogin.token)
        .then(({ data }) => {
          alert(data.message);
          getLivros();
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data.message}`);
        });
    }
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
        <ul class="livros-list">
          {livros.map((livro) => (
            <li key={livro._id} class="livro-card">
              <div class="livro-info">
                <h3 class="livro-title">{livro.title}</h3>
                <p class="livro-detail">
                  <strong>Editora:</strong> {livro.publisher}
                </p>
                <p class="livro-detail">
                  <strong>Páginas:</strong> {livro.num_page}
                </p>
                <p class="livro-detail">
                  <strong>Criado em:</strong>{" "}
                  {new Date(livro.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div class="livro-actions">
                <Link class="btn edit" to={`/livros/edicao/${livro._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                  Editar
                </Link>

                <button
                  class="btn delete"
                  onClick={() => deleteLivro(livro._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Livros;
