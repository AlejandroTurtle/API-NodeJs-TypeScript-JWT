import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makemockResponse } from "../__mocks__/mockResponse.mock"
import { Request } from "express"




describe ("UserController", () => {
    const mockUserService: Partial<UserService> = {createUser: jest.fn()}
    const userController = new UserController(mockUserService as UserService)


    it("Deve adicionar um novo usuario", () => {
        const mockRequest = {
            body: {
                name: "alejandro",
                email: "alejandro@teste.com"
            }
        } as Request
        const mockResponse = makemockResponse()
         userController.createUser(mockRequest, mockResponse)
        expect (mockResponse.state.status).toBe(200)
        expect (mockResponse.state.json).toMatchObject({message: "Usuario criado"})
    })

    it("Deve verificar a resposta de erro caso o usuario nao informe o name", () => {
        const mockRequest = {
            body: {
                email: "alejandro@teste.com"
            }
        } as Request
        const mockResponse = makemockResponse()
         userController.createUser(mockRequest, mockResponse)
        expect (mockResponse.state.status).toBe(400)
        expect (mockResponse.state.json).toMatchObject({message: "o name e o email é obrigatório"})
    })

    it("Deve trazer todos os usuarios", () => {
        const mockResponse = makemockResponse()
        userController.getAllusers
    })

})