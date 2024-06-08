import { UserController } from "./UserController"
import { makemockResponse } from "../__mocks__/mockResponse.mock"
import { Request } from "express"
import { UserService } from "../services/UserService"

const mockUserService = {
        createUser: jest.fn(),
        deleteUser: jest.fn()
}

jest.mock("../services/UserService", () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe("UserController", () => {
    const MockUserService = new UserService()
    const userController = new UserController(MockUserService)
    const mockResponse = makemockResponse()

    it("Deve adicionar um novo usuario", () => {
        const mockRequest = {
            body: {
                name: "alejandro",
                email: "alejandro@teste.com",
                password: "123456"
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: "Usuario criado" })
    })

    it("Deve verificar a resposta de erro caso o usuario nao informe o name", () => {
        const mockRequest = {
            body: {
                name: "",
                email: "alejandro@teste.com",
                password: "123456"
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "o name o email e o password são obrigatórios" })
    })

    it("Deve verificar a resposta de erro caso o usuario nao informe o email", () => {
        const mockRequest = {
            body: {
                name: "alejandro",
                email: "",
                password: "123456"
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "o name o email e o password são obrigatórios" })
    })

    it("Deve verificar a resposta de erro caso o usuario nao informe o password", () => {
        const mockRequest = {
            body: {
                name: "alejandro",
                email: "alejandro@teste.com",
                password: ""
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "o name o email e o password são obrigatórios" })
    })

    it("Deve retornar a mensagem que o usuario foi excluído", () => {
        const mockRequest = {
            body: {
                name: "alejandro",
                email: ""
            }
        } as Request
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: "Usuário excluído com sucesso" })
    })
})
