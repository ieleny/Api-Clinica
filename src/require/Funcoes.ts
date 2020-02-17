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


}