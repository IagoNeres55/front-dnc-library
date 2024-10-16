import { useEffect, useState } from "react";
import "./index.scss";
import { LivrosService } from "../../api/LivrosService";
import Spinner from "../../components/Spinner/Spinner";
import { useLocation } from "react-router-dom";
import FormattedDate from "../../utility/formateDate";

const Autores = () => {
  const [isloading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();

  const { state } = useLocation();

  async function getUsers() {
    setIsLoading(true);
    try {
      const { data } = await LivrosService.Users(state.token);
      setUsers(data.users);
      console.log(data);
    } catch (err) {
      console.error(err);
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
        <h1>Autores</h1>

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
                  <p className="user-email">
                    {user.books.length >= 1 ? `${user.books.lengt} Livros publicados` : "Nenhum Livro publicado"}
                  </p>

                  <div className="user-created-at">{`Criado em: ${FormattedDate(
                    user.createdAt
                  )}`}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Autores;
