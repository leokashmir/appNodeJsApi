const mongoose = require('mongoose');
const ApiskyModel = mongoose.model('Apisky');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../repositores/apisky-repository');
const authConfig = require('../config/auth');



function geraToken(id) {
    return jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
    }); 
}


// Auth
exports.postAuth = async (req, res) => {
    const { email, senha} = req.body;
    
    const apisky = await ApiskyModel.find({email});
  
  
// Object.keys(apisky).length pega o tamanho do array apisky
    if ( Object.keys(apisky).length == 0) {
        return res.status(401).send({ error: 'Usuario e/ou senha inválidos!' });
    }
        const { id, nome } = apisky[0];

    try {
      
       const senhaValida = await bcrypt.compare(senha, apisky[0].senha)
        if (!senhaValida) {
            throw new Error('Usuario e/ou senha inválidos!')
        }


      
    } catch (err) {
        return res.status(401).send({ error: err.message });
    }


    const tokenGerado = geraToken(id)
    
    let apiskyUpdate = new ApiskyModel({
        Id: id,
        token: tokenGerado,
        data_ultimo_log : Date.now,
        data_atualizacao : Date.now,
        data_criacao : apisky[0].data_criacao

    });
    const filter = {Id: id}

     await  apiskyUpdate.updateOne(filter, apiskyUpdate);
    
   
        
    try {
        return res.json({
            user: {
                id,
                nome,
            },
            token: tokenGerado
        })
    } catch (err) {
        return res.status(401).send({ error: err })
    }
}  

//LISTAR USUARIOS
exports.get = (req, res) => {
    ApiskyModel.find()
    .then((apisky) => {
        res.status(200).send(apisky)
    })
    .catch((err) => {
        res.status(400).send({ message: 'Falha ao carregar usuario.' });
    });
} 

//  BUSCAR USUARIO POR ID
exports.getId = (req, res) => {
    const apiskyId = req.params.id;

    ApiskyModel.findById(apiskyId, function (err, apisky) {
    
        if (!apisky) {
          return res.status(200).send({ message: `Infelizmente não localizamos usuarios com este id: ${apiskyId}` });
        }
    
        res.status(200).send(apisky);
      })
}

//  BUSCAR USUARIO POR NOME
exports.getNomeUsuario = (req, res) => {
    const nome = req.params.nome;
    ApiskyModel.find({ nome }, function (err, apisky) {
        if (err) res.status(500).send(err);
        res.status(200).send(apisky);
    })
}

//  EXCLUIR USUARIO POR NOME
exports.deleteUsuarios = (req, res) => {
    const id = req.params.id;
    ApiskyModel.findById(id, function(err, apisky){
        if (err) res.status(500).send(err);

        if(!apisky) return res.status(200).send({message:'Infelizmente não localizamos o Id'})

        apisky.remove(function (err){
            if(!err){
                res.status(200).send({message: 'Usuario removido com sucesso!'})
            }
        })
    })
}

// CADASTRAR USUARIO
exports.createUser = async (req, res) => {
    return res.status(200).send("olaaaaaa");
 const {errors} = validationResult(req);

    if(errors.length > 0) {
      return res.status(400).send({message: errors})
 }     
     
   
  try {
    const apisky = new ApiskyModel(req.body);

    const email = apisky.email
    const isEmail = await ApiskyModel.find({email});
   

    if (Object.keys(isEmail).length !=0) {

        return res.status(200).send({ error: 'Email já existente!' });

    }else{

        res.status(201).send({apisky});
    }
   
    await repository.createUser(apisky);
   
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar.' + e });
  }
};








