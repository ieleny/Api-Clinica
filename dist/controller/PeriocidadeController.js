"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PeriocidadeModel_1 = require("../model/PeriocidadeModel");
const Funcoes_1 = require("../require/Funcoes");
const dayjs = require("dayjs");
class PeriocidadeController {
    constructor() {
        //Model
        this.PeriocidadeModel = new PeriocidadeModel_1.PeriocidadeModel();
        //Funções
        this.Funcoes = new Funcoes_1.Funcoes();
        // verificarPeriocidade(id_periocidade: string, campos: Array<string>) {
        //     let datasRange = [];
        //     if (id_periocidade == '1') {
        //         return campos;
        //     } else if (id_periocidade == '2') {
        //         return this.cadastroPeriocidade(
        //             {
        //                 "diariamente":
        //                     [
        //                         {
        //                             "inicio": this.Funcoes.verificarHora(campos[2]),
        //                             "fim": this.Funcoes.verificarHora(campos[3])
        //                         }
        //                     ]
        //             });
        //     } else if (id_periocidade == '3') {
        //         //Criar um range de datas
        //         for (let i = 0; i < 7; i++) {
        //             datasRange[i] = dayjs(this.Funcoes.padronizarData(campos[0])).add(i, 'day').format("YYYY-MM-DD");
        //         }
        //         return datasRange;
        //     }
        // }
    }
    cadastroPeriocidade(campos) {
        let dados = this.PeriocidadeModel.listarPeriocidade();
        let object;
        if (dados.length === 0) {
            object = [campos];
        }
        else {
            object = JSON.parse(dados);
            object.push(campos);
        }
        return this.PeriocidadeModel.cadastrarPeriocidade(JSON.stringify(object)) ? this.buscarPeriocidade() : "Não foi possivel Inserir";
    }
    //Periocidade Diariamente
    periocidadeDiariamente(campos) {
        return this.cadastroPeriocidade([{
                "inicio": this.Funcoes.verificarHora(campos[2]),
                "fim": this.Funcoes.verificarHora(campos[3])
            }]);
    }
    //Periocidade Semanal
    periocidadeSemana(campos) {
        let datasRange = [];
        //Criar um range de datas
        for (let i = 0; i < 7; i++) {
            datasRange[i] = dayjs(this.Funcoes.padronizarData(campos[0])).add(i, 'day').format("YYYY-MM-DD");
        }
        return datasRange;
    }
    buscarPeriocidade() {
        return this.PeriocidadeModel.listarPeriocidade();
    }
}
exports.PeriocidadeController = PeriocidadeController;
