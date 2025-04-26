# 🛒 Aiqfome API Challenge

Projeto de API desenvolvido para simular cadastro de clientes e favoritos de produtos utilizando a Fake Store API.

## 🚀 Tecnologias

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Docker e Docker Compose
- Swagger (para documentação da API)

## 📦 Como rodar o projeto

Siga os passos abaixo para subir o ambiente completo utilizando Docker:

1. Clone o repositório:

```bash
git clone https://github.com/frederycomiguel/Aiqfome-API-Challenge
cd aiqfome-api
```

2. Suba os containers com Docker Compose:

```bash
docker-compose up --build
```

3. Acesse a aplicação:

- API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api-docs

## 🗂 Estrutura do projeto

- \`src/models/\` → Definições das models Sequelize
- \`src/routes/\` → Rotas da API (clientes e favoritos)
- \`src/swagger.js\` → Configuração da documentação Swagger
- \`src/index.js\` → Arquivo principal que inicia o servidor

## 📚 Documentação

Após subir o projeto, a documentação Swagger estará disponível em:

```bash
http://localhost:3000/api-docs
```

Você poderá testar os endpoints diretamente por lá.

## 🛠️ Comandos úteis

- Subir ambiente:
```bash
  docker-compose up --build
  ```
- Derrubar ambiente:
 ```bash
  docker-compose down
 ```
- Ver logs:
  ```bash
  docker logs -f nome_do_container
  ```

## ✅ Endpoints principais

| Método | Rota                                   | Descrição                         |
|:------:|:--------------------------------------:|:---------------------------------:|
| POST   | \`/api/clients\`                       | Cadastrar cliente                 |
| GET    | \`/api/clients\`                       | Listar clientes                   |
| PUT    | \`/api/clients/{id}\`                  | Atualizar cliente                 |
| DELETE | \`/api/clients/{id}\`                  | Deletar cliente                   |
| POST   | \`/api/clients/{id}/favorites\`         | Adicionar produto aos favoritos   |
| GET    | \`/api/clients/{id}/favorites\`         | Listar favoritos de um cliente    |
| DELETE | \`/api/clients/{id}/favorites/{productId}\` | Remover produto dos favoritos |

## 🐳 Requisitos para rodar

- Docker
- Docker Compose
  EOF
