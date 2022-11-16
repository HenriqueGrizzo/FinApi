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

//middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    
      /**
     * procura se existe algum customer com o cpf igual ao cpf que foi passado
     */
    const customer = customers.find((customer) => customer.cpf === cpf)

        /**
     * Verificando se o cpf no qual está buscando o extrato existe
     */
         if(!customer) {
            return response.status(400).json({ error: "Customer not found" });
        }

        request.customer = customer;
    
        return next();
}

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
 * um middleware que você utilizaria em todas as suas rotas
 */

//app.use(verifyIfExistsAccountCPF)

/**
 * Buscando o extrato bancario do cliente
 * Um middleware que seria usado em rotas especificas
 */
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    /**
     * retornando se o cpf existe ou não
     */
    return response.json(customer.statement);
})

app.listen(3333);