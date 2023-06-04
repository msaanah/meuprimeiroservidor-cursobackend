const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome : "Sônia Guimarães",
        imagem: "https://ea9vhhuzko5.exactdn.com/wp-content/uploads/2021/11/Sonia-Guimaraes.jpeg?strip=all&lossy=1&ssl=1",
        minibio: "Primeira mulher e mulher negra, professora do ITA quando nem sequer alunas o instituto aceitava"
    }
    )

}

function mostraPorta () {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)






