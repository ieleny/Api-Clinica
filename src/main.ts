import * as express from 'express';
import { HorariosController} from './controller/HorariosController';
import { HorariosModel } from './model/HorariosModel';

const app = express();
const horariosController = new HorariosController();
 
app.post('/cadastrar-horarios', (req,res) => {

    let response = horariosController.validaCampos(
                                                    [
                                                        req.query.dia,
                                                        req.query.periocidade,
                                                        req.query.horaInicio,
                                                        req.query.horaFim
                                                    ]
                                                  );

    res.send(response);
});

app.post('/apagar-horarios', (req, res) => {
    let response = horariosController.apagarHorarios(req.query.id);
    res.send(response);
});

app.get('/listar-regras-horarios', (request, response) => {
    response.send(horariosController.listarHorarios());
});

app.get('/listar-horarios-disponiveis', (request, response) => {
    response.send('Hello world!');
});
 
app.listen(8080);
