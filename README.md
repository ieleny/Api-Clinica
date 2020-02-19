# Api-Clinica
Api feita em Typescript

# Pacotes Utilizados
typescript</br>
gulp</br>
gulp-typescript</br>
express</br>
node</br>
tslint(É uma ferramenta de análise de código para alertá-lo sobre possíveis problemas no seu código, além dos problemas de sintaxe )</br>
dayJS</br>

# Executar 
Primeiro é preciso executar o <strong>npm install</strong>, para instalar as dependencia. E para executar o projeto execute 
<strong>npm run dev</strong>

# Detalhes do Projeto
Para que seja feita a periocidade tem 3 tipos de id:</br>
1 - Do dia</br>
2 - Diariamente</br>
3 - Semanalmente</br>

# Porta
Foi configurada na porta 8000, caso haja algum conflito modificar no seguinte caminho src/main.js

# Rotas
# Cadastrar
http://localhost:8000/cadastrar-horarios/?dia=12-06-2020&horaInicio=14:46&horaFim=14:56&periocidade=1
http://localhost:8000/cadastrar-horarios/?dia=12-06-2020&horaInicio=14:46&horaFim=14:56&periocidade=2
http://localhost:8000/cadastrar-horarios/?dia=12-06-2020&horaInicio=14:46&horaFim=14:56&periocidade=3
# Listar Regras
http://localhost:8000/listar-regras-horarios
# Apagar Regras
http://localhost:8000/apagar-horarios?id=0
# Listar Horarios disponiveis
http://localhost:8000/listar-horarios-disponiveis?dataInicio=12-06-2020&dataFim=12-06-2020
