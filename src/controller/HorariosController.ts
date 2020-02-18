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
        object = { horario };
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
            for (let objeto of dados) {

                if (objeto.id == id) {
                    mensagem = { "mensagem": `O dia ${objeto.dia} foi deletado com sucesso` };
                    dados.splice(id, 1);
                }

            }

            //Organizar o ID
            for (var _i = 0; _i < dados.length; _i++) {
                dados[_i].id = _i;
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

            let dados = JSON.parse(this.HorariosModel.listarHorarios());

            //Colocar a data com formato brasileiro
            for (var objeto of dados.horarios) {
                objeto.dia = dayjs(objeto.dia).format("DD-MM-YYYY");
            }

            return dados.horarios;

        }

  }

  //Quantidade de regas de horas cadastra
  verificaQuantidadeHorarios(): number {

        let dados = this.listarHorarios();

        if (dados.hasOwnProperty('mensagem')) {
            return 0;
        } else {
            return dados.length;
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
                for (let objeto of dados) {
                    if (datasRange.findIndex((elemento, index) => elemento === this.Funcoes.padronizarData(objeto.dia)) != -1) {
                        //Colocar em formato brasileiro  
                        objeto.dia = dayjs(objeto.dia).format("DD-MM-YYYY");
                        //Adicionar no Push
                        periodos.push(objeto);
                    }
                }

                if (periodos.length === 0) {
                    return { "mensagem": "Este periodo que está tentando buscar, não existe." };
                } else {
                    return periodos;
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

        //Verificar se a hora inicio é maior que a hora fim
        if(this.Funcoes.verificarHora(campos[2]) > this.Funcoes.verificarHora(campos[3])){
            return { "erro": "A hora inicio está maior que a hora fim"};
        }

        //Verificar se a data está no formato correto
        if (this.Funcoes.verificarHora(campos[2]) === false) {
            return { "erro": "A hora Inicio está inválida. Modelo a ser utilizado .: 15:30" };
        } else if (this.Funcoes.verificarHora(campos[3]) === false) {
            return { "erro": "A hora Fim está inválida. Modelo a ser utilizado .: 15:30" };
        } else if (typeof this.Funcoes.verificarHora(campos[3]) == "string" && typeof this.Funcoes.verificarHora(campos[3]) == "string") {
            return this.verificarPeriodoDeHora(campos);
        }

  }

  //Verificar se existe a hora, e se irá chocar com a já cadastrada
  verificarPeriodoDeHora(campos: Array<string>) {

    let dados = this.listarHorarios();
    let data: number = -1 , rangeHora : Array<string>; 
    
    // Só verifica o index, se existir horarios dentro do arquivo json
    if(this.verificaQuantidadeHorarios() > 0){
        data = dados.findIndex((elemento, index) => elemento.dia == campos[0]);
    }
    
    //verificar se a hora existe
    if ( data != -1) {

        //Erro aqui
        
        //Fazer o range de Hora
        rangeHora = this.Funcoes.intervaloHoras(
                                                    this.Funcoes.padronizarData(campos[0]),
                                                    this.Funcoes.verificarHora(campos[2]),
                                                    this.Funcoes.verificarHora(campos[3])
                                                );
        
        //Precisar encontrar na data esse index
        //Verificar Hora Inicio e Fim
        for(let i = 0 ; this.verificaQuantidadeHorarios() > i ; i++ ){
            for(let j = 0 ; dados[i].hora.length > j ; j++){
                if (rangeHora.findIndex((elemento, index) => elemento === dados[data].hora[j].inicio || elemento == dados[data].hora[j].fim) === -1) {
                    
                    //Está dando erro aqui
                    //Salvar os dados dentro do campo hora
                    dados[data].hora.push({
                                                    "inicio": this.Funcoes.verificarHora(campos[2]),
                                                    "fim": this.Funcoes.verificarHora(campos[3])
                                            });
                                            

                    return this.HorariosModel.cadastrarHorarios(JSON.stringify(dados));

                }else{
                    return {"Erro" : "Já existe esse periodo cadastrado nessa data"}
                }
            } 
        }

    }else{

        return this.cadastrarHorarios(

            {
              "id": this.verificaQuantidadeHorarios(),
              "dia": this.Funcoes.padronizarData(campos[0]),
              "periocidade": campos[1],
              "hora": [
                {
                  "inicio": this.Funcoes.verificarHora(campos[2]),
                  "fim": this.Funcoes.verificarHora(campos[3])
                }
              ]
            }
        );

    }   


  }



}