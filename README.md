# Api-Clinica
Api feita em Typescript

# Pacotes Utilizados
typescript
gulp
gulp-typescript
express
node
tslint(É uma ferramenta de análise de código para alertá-lo sobre possíveis problemas no seu código, além dos problemas de sintaxe )
dayJS

# Executar 
Primeiro é preciso executar o "npm install", para instalar as dependencia. E para executar o projeto execute 
"npm run dev"

# Detalhes do Projeto
Para que seja feita a periocidade tem 3 tipos de id:
1 - Do dia
2 - Diariamente
3 - Semanalmente

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
