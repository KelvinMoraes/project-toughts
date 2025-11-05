Toughts

Aplicação de estudos: CRUD de pensamentos com autenticação. Feita com Node.js, Express, Handlebars e Sequelize (MySQL).

Funcionalidades
- Cadastro, login e logout de usuários
- Criar, listar, buscar, editar e remover pensamentos
- Dashboard do usuário com seus pensamentos
- Ordenação por data (mais novos/mais antigos)
- Mensagens de feedback com flash e sessões

Tecnologias e bibliotecas
- Node.js 18+ e npm
- Express 5 (`express`)
- Template engine: `express-handlebars`
- ORM: `sequelize` + `mysql2`
- Sessões: `express-session` + `session-file-store`
- Flash messages: `express-flash`
- Hash de senha: `bcryptjs`
- Logger: `winston`
- Dev: `nodemon`

Observação: `connect-flash`, `cookie-parser` e `cookie-session` estão no `package.json`, mas não são utilizados diretamente no código atual.

Pré-requisitos
- MySQL em execução local
- Criar o banco `toughts` (veja `db/create-db.sql`)
- Ajustar as credenciais do banco em `db/conn.js` (usuário, senha, host)

Como rodar
1) Instale as dependências: `npm install`
2) Inicie em desenvolvimento: `npm run dev`
3) Acesse: `http://localhost:3000`

Estrutura do projeto
- `index.js`: inicialização do app e configuração geral
- `db/`: conexão com o banco e script SQL
- `models/`: modelos `User` e `Tought` (relação 1:N)
- `controllers/`: `AuthController` e `ToughtsCotnroller`
- `routes/`: `authRoutes` e `toughtsRoutes`
- `views/`: templates Handlebars (auth, toughts, layouts)
- `public/`: arquivos estáticos (CSS)
- `helpers/`: helpers/middlewares (ex.: `auth`)
- `utils/`: logger e erros

Rotas principais
- `GET /` — lista pensamentos (com busca e ordenação)
- `GET /toughts/dashboard` — dashboard do usuário
- `GET/POST /toughts/create` — criar pensamento
- `GET /toughts/update/:id` e `POST /toughts/update` — editar
- `POST /toughts/delete` — remover
- `GET/POST /login`, `GET/POST /register`, `GET /logout` — autenticação

Notas
- Sessions são salvas em diretório temporário do SO via `session-file-store`
- App usa porta `3000` por padrão
- Projeto para fins de estudo

Licença
ISC
