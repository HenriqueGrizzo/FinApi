const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const custumers = [];
/**
 * dados necessarios para aplicação
 * cpf - string
 * name - string
 * id - uuid
 * stamente - [array]
 */

app.post("/account", (request, response) => {
    /**
     * usando a desestrutuação dizendo para o codigo que você quer pegar o cpf e o name que vem no request body
     */
    const {cpf, name} = request.body;

    const id = uuidv4();

    custumers.push({
        cpf,
        name,
        id,
        statement: []
    })
    return response.status(201).send();
})

app.listen(3333);