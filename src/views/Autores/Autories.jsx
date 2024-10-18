import { useEffect, useState } from "react";
import "./index.scss";
import { LivrosService } from "../../api/LivrosService";
import Spinner from "../../components/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import FormattedDate from "../../utility/formateDate";
import Toast from "../../components/Toast/Toast";

const Autores = () => {
  const [isloading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();

  async function getUsers() {
    setIsLoading(true);
    try {
      const { data } = await LivrosService.Users(state.token);
      setUsers(data.users);
    } catch (err) {
      console.error(err);
      setToast(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="livros">
        <h1 className="">Autores</h1>

        {toast && (
          <Toast
            message="Faça o login para pode acessar essa página!"
            type="error"
            duration={3000}
            onClose={() => setToast(false)}
          />
        )}

        {isloading ? (
          <Spinner />
        ) : (
          <div className="container-card">
            {users?.map((user) => (
              <div className="card">
                <div className="background"></div>
                <div className="content">
                  <h5 className="user-name">Nome: {user.name}</h5>
                  <p className="user-email">E-mail: {user.email}</p>
                  <p className="user-created-at">
                    {user.books.length >= 1
                      ? `${user.books.length} Livros publicados`
                      : "Nenhum Livro publicado"}
                  </p>

                  <div className="user-created-at">{`Criado em: ${FormattedDate(
                    user.createdAt
                  )}`}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {toast && <Spinner />}
      </div>
    </>
  );
};

export default Autores;
