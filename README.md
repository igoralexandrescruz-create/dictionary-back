# Dictionary Back
Back end do projeto Dictionary. Decidi usar NestJS para agilizar o desenvolvimento.

## Stack utilizada
Node, NestJS, Postgres

## Variáveis de ambiente
Utilizei o dotenv para carregar as variáveis de ambiente. Para executar o projeto, crie um arquivo .env seguindo a implementação do .env.example 
Para uso no projeto, as variáveis de ambiente foram centralizadas no arquivo config/env.ts, onde há um objeto "env" estruturado de acordo com o contexto da variável. 
Ex.:
```
env.server -> Objeto contendo variáveis relacionadas ao servidor
```

Há um valor padrão para as variáveis menos sensíveis no arquivo em questão, como, por exemplo, a porta padrão do servidor http = 3000.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/igoralexandrescruz-create/dictionary-back
```

Entre no diretório do projeto

```bash
  cd dictionary-back
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

Decidi separar o projeto em módulos.

## Banco de Dados e ORM
Usei o Typeorm por ser um ORM já consolidado na comunidade Node, e por já utilizar há anos em meus projetos. 