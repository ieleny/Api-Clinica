"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HorariosModel_1 = require("../model/HorariosModel");
const dayjs = require("dayjs");
class HorariosController {
    constructor() {
        //Model
        this.HorariosModel = new HorariosModel_1.HorariosModel();
    }
    //Cadastrar Horarios
    cadastrarHorarios(horario) {
        //Ler o Arquivo, e salvar os dados anterior
        let dados = this.HorariosModel.listarHorarios();
        let object;
        if (dados.length === 0) {
            object = { 'horarios': [horario] };
        }
        else {
            object = JSON.parse(dados);
            object.horarios.push(horario);
        }
        return this.HorariosModel.cadastrarHorarios(JSON.stringify(object)) ? object.horarios[object.horarios.length - 1] : "Não foi possivel Inserir";
    }
    //Apagar os registros
    apagarHorarios(id) {
        let dados = this.listarHorarios();
        let mensagem = { "mensagem": "Não foi encontrado o index requisitado" };
        if (!dados.hasOwnProperty('mensagem')) {
            //Apagar os dados
            for (let objeto of dados.horarios) {
                if (objeto.id == id) {
                    mensagem = { "mensagem": `O dia ${objeto.dia} foi deletado com sucesso` };
                    dados.horarios.splice(id, 1);
                }
            }
            //Organizar o ID
            for (var _i = 0; _i < dados.horarios.length; _i++) {
                dados.horarios[_i].id = _i;
            }
        }
        else {
            mensagem = { "mensagem": "O arquivo está vazio, por favor insira um horario" };
        }
        return this.HorariosModel.cadastrarHorarios(JSON.stringify(dados)) ? mensagem : "Não foi possivel Deletar";
    }
    //Listar os horarios
    listarHorarios() {
        // Caso não exista
        if (this.HorariosModel.listarHorarios().length === 0) {
            return { "mensagem": "Não existe horarios cadastrados" };
        }
        else {
            return JSON.parse(this.HorariosModel.listarHorarios());
        }
    }
    //Quantidade de regas de horas cadastra
    verificaQuantidadeRegras() {
        let dados = this.listarHorarios();
        if (dados.hasOwnProperty('mensagem')) {
            return 0;
        }
        else {
            return dados.horarios.length;
        }
    }
    //Retornar Lista de Horarios
    verificarDataDisponivel(dataInicio, dataFim) {
        let dados = this.listarHorarios();
        let datasRange = [], periodos = [];
        if (!dados.hasOwnProperty('mensagem')) {
            let quantidade = dayjs(this.padronizarData(dataFim))
                .diff(dayjs(this.padronizarData(dataInicio)), 'day');
            //Criar um range de datas
            for (let i = 0; i <= quantidade; i++) {
                datasRange[i] = dayjs(this.padronizarData(dataInicio)).add(i, 'day').format("YYYY-MM-DD");
            }
            //verificar se existe em ambos array
            for (let objeto of dados.horarios) {
                if (datasRange.findIndex((elemento, index) => elemento === objeto.dia) != -1) {
                    //Colocar em formato brasileiro  
                    objeto.dia = dayjs(objeto.dia).format("DD-MM-YYYY");
                    //Adicionar no Push
                    periodos.push(objeto);
                }
            }
            if (periodos.length === 0) {
                return { "mensagem": "Este periodo que está tentando buscar, não existe." };
            }
            else {
                return periodos.reverse();
            }
        }
        else {
            return { "mensagem": "Não Tem Dados Salvo no Json" };
        }
    }
    //Verfica se as data são validas
    validaCampos(campos) {
        //verificar se é um dia valido
        if (this.verificarData(campos[0]) === false) {
            return { "erro": "Data invalida, Modelo a ser utilizado .: 12-06-2020 " };
        }
        if (this.verificarHora(campos[2]) === false) {
            return { "erro": "A hora Inicio está inválida. Modelo a ser utilizado .: 15:30" };
        }
        else if (this.verificarHora(campos[3]) === false) {
            return { "erro": "A hora Fim está inválida. Modelo a ser utilizado .: 15:30" };
        }
        else if (typeof this.verificarHora(campos[3]) == "string" && typeof this.verificarHora(campos[3]) == "string") {
            return this.cadastrarHorarios({
                "id": this.verificaQuantidadeRegras(),
                "dia": this.padronizarData(campos[0]),
                "periocidade": campos[1],
                "horaInicio": this.verificarHora(campos[2]),
                "horaFim": this.verificarHora(campos[3])
            });
        }
    }
    //Verifica se é uma data valida
    verificarData(data) {
        return /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(data);
    }
    //Corrigir a data para ficar no padrão ANO/MES/DIA
    padronizarData(data) {
        return data.substr(6, 4) + "-" + data.substr(3, 2) + "-" + data.substr(0, 2);
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
