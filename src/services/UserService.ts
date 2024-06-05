export interface User {
    name: string
    email: string
}

const db = [ {
    name: "Alejandro",
    email: "alejandro@teste.com.br"
}]


export class UserService {
    db: User[]

    constructor(database = db){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log("DB atualizado", this.db)
    }
    
    getAllusers = () => {
        return this.db
    }
    
    deleteUser = (name: string): boolean => {
        const userIndex = this.db.findIndex(user => user.name === name);

        if (userIndex !== -1) {
            this.db.splice(userIndex, 1);
            console.log("Usuário excluído", this.db);
            return true;
        } else {
            console.log("Usuário não encontrado");
            return false;
        }
    }
}
