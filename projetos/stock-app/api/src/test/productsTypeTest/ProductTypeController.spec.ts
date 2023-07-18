import  request  from "supertest"
import { App } from "../../app"


describe("Create product type controller" , () => {

    it("Should be able to create a product type", async () => {
        const response = await request(App)
        .post("/product-types")
        .send({
            description: "Produto do test",
            fields: [
                {
                    "type": "text",
                    "isRequired": true,
                    "name": "campo de  texto",
                    "orderRegister": 1
                },
                {
                    "type": "numeric",
                    "isRequired": false,
                    "name": "campo de numero",
                    "orderRegister": 2
                },
                {
                    "type": "boolean",
                    "isRequired": true,
                    "name": "campo booleano",
                    "orderRegister": 3
                }
            ]
        })
        console.log(response)
    }, 100000)
})