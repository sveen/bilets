export class Lote{
    constructor(
        public id_lote: string,
        public id_festa: string,
        public no_nome: string,
        public nm_quantidade: string,
        public nm_valor: string,
        public dt_registro: string,
        public dc_descricao: string,
        public id_tipo: string,
        public id_forma_ganho: string,
        public nm_proporcao: string,
        public nm_porcentagem: string,
        public dc_vendedores: string,
        public id_status: string,
        public ingressos: string
    ){}

}