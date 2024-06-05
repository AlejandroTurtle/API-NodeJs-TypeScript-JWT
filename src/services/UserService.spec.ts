import { User, UserService } from "./UserService"

describe("UserService", () => {
    const mockDb: User[] =[]
    const userService = new UserService(mockDb)

    it("Deve adicionar um novo usuario", () => {
        const mockConsole = jest.spyOn(global.console, "log")
        userService.createUser("Alealejandro", "alejandro@teste.com")
        expect(mockConsole).toHaveBeenCalledWith("DB atualizado", mockDb)
    })

    it("Deve trazer todos os usuarios", () => {
        userService.getAllusers()
    })


    it("Deve deletar um usuario", () => {
        userService.deleteUser("Alealejandro")
    })
})
