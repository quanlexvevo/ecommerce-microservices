x # 🛒 Microservices E-Commerce API

A production-ready e-commerce backend built with **microservices architecture** using NestJS, PostgreSQL, Docker, and JWT authentication.

---

## 🏗️ Architecture

```
                        ┌─────────────────┐
                        │   API Gateway   │
                        │   :3000         │
                        │  JWT Auth Guard │
                        └────────┬────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
    ┌─────────▼──────┐  ┌───────▼────────┐  ┌──────▼─────────┐
    │  Auth Service  │  │Product Service │  │ Order Service  │
    │    :3003       │  │    :3001       │  │    :3002       │
    │  PostgreSQL    │  │  PostgreSQL    │  │  PostgreSQL    │
    │  (auth_db)     │  │  (product_db)  │  │  (order_db)    │
    └────────────────┘  └────────────────┘  └────────────────┘
```

---

## 🚀 Services

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 3000 | Single entry point, JWT validation, request routing |
| Auth Service | 3003 | User registration, login, JWT token generation |
| Product Service | 3001 | Product CRUD, stock management |
| Order Service | 3002 | Order creation, inter-service communication |

---

## 🛠️ Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL (separate DB per service)
- **ORM:** TypeORM
- **Auth:** JWT (JSON Web Tokens)
- **Containerization:** Docker & Docker Compose
- **Message Broker:** RabbitMQ (infrastructure ready)

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 1. Clone the repository
```bash
git clone https://github.com/quanlexvevo/ecommerce-microservices.git
cd ecommerce-microservices
```

### 2. Start infrastructure (PostgreSQL + RabbitMQ)
```bash
docker compose up -d
```

### 3. Start all services (open 4 separate terminals)

```bash
# Terminal 1 - Auth Service
cd auth-service && npm install && npm run start:dev

# Terminal 2 - Product Service
cd product-service && npm install && npm run start:dev

# Terminal 3 - Order Service
cd order-service && npm install && npm run start:dev

# Terminal 4 - API Gateway
cd api-gateway && npm install && npm run start:dev
```

---

## 📡 API Endpoints

All requests go through the **API Gateway** on port `3000`.

### 🔐 Auth (no token required)

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### 📦 Products (token required)

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
```

### 🧾 Orders (token required)

```http
POST   /orders
GET    /orders/user/:userId
```

### Authentication
Add JWT token to request headers:
```
Authorization: Bearer <your_token>
```

---

## 🔄 How It Works

1. **User registers/logs in** via API Gateway → Auth Service → Returns JWT token
2. **User creates a product** via API Gateway (JWT verified) → Product Service → Saved to product_db
3. **User places an order** via API Gateway (JWT verified) → Order Service → Fetches product from Product Service → Decreases stock → Saves order to order_db

---

## 🐳 Docker Services

| Container | Image | Port |
|-----------|-------|------|
| postgres-auth | postgres:15 | 5433 |
| postgres-product | postgres:15 | 5434 |
| postgres-order | postgres:15 | 5435 |
| rabbitmq | rabbitmq:3-management | 5672, 15672 |

RabbitMQ Management UI: http://localhost:15672 (admin/admin123)

---

## 👨‍💻 Author

**Cem Karaca** — [GitHub](https://github.com/quanlexvevo) · [LinkedIn](https://linkedin.com/in/cem-karaca)
