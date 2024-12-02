# Processo de desenvolvimento

## Primeiras configurações
Optei por iniciar o desenvolvimento realizando uma configuração basica do servidor, com o esqueleto do roteamento indicado no projeto. Optei por usar o framework Express.
Em seguida configurei um docker compose com imagens de Postgres e Redis para banco de dados e cache.
Para concluir as configurações iniciais, conectei a aplicação ao banco de dados. 
Escolhi o ORM Prisma para fazer o manipulação do banco de dados.

## 1. Auth/User
- Optei por iniciar o desenvolvimento por essas entidades, pois grande parte das requisiçõe iriam necessitar de autenticação.
- Opetei por dividir usuário em duas entidades para isolar os dados de autenticação do usuario em parte do banco dos de visualização.
- Em seguida desenvolvi as classes relacionadas ao User e Auth, com o objetivo de realizar a primeira inserção no banco a partir de uma requisição http.
- Com o fluxo de dados funcionando procurei melhorar as interfaces criando os DTOs.
- Para finalizar essa primeira parte de Auth/User, desenvolvi casos de testes para o AuthController e AuthRoutes.

## 2. Word
- Configurei um seed para buscar os dados do JSON indicado e preencher o banco com todo o conteúdo ali.
- Criei um service para consultar a API de dicionario.

## 3. Favorite e History
- Optei por modelar o banco de forma que cada uma dessas entidades tivesse seus dados unicos e se relacionacem com Word e User apenas por meio de chaves estrangeiras.
Optei por essa abordagem para não duplicar dados em diferentes tabelas e para conseguir selecionar com mais facilidade os dados na hora das consultas do usuario.

## Cache
- Configurei o Redis para salvar todas as requisições que eram feitas para a API do dicionário. - Desenvolvi de forma que fosse que toda palavra consultada fosse verificada no cache do Redis antes de buscar na API externa. 
- Tentei salvar os outros dados da API no banco, para ser uma outra camada de verificação, mas não consegui terminar de maneira satisfatória a tempo.

## Clean Code 
- Procurei desenvolver de maneira que tudo fosse desacoplado ao máximo, sendo fácil modificar as dependencias de serviços externos. 
- Também procurei desmontar as requisições em middlewares que fizessem sentido, para isolar a tarefa de cada etapa da requisição, e fosse possivel o reuso em outra parte da aplicação.
