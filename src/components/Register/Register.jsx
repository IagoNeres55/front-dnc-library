import React, { useState } from "react";
import "./index.scss";
import Button from "../Button/Button";
import { LivrosService } from "../../api/LivrosService";
import Spinner from "../Spinner/Spinner";

export default function Register({ handleCloseModal, handleOpenLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const payload = {
    name: name,
    email: email,
    password: senha
  };

  const createUser = async () => {
    setisLoading(true);
    try {
      const res = await LivrosService.CreateUser(payload);
      console.log(res.data);

      handleCloseModal();
      handleOpenLogin();
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <form action="submit" className="form">
          <h2 className="text-title">Registrar</h2>
          <input
            className="inputForm"
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputForm"
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputForm"
            type="text"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
        </form>
      )}

      <div className="containerButtons">
        <Button onClick={() => handleCloseModal()} color="red">
          Fechar
        </Button>
        <Button onClick={() => createUser()}>Criar</Button>
      </div>
    </div>
  );
}
