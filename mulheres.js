const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome : "Sônia Guimarães",
        imagem: "https://ea9vhhuzko5.exactdn.com/wp-content/uploads/2021/11/Sonia-Guimaraes.jpeg?strip=all&lossy=1&ssl=1",
        minibio: "Primeira mulher e mulher negra, professora do ITA quando nem sequer alunas o instituto aceitava"
    },

    {
        nome: "Simara Conceição",
        imagem: "https://simaraconceicao.com/wp-content/uploads/2021/05/simaraconceicao.jpeg",
        minibio: "Desenvolvedora, programadora e acima de tudo a mulher que teve a audácia de mudar de carreira quando o mundo estava acabando"
        },

        {
            nome: "Nina da hora",
            imagem: "https://conteudo.imguol.com.br/c/noticias/47/2020/07/12/ana-carolina-da-hora-hackear-o-racismo-1594591816588_v2_1x1.jpg",
            minibio: "o sistema é racista? Então vamos hackear o sistema!"
        }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
        
    }
    

function mostraPorta () {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostraPorta)