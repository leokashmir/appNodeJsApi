const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const apiskyController = require('../controllers/apisky-controller');
let middleware = require('../middleware/auth.js');




router.get("/", (req, res, next) => {
    res.status(200).send({
        title: 'API REST WITH NODEJS'
    });
});


router.get("/testeGet", (req, res, next) => {
    res.status(200).send({
        title: 'API GET'
    });
});


router.post("/testePost", (req, res, next) => {
    res.status(200).send({
        title: 'API POST'
    });
});


router.post('/cadastro', [
    check('email').isEmail(),
    check('senha').isLength({ min: 6 }).withMessage("senha precisa ter no minimo 6 caracteres.")
  ], apiskyController.createUser );

  router.post('/auth', apiskyController.postAuth);
  router.get('/listarUsuarios', middleware.checkToken, apiskyController.get);
  router.get('/buscarUsuario/:id', middleware.checkToken, apiskyController.getId);
  router.get('/buscarUsuarioNome/:nome', middleware.checkToken, apiskyController.getNomeUsuario);
  router.get('/excluirUsuario/:id', middleware.checkToken, apiskyController.deleteUsuarios);
  

module.exports = router;