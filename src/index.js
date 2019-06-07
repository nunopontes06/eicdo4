/* Este coomando serviu apenas para nos sertimos mais confortaveis a consola e sobre o que faz a mesma

console.log('Olá Mundo!')

*/

/*Este comando vai referenciar a biblioteca "express"*/

let express = require('express')

/*Criamos uma aplicacao express*/

let app = express()


/*Fazemos referencia ao ficheiro que recentemente criamos ou seja o person.js atraves de um route ou seja um path/caminho*/

let personRoute =  require('./routes/person')

let customerRoute = require('./routes/customer')

let path = require('path')

/*Dependencia/referencia para o body-parser*/

let bodyParser = require('body-parser')

app.use(bodyParser.json())

/*Dependencia que permite utilizar a pagina HTML do erro 500*/

/*Posteriormente dizemos ao express para registar este route*/
/*A ORDEM DESTAS FUNCOES É IMPORTANTE PORQUE É ASSIM QUE TEM DE SER FEITO EM MIDDLWARE*/
/*De forma a que as mesmas sejam executadas em serie no array para que faca sentido*/
/*Para podermos ver o conteudo de um ficheiro estatico utilizamos a seguinte funcao abaixo relativo a raiz do projeto*/

/*Basicamente em qualquer instancia String pegamos num atributo chamado de body
As funcoes de middleware geralmente possuem tres parametros
* next -- é uma referencia a proxima funcao do pipeline
* new Date().toString basicamente vai imprimir uma versao longa da data e hora e lista o url que foi requisitado no atributo original do URL*/
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    /*res.send('') este comando basicamente corta o pipeline e nao passa a proxima funcao.
    * Caso nao tenha nem uma nem outra o utilizador fica a espera ate que se deia timeout*/
    next() /*Passa a proxima funcao*/
})

app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

/*Erro 404 Recurso Nao Encontrado*/

app.use((req, res, next)=>{
    res.status(404).send('Achamos que esta perdido!')
})

/*Erro 500
* */

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html')) /*Permite mostrar a pagina html que esta na pasta public*/
})

/*Pretendemos também que o express referencie/listen um port na maquina
* A variavel PORT é lida na variavel ambiental ou seja algo defeninido na linha de comandos assim que abrimos o projeto
* Ou nesse caso se isso falhar o que substitui a variavel é o 3000
*
* CTRL + C permite parar o servidor*/

const PORTA = process.env.PORT || 3000  /*Caso nao exista || retorna 3000*/
app.listen(PORTA, () => console.info(`O servidor comecou na porta: ${PORTA}`)) /*Imprime a mensagem sobre a porta onde o servidor esta a ser corrido*/

