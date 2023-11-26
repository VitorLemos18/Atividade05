const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const LivroSchema = mongoose.Schema({
    livro_cod :{
      type: Number,
      required: false
    },
    livro_autor :{
        type: String,
        required: false
    },
    livro_titulo :{
        type: String,
        required: false
    },
    livro_resumo :{
        type: String,
        required: false
    },   
    livro_editora :{
        type: String,
        required: false
    }
})

class Livro{
    constructor(
      livro_cod,
      livro_autor,
      livro_titulo,
      livro_resumo,   
      livro_editora
        ){
        this.livro_cod = livro_cod,
        this.livro_autor = livro_autor,
        this.livro_titulo = livro_titulo,
        this.livro_resumo = livro_resumo,   
        this.livro_editora = livro_editora    
    }
}

LivroSchema.loadClass(Livro)
const LivroModel = mongoose.model('livros', LivroSchema)
module.exports = {LivroModel,LivroSchema,
  cadastrar: async (req,res) =>{
    console.log("Cadastrando Livros!")
    let novoCodigo = 0;
    await LivroModel.findOne().sort({livro_cod: -1}).then((livro)=>{
      if (livro){
        novoCodigo = livro.livro_cod + 1;
      }
    }).catch((err)=>{
      console.log("erro: "+err)
    })
    const newLivro = new LivroModel({
      livro_cod : novoCodigo,
      livro_autor : req.body.autor,
      livro_titulo : req.body.titulo,
      livro_resumo : req.body.resumo,
      livro_editora : req.body.editor
    });
    console.log("newLivro save");
    await newLivro.save().then(()=>{
        console.log("Cadastro realizado!");
        return "true";
        /*
        return res.status(200).json({
          mensagem: "Livro cadastrado!"
        });
        */
    }).catch((err) => {
        console.log(err)
        return err;
    });
  },
  listar: async (req,res) =>{
    console.log("listando Livros!")
    let novoCodigo = 0;
    await LivroModel.find().then((lista)=>{
        console.log("lista:")
        lista.forEach(livro => {
            console.log("livro:"+livro)
        });
        return lista;
        /*
        return res.status(200).json({
          mensagem: "Livro cadastrado!"
        });
        */
    }).catch((err) => {
        console.log(err)
        return err;
    });
  },
}

/*
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
     //* Helper method for defining associations.
     //* This method is not a part of Sequelize lifecycle.
     //* The `models/index` file will call this method automatically.
     
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
*/