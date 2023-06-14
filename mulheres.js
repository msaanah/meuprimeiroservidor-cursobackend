const express = require ("express") // aqui iniciei o express
const router = express.Router() // aqui niciei a configuração primeira parte da rota 
const cors = require("cors") // estou trazendo o pacote cors que permite consumir essa api no frontend
const conectaBancoDeDados = require("./bancoDeDados") // ligando ao  arquivo bando de dados 
conectaBancoDeDados() // chamando a função que conecta o banco de dados

const Mulher = require("./mulherModel")

const app = express() // aqui iniciei o app
app.use(express.json())
app.use(cors())

const porta = 3333 // aqui criei a porta 

//GET que mostra mulheres 
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)

    }catch (erro) {
        console.log(erro)
    }
            }    
// POST criando a função que publica mulheres
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        // apaguei o id pq quem irá criar o id de modo automático é o MongoDG
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao : request.body.citacao,        
    })

     try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
     } catch(erro) {
     console.log(erro)
    }
}
   // PATCH  para corrigir uma informação. Não é incluir, irei alterar algo inserido
async function corrigeMulher (request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
       
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
          
// feita a alteração preciso enviar a resposta
response.json(mulherAtualizadaNoBancoDeDados) // feita a alteração envio a resposta e mostro com json a lista de mulheres atualizada
   
    }catch (erro) {
        console.log(erro)
    }   
        
    }

// usando o método ou verbo DELETE 1) função para retorar todas menos a id da mulher passada
async function deletaMulher(request, response) {
    
    try { // para deleta primeiro acho a mulher pela url da requisição
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso!"})
    } catch(erro) {
        console.log(erro)
    }
    
   
}


// funcao porta 
function mostraPorta () {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get("/mulheres", mostraMulheres)) // configurei a rota GET /mulheres 
app.use(router.post("/mulheres", criaMulher)) // configurei rota POST /mulheres  para receber o cadastro de nova mulher 
app.listen(porta, mostraPorta) // servidor ouvindo a porta 
app.use(router.patch("/mulheres/:id", corrigeMulher)) // configurei garantindo que a  rota utilize o verbo patch para a rota /mulheres:id assim que garanto que o id será passado para a rota
app.use(router.delete("/mulheres/:id", deletaMulher))// configurei a rota DELETE /mulheres