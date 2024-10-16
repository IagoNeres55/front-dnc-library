import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Home from "./views/Home/Home";
import Livros from "./views/Livros/Livros";
import LivrosCadastro from "./views/LivrosCadastro/LivrosCadastro";
import LivrosEdicao from "./views/LivrosEdicao/LivrosEdicao";
import App from "./App";
import Autores from "./views/Autores/Autories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/livros",
        element: <Livros />,
      },
      {
        path: "/livros/cadastro",
        element: <LivrosCadastro />,
      },
      {
        path: "/livros/edicao/:livroId",
        element: <LivrosEdicao />,
      },
      {
        path: "/autores",
        element: <Autores />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
