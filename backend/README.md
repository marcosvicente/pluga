# 📦 Project Name

> Short description of what your Rails app does.

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


### Docs to help
https://blog.saeloun.com/2023/05/22/integrate-openai-api-in-ruby-application/
https://www.youtube.com/watch?v=_3AsaXoLdj4