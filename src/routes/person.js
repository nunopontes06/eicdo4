/*Neste ficheiro criamos um route em express que basicamente  consideramos como mini aplicacoes*/

/*Como habitual refenciamos a dependencia express
* Seguidamente de um Route para o express*/

let express = require('express')
let router = express.Router()

/*Querystring => proriedade da query no objeto ao qual fizemos o pedido
Exportamos esse router e basicamente o que isso nos permite é importar para o ficheiro index.js
* Fazemos o pedido atraves do metodo GET para o objeto person
* O metodo callback basicamente quando fazemos o pedido com os dois parametros abreviados - request (req) e response (res)
* /person é acedido atraves do localhost
* A resposta a dar sera basicamente o paramentro que inseremimos em baixo
* */

/*  Este é parte da string da query ou seja o metodo que ppermite igualmente obter o pedido atraves de uma querie
    localhost:3000/person?name=nuno&age=20

*/

router.get('/person', (req, res) => {
    if(req.query.name){
        res.send(`Voce requisitou uma pessoa ${req.query.name}`)
    }
    else {
        res.send('Voce requisitou uma pessoa')
    }
})

/*Propiedades do params no objetido pretendido
A semelhanca do anterior, so que neste criamos um sub route que foi mapeado para uma variavel
*
A grande diferenca da query para o aparams é basicamente esta:
localhost:3000/person/name/nuno
*/

router.get('/person/:name', (req, res) => { /*A variavel ./:nome é obtida atraves do 'req' atraves de um parametro indicado abaixo chamado 'params'*/

    res.send(`Voce requisitou uma pessoa ${req.params.name}`)
})

/*Neste handler temos um erro novo. Sempre que se chega a este ponto é desencadeada uma excecao ou seja somos remetidos para a pagina 500.html*/
router.get('/error',(req, res) =>{
    throw new Error('Erro forcado.')
})

module.exports = router
