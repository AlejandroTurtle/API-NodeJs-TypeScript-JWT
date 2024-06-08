import { UserService } from "./UserService"
import * as jwt from "jsonwebtoken"

jest.mock("../repositories/UserRepository")
jest.mock("../database", () => {
    initialize: jest.fn()
})
jest.mock("jsonwebtoken")

const mockUserRepository = require ("../repositories/UserRepository")


describe("UserService", () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        user_id: "12345", 
        name: "alejandro", 
        email: "alejandro@teste.com", 
        password: "123456"}

    it("Deve adicionar um novo usuario", async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser("Alealejandro", "alejandro@teste.com", "123456")
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({user_id: "12345", name: "alejandro", email: "alejandro@teste.com", password: "123456"})
    })

    it("Devo retornar um token de usuário", async () => {
        jest.spyOn(userService, "getAutenticatedUser").mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, "sign").mockImplementation(() => "token")
        const token = await userService.getToken("alejandro@teste.com", "123456")
        expect (token).toBe("token")
    })

    it("Deve retornar um erro caso o email ou senha estejam incorretos", async () => {
        jest.spyOn(userService, "getAutenticatedUser").mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken("invalid@teste.com", "123456")).rejects.toThrowError(new Error("Usuario/senha invalidos"));

    })
})