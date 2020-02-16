"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HorariosModel_1 = require("../model/HorariosModel");
class HorariosController {
    constructor() {
        //Model
        this.horariosModel = new HorariosModel_1.HorariosModel();
    }
    index() {
        return 'Hello world!';
    }
    //Cadastrar Horarios
    cadastrarHorarios(horario) {
        //Ler o Arquivo, e salvar os dados anterior
        let dados = this.horariosModel.listarHorarios();
        let object;
        if (dados.length === 0) {
            object = { 'horarios': [horario] };
        }
        else {
            object = JSON.parse(dados);
            object.horarios.push(horario);
        }
        return this.horariosModel.cadastrarHorarios(JSON.stringify(object)) ? object.horarios[object.horarios.length - 1] : "Não foi possivel Inserir";
    }
    //Retornar Lista de Horarios
    verificarHoraExiste() {
    }
    //Verfica se as data são validas
    validaCampos(campos) {
        //verificar se é um dia valido
        if (this.verificarData(campos[0]) === false) {
            return { "erro": "O dia está Invalido" };
        }
        //A hora está inválida. Modelo sendo utilizado .: 15:30
        if (this.verificarHora(campos[2]) === false) {
            return { "erro": "A hora Inicio está inválida. Modelo a ser utilizado .: 15:30" };
        }
        else if (this.verificarHora(campos[3]) === false) {
            return { "erro": "A hora Fim está inválida. Modelo a ser utilizado .: 15:30" };
        }
        else if (typeof this.verificarHora(campos[3]) == "string" && typeof this.verificarHora(campos[3]) == "string") {
            return this.cadastrarHorarios({ "dia": this.padronizarData(campos[0]),
                "periocidade": campos[1],
                "horaInicio": this.verificarHora(campos[2]),
                "horaFim": this.verificarHora(campos[3])
            });
        }
    }
    //Listar os horarios
    listarHorarios() {
        return JSON.parse(this.horariosModel.listarHorarios());
    }
    //Verifica se é uma data valida
    verificarData(data) {
        return /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(data);
    }
    //Corrigir a data para ficar no padrão DIA/MES/ANO
    padronizarData(data) {
        return data.substr(0, 2) + "-" + data.substr(3, 2) + "-" + data.substr(6, 4);
    }
    //Fazer uma função com expressão regular para verificar se a cada dois numeros tem :
    verificarHora(hora) {
        let horaPadrao;
        let tamanho = hora.length;
        switch (tamanho) {
            case 2:
                horaPadrao = hora.trim() + ':00';
                break;
            case 4:
                horaPadrao = hora.substr(0, 2) + ":" + hora.substr(2);
                break;
            case 5:
                horaPadrao = hora.indexOf(':') === -1 ? false : hora;
                break;
            default:
                horaPadrao = false;
        }
        return horaPadrao;
    }
}
exports.HorariosController = HorariosController;
