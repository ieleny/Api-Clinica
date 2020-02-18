import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class Funcoes {

    //Verifica se é uma data valida
    verificarData(data: string): boolean {
        return /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(data);
    }

    //Corrigir a data para ficar no padrão ANO/MES/DIA
    padronizarData(data: string): string {
        return data.substr(6, 4) + "-" + data.substr(3, 2) + "-" + data.substr(0, 2);
    }

    //Fazer uma função com expressão regular para verificar se a cada dois numeros tem :
    verificarHora(hora: String): String | Boolean {

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

    //Calcular diferença de horas
    intervaloHoras(data: string, horaInicio: any, horaFim: any): Array<string> {

        let data1: any = new Date(data + "T" + horaInicio + ":00.000Z");
        let data2: any = new Date(data + "T" + horaFim + ":00.000Z");
        let diffMs = (data2 - data1);
        let horasRange = [];

        //Horas
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

        //Minutos
        let minutos = Math.round((diffMs % 86400000) / 60000);

        //Range de Horas
        for (let i = 0; i <= minutos; i++) {
            horasRange[i] = dayjs(data1).add(i, 'minute').utc().format('HH:mm');
        }

        return horasRange;

    }



}