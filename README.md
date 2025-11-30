# 🐛 Bugs API – Projeto Completo de QA (Manual + Automação)

Este repositório contém um projeto completo de Quality Assurance (QA) focado em testes de API, utilizando as seguintes tecnologias:

* **Node.js + Express:** Utilizado para construir uma API simples que serve como aplicação-alvo.
* **Postman:** Ferramenta central para execução de testes manuais, automatizados (scripts) e geração de documentação.
* **Scripts de Teste (pm.test):** Automação básica de validações.
* **Boas Práticas de QA:** Aplicação de testes funcional, exploratório e regressivo.

O objetivo é demonstrar habilidades práticas de um QA moderno, integrando análise funcional, testes de API e automação básica em um ciclo completo.

---

## Estrutura do Projeto

| Diretório | Conteúdo Principal | Descrição |
| :--- | :--- | :--- |
| [**/api**](bugtracker-api) | `index.js`, `package.json` | Código da API (Node + Express) |
| [**/postman**](postman/collections) | `bugs_api_collection.json` | Collection com requests e scripts de teste Postman |
| `README.md` | Este arquivo | Documentação e guia do projeto |

---

## 🚀 1. Sobre a API

A API simula um sistema real de Bug Tracker, expondo um **CRUD completo** (Create, Read, Update, Delete):

| Método | Endpoint | Funcionalidade |
| :--- | :--- | :--- |
| `POST` | `/bugs` | Criar um novo bug |
| `GET` | `/bugs` | Listar todos os bugs |
| `GET` | `/bugs/:id` | Buscar um bug por ID |
| `PUT` | `/bugs/:id` | Atualizar um bug existente |
| `DELETE` | `/bugs/:id` | Deletar um bug |

A API foi construída com Node.js + Express e deve ser executada localmente.

---

## 🧪 2. Testes Automatizados no Postman

O Postman é usado para executar os requests e, através dos `pm.test` (scripts de teste), automatizar validações.

* ✔️ **POST – Criar Bug**
    * Validação de status `201 Created`.
    * Validação de estrutura JSON (campos obrigatórios).
    * **Automação:** Script salva automaticamente o ID do bug criado para uso nos próximos testes: `pm.environment.set("bugId", ...)`.

* ✔️ **GET – Listar Bugs**
    * Validação de lista: verifica se o retorno é um array e não está vazio.
    * Verificação de campos obrigatórios em pelo menos um item da lista.

* ✔️ **GET – Buscar Bug por ID**
    * Utiliza a variável de ambiente `{{bugId}}` (capturada no POST).
    * Valida retorno correto do objeto (`status 200`).
    * Testa cenários negativos, como verificar `status 404 Not Found` ao buscar um ID inexistente.

* ✔️ **PUT – Atualizar Bug**
    * Valida `status 200 OK`.
    * Confirma a alteração de dados (ex: prioridade/status) através de um **GET subsequente**.

* ✔️ **DELETE – Remover Bug**
    * Valida `status 200 OK`.
    * Confirma a remoção total verificando se o **GET subsequente** retorna um **`status 404`**.

---

## 🧭 3. Tipos de Testes (A Mentalidade QA)

### 🔹 Testes Funcionais
Foco em garantir que cada endpoint atende aos requisitos de negócio:
* Validar o fluxo principal do CRUD (Happy Path).
* Garantir que cada request e response respeita sua regra de negócio e especificação.
* Checar campos obrigatórios, tipos de dados e retornos esperados.

### 🔹 Testes Exploratórios
Foco em desafiar a API além dos casos previstos:
* Criar bugs com valores limite ou aleatórios.
* Testar payloads com campos faltando ou tipos de dados incorretos.
* Tentar "quebrar" a API para observar o tratamento de erros (`error handling`).

### 🔹 Testes Regressivos
Foco em manter a estabilidade da aplicação:
* Reexecutar toda a coleção de testes de forma automática.
* Garantir que novas funcionalidades ou correções (`bug fixes`) não introduziram falhas em partes já testadas do sistema.

---

## ⚙️ 4. Como Rodar a API Localmente

**Requisitos:** Node 18+

1.  Acesse o diretório da API:
    ```bash
    cd api
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a API:
    ```bash
    npm start
    ```

A API iniciará em: **`http://localhost:3000`**

---

## 📬 5. Como Usar a Coleção do Postman

1.  Abra o Postman.
2.  Importe o arquivo em `/postman/bugs_api_collection.json`.
3.  Crie um novo ambiente e configure a única variável necessária:
    * Variável: **`baseUrl`**
    * Valor: `http://localhost:3000`
4.  Execute a coleção na ordem sugerida, que segue o fluxo de dependência dos testes:
    * 1. POST Criar Bug
    * 2. GET Listar Bugs
    * 3. GET Buscar Bug por ID
    * 4. PUT Atualizar Bug
    * 5. DELETE Remover Bug

---

## 📄 6. Documentação

A documentação da API é gerada automaticamente pelo Postman e pode ser integrada ao GitHub Pages para acesso público (via Connect Repository).

---

## 🧠 7. Habilidades Demonstradas

* Entendimento prático de **APIs REST** e **fluxo CRUD**.
* Criação de scripts de teste e validações automatizadas no Postman (`pm.test`).
* Uso de **variáveis de ambiente** e **variáveis de coleção** para encadeamento de testes.
* Organização de coleção de testes e aplicação de **boas práticas de QA**.
* Conhecimento e aplicação de testes **funcionais, exploratórios e de regressão**.
* Configuração e entendimento básico de um ambiente de desenvolvimento **Node.js/Express**.
* Setup de um pipeline de teste (Aplicação-alvo + Testes + Documentação).

---

## ⏭️ 8. Próximos Passos (Roadmap)

Este projeto tem potencial para expansão nas seguintes áreas:

### 🚀 Extensão do Projeto
* **Criar Front-End Simples:** Desenvolver uma interface básica para consumir a API, permitindo estender o escopo dos testes para a camada de UI.
* **Deploy da API:** Publicar a API em um ambiente externo (ex: Heroku, Vercel) para demonstrar testes em ambiente real.

### 🧪 Melhorias no QA
* **Testes E2E com Cypress/Playwright:** Implementar testes de ponta a ponta (E2E) para cobrir o fluxo completo da aplicação (UI + API).
* **Relatório Automático de Regressão:** Integrar uma ferramenta (ex: Newman + HTML Reporter) para gerar relatórios de testes de regressão automaticamente.
* **Melhorar Validação de Campos (API):** Adicionar validações mais robustas na API (ex: Joi/Express-validator) e cobrir esses novos cenários nos testes do Postman.

### 🔍 Funcionalidades da API
* **Implementar Filtros:** Adicionar endpoints para filtrar bugs por **prioridade** e **status**, melhorando a usabilidade da API.


