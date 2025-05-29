
# Cantina App Frontend

![Cantina App Logo](https://via.placeholder.com/150)

## Descrição

O **Cantina App Frontend** é a interface web desenvolvida em **React** com **TypeScript** para gerenciar as operações de uma cantina escolar. Ele oferece funcionalidades como:

- Cadastro e autenticação de usuários (alunos, responsáveis e funcionários)
- Gerenciamento de produtos alimentícios
- Registro de pedidos e controle de estoque
- Relatórios e estatísticas de vendas

---

## Tecnologias Utilizadas

- **Frontend**: ReactJS com TypeScript, Shadcnui
- **Gerenciador de Pacotes**: npm
- **Roteamento**: React Router v4
- **Requisições HTTP**: Axios
- **Validação de Formulários**: Zod
- **Ícones**: Fontawesome

---

## Estrutura do Projeto

```
├── public/            # Arquivos públicos (index.html, imagens)
├── src/               # Código-fonte da aplicação
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços (API, autenticação)
│   ├── styles/        # Estilos globais
│   └── App.tsx        # Componente principal
├── .editorconfig      # Configurações do editor
├── .eslintignore      # Arquivos a serem ignorados pelo ESLint
├── .eslintrc.json     # Configurações do ESLint
├── .gitignore         # Arquivos a serem ignorados pelo Git
├── .prettier.config.js# Configurações do Prettier
├── package.json       # Dependências e scripts
├── tsconfig.json      # Configurações do TypeScript
└── yarn.lock          # Lockfile do Yarn
```

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/leonardo99/cantina-app-front.git
cd cantina-app-front
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar a aplicação

```bash
npm start
```