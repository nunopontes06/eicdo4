/*Referencias e depencias*/

let CustomerModel = require('../modules/customer.model')
let express = require('express')
let router = express.Router()

/*Criar um novo cliente*/
/*Foi criado um novo metodo POST
 Basicamente o que isto vai permitir é chamar o localhost:3000/customer onde iremos fazer o request atraves do metodo POST ao servidor

 O express basicamente nao sabe como por as coisas no body portanto o que fizemos foi simplesmente dizer a ele como o fazer
 Essencialmente*/

/*A condicao if verifica se o request body existe de facto
* Essencialmente se nao existir retornamos uma resposta com status 400 ou seja é uma bad quest posteriormente é enviamo uma String com essa resposta
* "Request body missing"*/

router.post('/customer', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }

    if(!req.body.email) {
        // ...
    }

    // let user = {
    //   name: 'firstname lastname',
    //   email: 'email@gmail.com'
    // }

    let model = new CustomerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

/*Foi criado um novo metodo GET
Criou-se um endpoint chamado customer
* Ou seja para este efeite esperamos um email ou seja que seja introdozido um email
* Escolhemos CustomerModel porque o mesmo já nos permite utilizar uma serie de queries para procurar o conteudo deste caso
* A condicao if neste caso verifica se o email de facto existe aqui*/

router.get('/customer', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOne({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

/*Este metodo permite efetuar um pedido para editar um utilizador existente na base de dados*/

router.put('/customer', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

/*Apaga o utilizador da base de dados basicamente*/

router.delete('/customer',(req, res)=>{
    if (!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
        .then(doc =>{
            res.json(doc)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

module.exports = router
