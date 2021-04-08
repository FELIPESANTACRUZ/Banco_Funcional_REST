const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');  
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

 
var port = process.env.PORT || 8000;
 

 
/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router  = express.Router(); 

var Conta = require('./src/models/conta.js');
const conta = require('./src/models/conta.js');

/* Middleware para usar em todos os requests enviados para a API- Mensagem Padrão */
app.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next(); 
});


// Rotas que irão terminar em '/contas' - (servem tanto para: GET All &amp; POST)
app.route('/contas')
 
    /*  Criar conta (acessar em: POST http://localhost:8080/conta */
    app.post(function(req, res) {
        var conta = new Conta();
 
        //setar campos de conta (que virá do request)
        conta.numeroConta = req.body.numeroConta;
        conta.nome = req.body.nome;
        conta.saldo = req.body.saldo;
 
        conta.save(function(error) {
            if(error)
                res.send(error);
 
            res.json({ message: 'Conta criada!' });
        });
    });

/* acessar em: GET http://locahost:8080/conta) */
app.get(function(req, res) {
 
    //Função para Selecionar Todas as 'contas' e verificar se há algum erro:
    conta.find(function(err, Contas) {
        if(err)
            res.send(err);

        res.json(Contas);
    });
});

 
/* teste no insommnia GET: http://localhost:8000/) */
router.get('/mostrar',function (req, res) {
    res.json({ message: 'OK' });
});
 

// Rotas que irão terminar em '/usuarios/:usuario_id' - (servem tanto para GET by Id, PUT, &amp; DELETE)
app.route('/contas/:conta_id')
 
    /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/api/usuarios/:usuario_id) */
    .get(function(req, res) {
 
        //Função para Selecionar Por Id e verificar se há algum erro:
        conta.findById(req.params.usuario_id, function(error, Conta) {
            if(error)
                res.send(error);
 
            res.json(Conta);
        });
    });

        /* 4) Método: Atualizar (acessar em: PUT http://localhost:8080/api/usuarios/:usuario_id) */
        app.put(function(req, res) {
 
            //Para atualizarmos, precisamos primeiro achar a conta. Para isso, vamos selecionar por id:
            conta.findById(req.params.conta_id, function(error, Conta) {
                if(error)
                    res.send(error);
     
                //Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo:
                conta.numeroConta = req.body.numeroConta;
                conta.nome = req.body.nome;
                conta.saldo = req.body.saldo;
     
                // salvar alterações....
                conta.save(function(error) {
                    if(error)
                        res.send(error);
     
                    res.json({ message: 'Conta Atualizada!' });
                });
            });
        });

 
//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);
