const mongoose = require('mongoose');

function connect(){
    mongoose
    .connect("mongodb://localhost/bancoFuncional", {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log("Ok")
    })
    .catch((error) => {
        console.log(`Error ${error}`)
    })
}

module.exports = connect();