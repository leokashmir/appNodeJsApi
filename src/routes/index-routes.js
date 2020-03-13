const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const apiskyController = require('../controllers/apisky-Controller');
let middleware = require('../middleware/auth.js');



router.get("/", (req, res, next) => {
    res.status(200).send({
        title: 'API REST WITH NODEJS'
    });
});




module.exports = router;