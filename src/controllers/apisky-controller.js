const mongoose = require('mongoose');
const ApiskyModel = mongoose.model('Apisky');
const { validationResult } = require('express-validator');
const repository = require('../repositores/apisky-repository');






// CADASTRAR USUARIO
exports.createUser = async (req, res) => {

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








