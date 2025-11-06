# 📦 Project Name

> Pluga Challenge FullStack.

## 🚀 Tech Stack

- Ruby `3.2.2`
- Rails `8.0.4`
- Redis
- Sidekiq
- RSpec / Minitest for testing

---

## 📂 Project Setup

### 📥 Requirements

- Ruby `3.2.2`
- Rails `8.0.4`
- PostgreSQL
- Node.js
- Yarn

### ⚙️ Installation

```bash
docker compose build rails db
docker compose up
```

## 🛢 DB Setup

``` bash
docker compose exec rails bin/rails db:create db:migrate
```

## 🛢 Run test

``` bash
docker compose exec rails bin/bundle exec rspec
```

# Run seed
``` bash 
docker compose exec rails bin/rails db:seed

```

# Rollback
```bash
docker compose exec rails bin/rails db:rollback

```

# Console
```bash
docker compose exec rails bin/rails console
```

# Run server
```bash
docker compose exec rails bin/rails s
```

### ⚙️ OpenAI
To use OpenAI, you need to generate an API key from the OpenAI website) [ OpenAI website](https://platform.openai.com/account/api-keys).
Once you have your key, set it as an environment variable named:
```bash
OPENAI_ACCESS_TOKEN=your_api_key_here
```
Make sure this variable is defined in your .env.local file or your deployment environment before running the application. Use the .env to help you.

### Docs to help
https://blog.saeloun.com/2023/05/22/integrate-openai-api-in-ruby-application/
https://www.youtube.com/watch?v=_3AsaXoLdj4