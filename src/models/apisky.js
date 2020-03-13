const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const schema = new Schema({
    Id: {
        Type: Number,
    },
    nome: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefones: [{
        numero:{type: String },
        ddd:{type: String },
    }],    
    data_criacao: {
        type: Date,
        default: Date.now,      
     
    },
    data_atualizacao: {
        type: Date,
        default: Date.now,   
     
    },
    data_ultimo_log: {
        type: Date,
        default: Date.now,
       
    },
    token:{
        type: String
    }    

    
});
schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 20);
    this.senha = hash;

    next();
});

module.exports = mongoose.model('Apisky', schema);