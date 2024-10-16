import React, { useEffect, useState } from "react";
import "./index.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hook/hookModal";
import { LivrosService } from "../../api/LivrosService";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const navigate = useNavigate();

  const handlePageLivros = () => {
    navigate("/livros");
  };

  const { openModal, closeModal, isModalOpen } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const dados_login = localStorage.getItem("user_login");
    if (!dados_login) {
      setLogin();
      return;
    }
    setLogin(dados_login);
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
      closeModal("login");
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>Biblioteca Central Online - Livros</h1>
      <div>
        <Button onClick={handlePageLivros}>Ver Livros</Button>
        <Button onClick={() => {}}>Usuários</Button>
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

        {isLoading ? (
          <Spinner />
        ) : (
          <form className="form">
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
            <Button onClick={() => handleLogin()}>Entrar</Button>
          ) : (
            <Button>Entrar</Button>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen("register")}
        onClose={() => closeModal("register")}
      >
        <h2>Cadastro</h2>
        <Button onClick={() => closeModal("register")}>Fechar</Button>
      </Modal>
    </div>
  );
};

export default Home;
