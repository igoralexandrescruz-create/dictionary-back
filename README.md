# Dictionary Back
Back end do projeto Dictionary.

## Stack utilizada
Node, NestJS, Postgres

## Arquitetura
No projeto utilizei a Clean Architeture modularizada de acordo com o domínio.

Em src/modules estão todos os módulos, sendo que o módulo _shared são todos os serviços, contratos ou entidades compartilhadas entre os módulos.



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
Usei o DB Postgres, pois é uma DB versátil e me dá a possibilidade de fazer uso das funcionalidades tanto do SQL quanto do NoSQL, além de ter ótimas extensões para diversas funcionalidades.

Usei o Typeorm por ser um ORM já consolidado na comunidade Node.

### Migrations
no package.json há 3 scripts relacionados a migrations configurados:

migration:create -> Cria uma migration.

Exemplo de uso no Linux:

```
m=nome_migration npm run migration:create
```

migration:run -> Executa as migrations

migration:revert -> Reverte a última migration

### Estrutura do DB
O DB do projeto está separado por schemas de acordo com o domínio.

Usei o padrão id numérico (SERIAL) e id público (CHAR 26). O id numérico é para uso interno do DB, e o público para expor na API. O id numérico é a chave primária, pois fazer um índice/ordenação/busca de um INT é menos custoso que  CHAR, então internamente usarei sempre o id primário. Para o ID público, optei por usar o ULID (https://github.com/ulid/spec), pois é um padrão menor que o UUID, pode ser usado em algorítmos de ordenação, é URL safe e tem tamanho fixo de 26 caractéres, por isso coloquei CHAR(26) nas colunas id_public já que o tamanho não irá variar. 

Essa decisão foi tomada para sanar o gargalo de segurança da fácil previsibilidade dos ids. Uma vez que o ID é incremental, é fácil prever o ID anterior ou o próximo, o que facilita nos testes de vulnerabilidade. A comunicação entre front e api será por id público, exceto quando se tratar de informações menos sensíveis, como tabelas de referência. 

## Documentação da API
Usei o Swagger a partir da implementação do próprio NestJS @nestjs/swagger. A lib do Swagger do Nest disponibiliza decorators que agilizam na documentação, então não preciso ficar criando especificações nativas do Swagger, o que agiliza muito no desenvolvimento. Para acessar o swagger, basta acessar http://localhost:3000/docs