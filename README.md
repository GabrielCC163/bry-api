# BRy Tecnologia - Desafio de programação Back-end

## API de gerenciamento de funcionários

### Tecnologias
Node.js, TypeScript, Knex, PostgreSQL

### Steps para testes locais:

* #### Configure o banco de dados
    - Instale o [Docker](https://docs.docker.com/get-docker/);
    - Crie a pasta local para armazenamento do banco de dados:
    ```
    $ sudo mkdir -p /storage/docker/postgresql-data
    ```
    - Inicialize o container do PostgreSQL:
    ```
    $ docker run --name docker-bry -e POSTGRES_PASSWORD=password -p 5432:5432 -v /storage/docker/postgresql-data:/var/lib/postgresql/data -d postgres
    ```
    - Acesse o container e, em seguida, o terminal do banco de dados para criar a base 'bry':
    ```
    $ docker exec -it docker-bry bash

    $ psql -U postgres

    $ create database bry;

    $ exit;

    ```
    - Execute as migrations:
    ```
    $ yarn knex:migrate
    ```

* #### Inicialize a API
```
$ git clone https://github.com/GabrielCC163/bry-api.git

$ cd bry-api && yarn install
$ yarn start
```

* #### Importe as requisições e as execute via Insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=BRy%20API%20Challenge&uri=https%3A%2F%2Fgist.githubusercontent.com%2FGabrielCC163%2F2f7ad21d434957bd7f0ec5487f440175%2Fraw%2F3ece17918b9c7397e50b63b55758d9b684aa8e46%2Fbry_api_requests.json)

