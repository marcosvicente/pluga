# Pluga Challenge FullStack

Nós da [Pluga](https://pluga.co) nos orgulhamos muito do nosso time e sempre queremos
boas pessoas para acrescentar com a gente, por isso preparamos esse desafio de avaliação.

## Contexto

Equipes de conteúdo frequentemente precisam de uma forma rápida de colar textos brutos
(rascunhos de blogs, transcrições etc.) e obter resumos curtos, gerados por IA,
que possam ser reutilizados em outros lugares.

Você deverá implementar um serviço que forneça essa funcionalidade.

## Sua Tarefa

Crie uma aplicação composta por:

1. API em [Ruby on Rails](https://rubyonrails.org) (backend), com os seguintes endpoints:

| Ação   | Endpoint            | Descrição                                                                                                                                                            |
| ------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Criar  | `POST /snippets`    | Recebe `{ "text": "conteúdo bruto..." }`, armazena no banco e retorna `{ id, text, summary }`. O `summary` deve ser gerado por um provedor de IA (OpenAI ou Gemini). |
| Ler    | `GET /snippets/:id` | Retorna `{ id, text, summary }`.                                                                                                                                                   |
| Listar | `GET /snippets`     | Retorna a lista de snippets `[{ id, text, summary }]`.

2. Interface em [Next.js](https://nextjs.org) (frontend), onde o usuário pode colar texto, salvar e visualizar os resumos já criados.

## Stack

* **Backend:** Ruby 3+, Rails 8+ (API-only), RSpec para testes e Rubocop para lint.
* **Frontend:** Next.js 14+, TypeScript, Jest/Testing Library para testes e ESlint para lint.
* **Banco de dados:** PostgreSQL.
* **IA:** Chamada a um provedor de IA (OpenAI ou Gemini). O token deve vir de uma variável de ambiente.
* **Docker:**
    * Deve existir um `Dockerfile` para backend e outro para frontend + `docker-compose.yml` do projeto.
    * `docker compose up` deve iniciar a API (porta **3000**) e o frontend (porta **4000**).
* **Git:**
    * Suba em um repositório público (GitHub).
    * Histórico de commits deve mostrar progresso incremental e ciclos de TDD (não apenas um commit final).
    * Pipeline de CI (GitHub Actions) com lint e testes.

## Entregáveis

1. **Repositório público** com:
    * `README.md` (instruções de setup local & Docker, como rodar testes, exemplos de requisições via `curl` ou Postman).
    * Código-fonte com a seguinte estrutura:

      ```
      /backend               # API Rails
      /frontend              # Interface Next.js
      /docker-compose.yml    # Configurações de container
      ```

2. **Instruções claras** para obter e configurar a chave de API do provedor de IA.
3. **Reflexão pós-desafio** (até ½ página no README):

    * O que você melhoraria com mais tempo.
    * Quais trade-offs tomou.

## Avaliação

Serão considerados:

* **Qualidade e arquitetura do código:** Rails idiomático, Next.js bem estruturado, código modular e testável.
* **TDD:** Testes escritos junto com o código, não depois.
* **Design da API:** RESTful, mensagens de erro úteis, tratamento de 4xx/5xx.
* **Segurança e variáveis de ambiente:** chaves em `.env`, nunca no repo.
* **Containerização:** Imagem leve, reprodutível, fácil de rodar.
* **Comunicação:** README claro, commits descritivos, histórico consistente.

## Considerações

Caso aceite o desafio e submeta seu projeto, vamos avaliar seu código com muita
atenção para retornar com a nossa visão de quais são os pontos positivos e os
pontos a melhorar.

Muito obrigado e bom coding. :)