"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const HorariosController_1 = require("./controller/HorariosController");
const app = express();
const horariosController = new HorariosController_1.HorariosController();
app.post('/cadastrar-horarios', (req, res) => {
    let response = horariosController.validaCampos([
        req.query.dia,
        req.query.periocidade,
        req.query.horaInicio,
        req.query.horaFim
    ]);
    res.send(response);
});
app.get('/apagar-horarios', (request, response) => {
    response.send(horariosController.index());
});
app.get('/listar-regras-horarios', (request, response) => {
    response.send(horariosController.listarHorarios());
});
app.get('/listar-horarios-disponiveis', (request, response) => {
    response.send('Hello world!');
});
app.listen(8080);
