const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const customers = [];
/**
 * dados necessarios para aplicação
 * cpf - string
 * name - string
 * id - uuid
 * stament - [array]
 */

app.post("/account", (request, response) => {
    /**
     * usando a desestrutuação dizendo para o codigo que você quer pegar o cpf e o name que vem no request body
     */
    const {cpf, name} = request.body;

    /**
     * Validando se já existe um cpf cadastrado igual ao cpf que foi digitado
     */
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
        );

        if(customerAlreadyExists){
            return response.status(400).json({error: "Customer already exsists!"})
        }     

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).send();
})

/**
 * Buscando o extrato bancario do cliente
 */
app.get("/statement/:cpf", (request, response) => {
    const { cpf } = request.params;

    /**
     * procura se existe algum customer com o cpf igual ao cpf que foi passado
     */
    const customer = customers.find(customer => customer.cpf === cpf)

    /**
     * retornando se o cpf existe ou não
     */
    return response.json(customer.statement)
})

app.listen(3333);