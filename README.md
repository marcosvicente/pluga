# Teste Plug

🚀 Para rodar a aplicação

Cada parte do projeto (backend e frontend) possui seu próprio README com instruções detalhadas de instalação e execução.
Consulte os arquivos dentro das pastas `backend/` (Rails) e `frontend/` (Next.js) para saber como configurar e iniciar cada ambiente corretamente.

## Snippets API — Exemplos com curl
### 📝 Criar um snippet

Endpoint:
POST /snippets

Descrição:
Recebe { "text": "conteúdo bruto..." }, armazena no banco e gera um resumo via IA (OpenAI ou Gemini).
Exemplo de requisição:
```bash
curl -X POST http://localhost:3000/snippets \
-H "Content-Type: application/json" \
-d '{
"text": "As queimadas em São Paulo aumentaram nos últimos meses, afetando a qualidade do ar e a saúde pública."
}'
```
Resposta esperada:
``` json
{
"id": 1,
"text": "As queimadas em São Paulo aumentaram nos últimos meses, afetando a qualidade do ar e a saúde pública.",
"summary": "Aumento das queimadas em São Paulo prejudica o ar e a saúde da população."
}
```

### 📖 Ler um snippet

Endpoint:
GET /snippets/:id

Exemplo de requisição:
```bash
curl -X GET http://localhost:3000/snippets/1
```
Resposta esperada:
```json
{
"id": 1,
"text": "As queimadas em São Paulo aumentaram nos últimos meses, afetando a qualidade do ar e a saúde pública.",
"summary": "Aumento das queimadas em São Paulo prejudica o ar e a saúde da população."
}

```

### 📜 Listar snippets

Endpoint:
GET /snippets

Exemplo de requisição:
```bash
curl -X GET http://localhost:3000/snippets
```
Resposta esperada:
```json
[
{
"id": 1,
"text": "As queimadas em São Paulo aumentaram nos últimos meses...",
"summary": "Aumento das queimadas em São Paulo prejudica o ar e a saúde."
},
{
"id": 2,
"text": "A mineração de dados pode ajudar a prever áreas de risco de incêndio.",
"summary": "Mineração de dados auxilia na prevenção de incêndios."
}
]

```

# Instruções claras para obter e configurar a chave de API do provedor de IA.

Para usar a OpenAI, você precisa gerar uma chave de API no  [ site daOpenAI ](https://platform.openai.com/account/api-keys)
.
```bash
OPENAI_ACCESS_TOKEN=your_api_key_here
```
Certifique-se de que essa variável esteja definida no seu arquivo .env.local ou no ambiente de implantação antes de executar a aplicação.

# 🧠 Reflexão Pós-Desafio

- Tratamento de exceções: criaria mais casos de exceção, especialmente na classe OpenAi::ChatService, para tornar o fluxo mais resiliente e previsível.
- Ambiente de testes: utilizaria uma chave paga da OpenAI para realizar testes mais completos e realistas, explorando cenários de uso mais avançados.

- Cobertura de testes: ampliaria os testes automatizados tanto no backend (RSpec) quanto no frontend (Jest/Testing Library), buscando atingir 100% de cobertura.

- Integração entre sistemas: aperfeiçoaria a integração entre Ruby on Rails e Next.js, otimizando a comunicação via API e reduzindo latências.

- Documentação: refinaria a documentação técnica, incluindo exemplos práticos de uso, setup detalhado e instruções de implantação.

- UX/UI e arquitetura: faria melhorias na experiência do usuário e refatoraria partes do código para aumentar a modularidade, legibilidade e facilidade de manutenção.

