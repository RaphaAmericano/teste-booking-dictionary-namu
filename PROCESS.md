# Development Process of the App

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

## 2. Design
- Develop wireframes and prototypes.
- Establish the architecture of the application.
- Choose the technology stack and tools.

## 3. Development
- Set up the development environment.
- Implement features according to the specifications.
- Conduct regular code reviews and maintain coding standards.

## 4. Testing
- Perform unit testing for individual components.
- Conduct integration testing to ensure components work together.
- Execute user acceptance testing (UAT) with stakeholders.

## 5. Deployment
- Prepare the production environment.
- Deploy the application using CI/CD pipelines.
- Monitor the application for any issues post-deployment.

## 6. Maintenance
- Regularly update the application for security and performance.
- Gather user feedback for future improvements.
- Plan for new features and enhancements based on user needs.

## Conclusion
This development process ensures a structured approach to building the application, facilitating collaboration among team members and delivering a high-quality product.

>  This is a challenge by [Coodesh](https://coodesh.com/)