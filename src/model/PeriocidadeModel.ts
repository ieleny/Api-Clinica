import * as fs from 'fs';

export class PeriocidadeModel {

    dados: Array<string>;

    cadastrarPeriocidade(dataInicio, dataFim) {
        return this.dados = [dataInicio, dataFim];
    }

    listarPeriocidade(): Array<string> {
        return this.dados;
    }



}