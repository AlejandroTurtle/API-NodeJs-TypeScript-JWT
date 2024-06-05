import {Request, Response} from "express"
import { UserService } from "../services/UserService"



export class UserController {
    userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    }

    createUser = (req: Request, res: Response) => {
        const user = req.body

        if(!user.name  || !user.email){
            return res.status(400).json({ message: "o name e o email é obrigatório"})
        }
        this.userService.createUser(user.name, user.email)
        return res.status(200).json({ message: "Usuario criado"})
    }

    getAllusers = (req: Request, res: Response) => {
        const users = this.userService.getAllusers()
        return res.json( users )
    }

    deleteUser = (req: Request, res: Response) => {
        const { name } = req.body;
        const userDeleted = this.userService.deleteUser(name);

        if (userDeleted) {
            res.status(200).json({ message: "Usuário excluído com sucesso" });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    }
}

        
