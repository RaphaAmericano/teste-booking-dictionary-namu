
# Back-end Challenge - Dictionary
>  This is a challenge by [Coodesh](https://coodesh.com/)
>  
Api de consulta e arquivamento de dados de dicionário.

## Lista de tecnologias

- Linguagem: NodeJS(Typescript)
- Framework: Express
- Banco de Dados: Postgres
- ORM: Prisma
- Banco de Dados para Cache: Redis

## Instruções

Após clonar o repositório, execute `npm install` ou `yarn install`, de acordo com seu gerenciador de pacote de preferência.
Copie o arquivo `example.env` e renomeie para `.env`. 
Preencha as variáveis de acordo com a configuração do banco desejada, chave secreta e banco de cache. 
Após configurar as variáveis, execute:

    npm run prisma:generate
    npm run prisma:migrate
    // ou 
    yarn prisma:generate
    yarn prisma:migrate

Em seguida, execute os comando:

    npm run build
    npm run start
    // ou
    yarn build
    yarn start
    


Utilizando o Docker:
Depois de preenchido, execute o comando `docker compose up -d --build` na raiz do diretório para gerar as imagens e iniciar o ambiente. A aplicação estará rodando na porta `3000`

## Processo de desenvolvimento
Descrevi o processo de desenvolvimento no arquivo PROCESS.md

