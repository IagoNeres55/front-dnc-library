import React, { useState } from "react";
import "./index.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const navigate = useNavigate();

  const handlePageLivros = () => {
    navigate('/livros')
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <h1>Biblioteca Central Online - Livros</h1>

      <Button onClick={handlePageLivros}>Ver Livros</Button>
      <Button onClick={openModal}>Login</Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Aberto</h2>
        <p>Este é o conteúdo do modal.</p>
        <Button onClick={closeModal}>Fechar</Button>
      </Modal>
    </div>
  );
};

export default Home;
