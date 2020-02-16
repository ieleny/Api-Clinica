"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class HorariosModel {
    cadastrarHorarios(horarios) {
        var retorno;
        //Salvar o JSON no arquivo
        fs.writeFile("./file/agenda-horarios.json", horarios, (err) => {
            if (err) {
                throw err;
            }
            return false;
        });
        return true;
    }
    listarHorarios() {
        return fs.readFileSync(HorariosModel.nameFile, 'utf8');
    }
}
HorariosModel.nameFile = './file/agenda-horarios.json';
exports.HorariosModel = HorariosModel;
