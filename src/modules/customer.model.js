/*Depencia para o Mongoose*/

let mongoose = require('mongoose')

/*Porpriedades para a base de dados*/

/*Variaveis de acesso a base de dados
const server = 'cluster0-skslc.mongodb.net/test?retryWrites=true&w=majority'
const database = 'Grupo04BD'
const user = 'nunopontes'
const password = 'CBCxj9H1o7gPt0Nf'*/

mongoose.connect('mongodb+srv://nunopontes:CBCxj9H1o7gPt0Nf@cluster0-skslc.mongodb.net/test?retryWrites=true&w=majority', {useCreateIndex: true, useNewUrlParser: true})

/*Este Schema basicamente permite criar os utilizadores com os parametros abaixo indicados*/

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

/*Exportar o modulo contendo o nome do module e fazendo a referencia ao CustomerSchema*/

module.exports = mongoose.model('Customer', CustomerSchema)