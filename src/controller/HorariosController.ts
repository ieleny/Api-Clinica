import { HorariosModel } from '../model/HorariosModel';
import { Funcoes } from '../require/Funcoes';
import * as dayjs from 'dayjs';

export class HorariosController {

  //Model
  HorariosModel = new HorariosModel();
  Funcoes = new Funcoes();

  //Cadastrar Horarios
  cadastrarHorarios(horario: object): object {

    //Ler o Arquivo, e salvar os dados anterior
    let dados = this.HorariosModel.listarHorarios();
    let object;

    if (dados.length === 0) {
      object = { 'horarios': [horario] };
    } else {
      object = JSON.parse(dados);
      object.horarios.push(horario);
    }

    return this.HorariosModel.cadastrarHorarios(JSON.stringify(object)) ? object.horarios[object.horarios.length - 1] : "Não foi possivel Inserir";
  }

  //Apagar os registros
  apagarHorarios(id: number) {

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

    } else {
      mensagem = { "mensagem": "O arquivo está vazio, por favor insira um horario" };
    }

    return this.HorariosModel.cadastrarHorarios(JSON.stringify(dados)) ? mensagem : "Não foi possivel Deletar";

  }

  //Listar os horarios
  listarHorarios() {

    // Caso não exista
    if (this.HorariosModel.listarHorarios().length === 0) {
      return { "mensagem": "Não existe horarios cadastrados" };
    } else {
      return JSON.parse(this.HorariosModel.listarHorarios());
    }

  }

  //Quantidade de regas de horas cadastra
  verificaQuantidadeRegras(): number {

    let dados = this.listarHorarios();

    if (dados.hasOwnProperty('mensagem')) {
      return 0;
    } else {
      return dados.horarios.length;
    }

  }

  //Retornar Lista de Horarios
  verificarDataDisponivel(dataInicio: string, dataFim: string) {

    let dados = this.listarHorarios();
    let datasRange = [], periodos = [];

    if (!dados.hasOwnProperty('mensagem')) {

      let quantidade = dayjs(this.Funcoes.padronizarData(dataFim))
        .diff(dayjs(this.Funcoes.padronizarData(dataInicio)), 'day');

      //Criar um range de datas
      for (let i = 0; i <= quantidade; i++) {
        datasRange[i] = dayjs(this.Funcoes.padronizarData(dataInicio)).add(i, 'day').format("YYYY-MM-DD");
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
      } else {
        return periodos.reverse();
      }

    } else {

      return { "mensagem": "Não Tem Dados Salvo no Json" };

    }

  }

  //Verfica se as data são validas
  validaCampos(campos: Array<string>) {

    //verificar se é um dia valido
    if (this.Funcoes.verificarData(campos[0]) === false) {
      return { "erro": "Data invalida, Modelo a ser utilizado .: 12-06-2020 " };
    }

    if (this.Funcoes.verificarHora(campos[2]) === false) {
      return { "erro": "A hora Inicio está inválida. Modelo a ser utilizado .: 15:30" };
    } else if (this.Funcoes.verificarHora(campos[3]) === false) {
      return { "erro": "A hora Fim está inválida. Modelo a ser utilizado .: 15:30" };
    } else if (typeof this.Funcoes.verificarHora(campos[3]) == "string" && typeof this.Funcoes.verificarHora(campos[3]) == "string") {

      return this.cadastrarHorarios(

        {
          "id": this.verificaQuantidadeRegras(),
          "dia": this.Funcoes.padronizarData(campos[0]),
          "periocidade": campos[1],
          "hora": [
            {
              "inicio": this.Funcoes.verificarHora(campos[2]),
              "Fim": this.Funcoes.verificarHora(campos[3])
            }
          ]
        }


      );
    }

  }





}