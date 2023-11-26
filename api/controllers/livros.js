// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express
const router = express.Router();
// Incluir o arquivo que possui a conexão com banco de dados
const db = require('../db/models');
const mongoose = require('mongoose')
const livrosClass = require('../db/models/livro');
const TbLivro = mongoose.model("livros")
// Criar a rota listar 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users?page=3
router.post("/livroCad", async (req, res) => {
    let resultado;
    livrosClass.cadastrar(req,res).then((resposta)=>{
        console.log("resposta: "+resposta)
        resultado = resposta;
        return true;
    }).catch((err)=>{
        console.log("erro:"+err)
        resultado = err;
        return err;
    })
})

router.get("/lista", async (req, res) => {
    TbLivro.find().then((lista)=>{
        console.log("lista: "+lista.length)
        return res.json({lista})
        /*
        return res.status(200).json({
          mensagem: "Livro cadastrado!"
        });
        */
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            mensagem: err
        });
    });
});

router.get('/', (req,res) =>{
    console.log("AAQUIIIIIIIIIIIIIIIII")

    res.render("admin/index")
})
// Criar a rota visualizar e receber o parâmentro id enviado na URL 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users/7
router.get("/deletaLivro/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    let id = req.params.id;
    console.log("id: "+id);
    TbLivro.deleteOne({_id: id}).then(()=>{
        console.log("DELETED")
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            mensagem: "Erro ao deletar"
        });
    });

    TbLivro.find().then((lista)=>{
        console.log("lista: "+lista.length)
        return res.json({lista})
        /*
        return res.status(200).json({
          mensagem: "Livro cadastrado!"
        });
        */
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            mensagem: err
        });
    });
    
});

// Criar a rota cadastrar
// Endereço para acessar através da aplicação externa: http://localhost:8080/users
/*
// A aplicação externa deve indicar que está enviado os dados em formato de objeto
Content-Type: application/json

// Dados em formato de objeto
{
    "name": "Cesar",
    "email": "cesar@celke.com.br"
}
*/
router.post("/users", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var dados = req.body;
    //console.log(dados);

    // Salvar no banco de dados
    await db.Users.create(dados).then((dadosUsuario) => {
        // Pausar o processamento e retornar os dados em formato de objeto
        return res.json({
            mensagem: "Usuário cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });
});

// Criar a rota editar 

// Endereço para acessar através da aplicação externa: http://localhost:8080/users

/*
// A aplicação externa deve indicar que está enviado os dados em formato de objeto
Content-Type: application/json

// Dados em formato de objeto
{
    "id": 2,
    "name": "Cesar 2a",
    "email": "cesar2a@celke.com.br"
}
*/
router.put("/users", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var dados = req.body;

    // Editar no banco de dados
    await db.Users.update(dados, { where: { id: dados.id } })
        .then(() => {
            // Pausar o processamento e retornar a mensagem
            return res.json({
                mensagem: "Usuário editado com sucesso!"
            });
        }).catch(() => {
            // Pausar o processamento e retornar a mensagem
            return res.status(400).json({
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });
});

// Criar a rota apagar e receber o parâmentro id enviado na URL 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users/3
router.delete("/users/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    const { id } = req.params;

    // Apagar usuário no banco de dados utilizando a MODELS users
    await db.Users.destroy({
        // Acrescentar o WHERE na instrução SQL indicando qual registro excluir no BD
        where: {id} 
    }).then(() => {
        // Pausar o processamento e retornar a mensagem
        return res.json({
            mensagem: "Usuário apagado com sucesso!"
        });
    }).catch(() => {
        // Pausar o processamento e retornar a mensagem
        return res.status(400).json({
            mensagem: "Erro: Usuário não apagado com sucesso!"
        });
    });
});

// Exportar a instrução que está dentro da constante router 
module.exports = router;