import Head from "next/head";
import { useEffect, useState } from "react";
import { headers } from "../../next.config";
import "bootstrap/dist/css/bootstrap.min.css";
import { servDelete } from "@/services/servDelete";
import axios from 'axios';

export default function Home() {

  // Declarar a variavel para receber os registros retorno da API
  const [data, setData] = useState([]);

  const [message, setMessage] = useState([]);

  // Declarar a variavel para receber o número da pagina
  //const [page, setPage] = useState([]);

  // Declarar a variavel para receber u ultimo numero da pagina
  //const [lastPage, setLastPage] = useState("");

  // Criar a função com requisição para API recuperar usuários
  const getLivro = async (page) =>{

 /* if(page === undefined){
    page = 1;
  }
  setPage(page)
*/
    // Realizar a requisição para API com axios para a rota listar usuários
    await axios.get("http://localhost:8080/lista")
    .then((response) => { // Acessa o then quando a API retorna status 200

      //Atribuir os registros no state data
      setData(response.data.lista)
      //Atribuir a última página
      //setLestPage(response.data.pagination.lastPage)

    }).catch((err) => { // Acessa o then quando a API retorna erro
      //Acessa o if quando a Api retornar erro
      if (err.response) {
      //Atribui a mensagem no state mensage  
        setMessage(err.response.data.mensage);
      } else {
        //Atribui a mensagem no state mensage
        setMessage("Erro: tente mais tarde!")
      }

    })
  }

  // useEffect é usando para lidar com efeitos colaterais em um componente. por exemplo, atualizar o estado do componente, fazer chamada a APIs, manipular eventos, entre outros.

  useEffect(() => {
    // Chamar a função com requisição para API
    getLivro();
  }, []);

const excluirLivro = async (id) =>{
  console.log("id:"+id)
  // Realizar a requisição para API com axios para a rota listar usuários
  await axios.get("http://localhost:8080/deletaLivro/"+id)
  .then((response) => { // Acessa o then quando a API retorna status 200

    //Atribuir os registros no state data
    setData(response.data.lista)
    //Atribuir a última página
    //setLestPage(response.data.pagination.lastPage)

  }).catch((err) => { // Acessa o then quando a API retorna erro
    //Acessa o if quando a Api retornar erro
    if (err.response) {
    //Atribui a mensagem no state mensage  
      setMessage(err.response.data.mensage);
    } else {
      //Atribui a mensagem no state mensage
      setMessage("Erro: tente mais tarde!")
    }
  })
}

  return (
    <>
      <Head>
        <title>Catálogo de Livros</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cadastrar">Inserir</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

        

<div class="container mt-5">
<h2 className="mb-4">Catálogo de Livros</h2>
  <table class="table table-borderless table-hover ">
    <thead class="table-dark">
      <tr>
        <th>CodLivro</th>
        <th>Titulo</th>
        <th>Resumo</th>
        <th>Autor</th>
        <th>Editor</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody class="table-body">
      {data.map(livro => ( 
        <tr key={livro._id}>
          <td>{livro.livro_cod}</td>
          <td>{livro.livro_titulo}</td>
          <td>{livro.livro_resumo}</td>
          <td>{livro.livro_autor}</td>
          <td>{livro.livro_editora}</td>
          <td class="data-cell">
            <button class="btn btn-danger" onClick={() => excluirLivro(livro._id)}>Excluir</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </main>
    </>
  );
}