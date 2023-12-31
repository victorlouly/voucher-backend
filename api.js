const express = require('express');
const app = express();
const upload = require("multer")();

app.use(require("cors")());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const whatsapp = req.body.whatsapp;
    const turma = req.body.turma;
    const matricula = req.body.matricula;
    const consultor = req.body.consultor;
    const previsao = req.body.previsao;
    const nomeindicado = req.body.nomeindicado;
    const anexo = req.file;
    require("./nodemail")(email, nome, whatsapp, turma, matricula, consultor, nomeindicado, previsao, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
}) 

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`))
