import * as fs from 'fs';

export class HorariosModel
{

    static nameFile = './file/agenda-horarios.json';

    cadastrarHorarios(horarios: string)
    {

        //Salvar o JSON no arquivo
        fs.writeFile("./file/agenda-horarios.json", horarios, (err) => {
            if (err) { throw err; }  

            return false;
        });
        
        return true;
    }

    listarHorarios () : string
    {
        return fs.readFileSync(HorariosModel.nameFile,'utf8');
    }

    
}