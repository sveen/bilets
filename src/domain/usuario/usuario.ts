export class Usuario{

    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public telefone: string,
        public rg: string,
        public saldo_ct: string,
        public password: string,
        public status: string ){}
}
