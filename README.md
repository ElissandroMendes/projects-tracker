# Vibbra Tracker API
O projeto consta de uma API para realização de apontamento de horas trabalhadas por usuários em projetos.
A autenticação será baseada em token e serão utilizados tokens JWT sem expiração.
## Estimativa em horas
- 20 horas
## Estimativa em dias
- 8 dias
### Tarefas 
- Entendimento do escopo e requisitos - 1 hora;
- Definição de tecnologia e arquitetura - 1 hora;
- Estruturação inicial do projeto - 2 horas;
- Implementação de Endpoints:
    - Autenticação - 3 horas;
    - Registro de Tempo - 2 horas;
    - Usuários - 2 horas;
    - Projetos - 2 horas;
- Testes e ajustes - 1 horas;
- Produtização e teste - 3 horas;

## Tecnologias
Para a implementação do projeto foram utilizadas as seguintes ferramentas:
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [hapi](https://hapi.dev/)
- [Docker](https://www.docker.com/)

Para estruturação dos códigos do projeto, usamos os preceitos da [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), daí podemos, com certa facilidade, implementar o uso diferentes bancos de dados, relacional ou NoSQL, e também
de frameworks para atender as requisições HTTP e expor a API. No projeto foram escolhidos o framework Hapi
## Testes em ambiente local
### Pré requisitos
Para teste local da API precisamos ter instalados como pré-requisito os softwares abaixo:
1. NodeJS versão 12 ou superior
2. Git 
3. Yarn
4. Docker e docker-compose

### Passos para teste do projeto
1. Clonar repositório
```
git clone http://git.vibbra.com.br/elissandro/vibbra-tracker.git
```
2. Entra na pasta do projeto
```
cd vibbra-tracker
```
3. Instalar as dependencias
```
yarn
```
4. "Subir" a imagem do banco de dados via Docker
```
docker-compose up -d
```
5. Criar arquivo **.env** na pasta raiz do projeto com o conteúdo abaixo:
```
JWT_SECRET_KEY=R6FxBv7krvjUEGAseTXypVvofr5c503+brL7g/pJhig=
DATABASE_URI=mongodb://root:example@localhost:27017/vibbra-tracker-db?authSource=admin
```
6. Executar o projeto 
```
yarn run dev
```
Se tudo correr bem a API estará disponível em: http://localhost:3000, podendo ser acessada com alguma ferramenta para testes de API, tais como: [Postman](https://www.postman.com/downloads/) ou [Insomnia](https://insomnia.rest/download).

Para uma documentação da API, acessar: <http://localhost:3000/api/v1/documentation>.
