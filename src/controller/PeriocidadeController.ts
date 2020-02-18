import { PeriocidadeModel } from '../model/PeriocidadeModel';
import { Funcoes } from '../require/Funcoes';
import * as dayjs from 'dayjs';

export class PeriocidadeController {

    //Model
    PeriocidadeModel = new PeriocidadeModel();
    //Funções
    Funcoes = new Funcoes();

    cadastroPeriocidade(dataInicio, dataFim) {
        return this.PeriocidadeModel.cadastrarPeriocidade(dataInicio, dataFim);
    }

    //Periocidade Diariamente
    periocidadeDiariamente(campos: Array<string>) {
        return this.cadastroPeriocidade(this.Funcoes.verificarHora(campos[2]), this.Funcoes.verificarHora(campos[3]));
    }

    //Periocidade Semanal
    periocidadeSemana(campos: Array<string>) {

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