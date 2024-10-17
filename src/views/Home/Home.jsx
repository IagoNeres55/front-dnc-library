import React, { useEffect, useState } from "react";
import "./index.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hook/hookModal";
import { LivrosService } from "../../api/LivrosService";
import Spinner from "../../components/Spinner/Spinner";
import Register from "../../components/Register/register";

const Home = () => {
  const navigate = useNavigate();

  const handlePage = (page) => {
    navigate(`/${page}`, { state: login });
  };

  const { openModal, closeModal, isModalOpen } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const dados_login = localStorage.getItem("user_login");

    if (!dados_login) {
      setLogin();
      return;
    }
    try {
      const parsedData = JSON.parse(dados_login);
      setLogin(parsedData);
    } catch (error) {
      console.error("Erro ao fazer JSON.parse:", error);
      setLogin(null);
    }
  }, []);

  const cleanStorage = () => {
    localStorage.clear();
    setLogin();
  };

  const handleLogin = async () => {
    setisLoading(true);
    try {
      const res = await LivrosService.login(email, password);
      setLogin(res.data);
      localStorage.setItem("user_login", JSON.stringify(res.data));
      closeModal("login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage =
          error.response.data.error[0]?.message ||
          "Ocorreu um erro inesperado.";
        setError(errorMessage);
      } else {
        setError("Erro ao tentar fazer login.");
      }
      setTimeout(() => {
        setError(null);
      }, 6000);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>Biblioteca Central Online - Livros</h1>
      <div>
        <Button onClick={() => handlePage("livros")}>Ver Livros</Button>
        <Button onClick={() => handlePage("autores")}>Ver Autores</Button>
      </div>

      {login ? (
        <Button color="#c7c7c7" onClick={() => cleanStorage()}>
          Sair
        </Button>
      ) : (
        <>
          <Button onClick={() => openModal("login")}>Login</Button>
          <Button onClick={() => openModal("register")}>Registrar</Button>
        </>
      )}

      <Modal isOpen={isModalOpen("login")} onClose={() => closeModal("login")}>
        <h2>Login</h2>
        {error && <h4 className="textoErro">{error}</h4>}
        {isLoading ? (
          <Spinner />
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <input
              className="inputForm"
              type="text"
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="inputForm"
              type="text"
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
        )}

        <div className="containerButtons">
          <Button color="#ff7777" onClick={() => closeModal("login")}>
            Fechar
          </Button>

          {email.length > 5 && password.length > 5 ? (
            <Button type="submit" onClick={() => handleLogin()}>
              Entrar
            </Button>
          ) : (
            <Button>Entrar</Button>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen("register")}
        onClose={() => closeModal("register")}
      >
        <Register handleCloseModal={() => closeModal('register')} handleOpenLogin={() => openModal('login')}  />
       
      </Modal>
    </div>
  );
};

export default Home;
