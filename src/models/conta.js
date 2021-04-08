const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conta = new Schema({
    numeroConta: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    saldo: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('conta', Conta);