export class Venda{

    constructor(
        public id_venda: string,
        public cd_codigo_bilets: string,
        public cd_codigo_mp: string,
        public id_pessoa: string,
        public id_lote: string,
        public id_forma_pagamento: string,
        public dt_data: string,
        public nm_valor: string,
        public id_status: string,
        public no_lote: string,
        public no_festa: string ){}
}