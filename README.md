# Cidadeclipse - TARTARU'S CAFETERIA ☕🌘 *(Em andamento)*

### Uma editora cooperativa de artistas emergentes

<p align="justify">
Em uma cidade escondida de tudo há uma cafeteria exótica na beira de uma fenda — uma fenda tão profunda que pode até mostrar o rio Tártaro do Hades. Esta cafeteria é a <strong>Tartaru's Coffee Shop</strong>, localizada na <strong>Cidade Eclipse</strong>. Entre, dê uma espiada nas nossas profundezas — mas não proteja os olhos, hein!
</p>

<p align="justify">
Este projeto está sendo desenvolvido como uma vitrine digital e, em breve, se tornará um <strong>e-commerce artístico</strong>, onde será possível adquirir obras e produtos criados por artistas cooperados da editora Cidadeclipse.
</p>

---

## 🧰 Tecnologias Frontend

### ⚛️ React 18
Biblioteca principal para construção da interface interativa baseada em componentes.

### ⚡ Vite
Utilizado para bundling e desenvolvimento rápido com HMR (Hot Module Replacement).

### 🛠️ TypeScript
Oferece segurança com tipagem estática e melhora a manutenção do código.

### 🎨 Styled-components
Permite o uso de CSS-in-JS, com escopo local e sem conflitos de estilo.

### 🧠 Zustand
Gerenciador de estado leve, moderno e intuitivo, ideal para aplicações com compartilhamento de estado simples e direto.

### 🧭 React Router DOM + Hash Link
Gerencia o roteamento de páginas e âncoras dentro do app de forma fluida.

### 🧼 ESLint + Prettier
Mantêm a consistência e qualidade do código com linting e formatação automáticos.

### 🧱 Redux Toolkit (disponível)
Para casos onde o gerenciamento de estado precisar escalar ou incluir middlewares assíncronos.

### 🎭 React Input Mask
Aplica máscaras de entrada em formulários, como CPF, telefone, etc.

### ⏳ React Spinners
Indicadores visuais de carregamento assíncrono.

---

## 🧪 Backend — NestJS + Prisma + MySQL

<strong>[O backend do projeto](https://github.com/lllleao/backend-cd)</strong> está sendo desenvolvido com [NestJS](https://nestjs.com/) e gerenciado com [Prisma ORM](https://www.prisma.io/) usando banco de dados MySQL. Está dividido entre funcionalidades já disponíveis em produção e funcionalidades em desenvolvimento.

### ✅ Em produção:
- API pública para entrega de livros gratuitos diretamente no site.

### 🚧 Em desenvolvimento:
- Sistema de autenticação com JWT e proteção CSRF.
- Registro e login de usuários com senha criptografada (bcrypt).
- Carrinho de compras: adicionar, remover e listar itens.
- Finalização de pedidos com integração de pagamento via **PIX**.
- Middleware de segurança com **Helmet**, **rate limiting**, e **cookie-parser**.
- Validação de dados com `class-validator` e `class-transformer`.

### 🛠️ Tecnologias backend:
- **NestJS**: framework escalável e modular para aplicações Node.js.
- **Prisma ORM**: abstração moderna e tipada para MySQL.
- **JWT + CSRF**: autenticação segura com tokens e proteção contra ataques cross-site.
- **Nodemailer**: (instalado) para futuros recursos de notificação por e-mail.
- **Express-rate-limit + Helmet**: hardening básico de segurança HTTP.

---

## 🛒 Futuro do Projeto

A plataforma será expandida para um **e-commerce completo**, permitindo a venda direta de livros, zines, prints, ilustrações e outros produtos artísticos dos membros cooperados da Cidadeclipse. Essa estrutura oferecerá uma alternativa independente e autossustentável para artistas emergentes.

---

## 📜 Licença

Este projeto é de uso interno e artístico. Direitos reservados aos autores da Cidadeclipse.

---

## 🐳 Como Rodar com Docker

1. Clonar o repositório e instalar dependências:

```shell
git clone https://github.com/lllleao/frontend-cd.git
cd frontend-cd
npm install
```

2. Subir o container:

```shell
docker build -t frontend-cd .
docker run -d -p 8080:80 frontend-cd
```

🌐 Acesso

Disponível em: http://localhost:8080

## ⚡ Alternativa sem Docker
```shell
git clone https://github.com/lllleao/frontend-cd.git
cd frontend-cd
npm install
npm run dev
```

