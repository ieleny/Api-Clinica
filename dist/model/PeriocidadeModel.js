"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class PeriocidadeModel {
    cadastrarPeriocidade(horarios) {
        //Salvar o JSON no arquivo
        fs.writeFile(PeriocidadeModel.nameFile, horarios, (err) => {
            if (err) {
                throw err;
            }
            return false;
        });
        return true;
    }
    listarPeriocidade() {
        return fs.readFileSync(PeriocidadeModel.nameFile, 'utf8');
    }
}
PeriocidadeModel.nameFile = './file/periocidade.json';
exports.PeriocidadeModel = PeriocidadeModel;
