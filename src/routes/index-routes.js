const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const apiskyController = require('../controllers/apisky-controller');



router.get("/", (req, res, next) => {
    res.status(200).send({
        title: 'API REST WITH NODEJS'
    });
});

router.post('/cadastro', [
    check('email').isEmail(),
    check('senha').isLength({ min: 6 }).withMessage("senha precisa ter no minimo 6 caracteres.")
  ], apiskyController.createUser );


module.exports = router;