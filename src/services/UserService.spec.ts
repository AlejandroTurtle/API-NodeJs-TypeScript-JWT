import { UserService } from "./UserService"

jest.mock("../repositories/UserRepository")
jest.mock("../database", () => {
    initialize: jest.fn()
})

const mockUserRepository = require ("../repositories/UserRepository")


describe("UserService", () => {
    const userService = new UserService(mockUserRepository)

    it("Deve adicionar um novo usuario", async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({user_id: "12345", name: "alejandro", email: "alejandro@teste.com", password: "123456"}))
        const response = await userService.createUser("Alealejandro", "alejandro@teste.com", "123456")
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({user_id: "12345", name: "alejandro", email: "alejandro@teste.com", password: "123456"})
    })
})