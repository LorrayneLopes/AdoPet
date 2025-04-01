# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![image](https://github.com/user-attachments/assets/3a21dab1-7f57-40eb-ac2e-4d9b62082982)





## Diagrama de Classes

![image](https://github.com/user-attachments/assets/44749b43-aba5-4d09-beb8-1946e5495616)



## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Para implementação da solução, utilizaremos as seguintes tecnologias:

Front-end:
- Angular: Framework para construção da interface web, que permite criar aplicações de página única (SPAs) de forma eficiente e modular.
- TypeScript: Linguagem usada no desenvolvimento com Angular, que adiciona tipagem estática ao JavaScript, proporcionando maior segurança e robustez ao código.
- Bootstrap: Biblioteca CSS que facilita o desenvolvimento de interfaces responsivas e modernas.

Mobile:
- Ionic: Framework para desenvolvimento de aplicações móveis híbridas, que permite criar apps que funcionam tanto em iOS quanto em Android utilizando as mesmas tecnologias web (HTML, CSS, JavaScript).

Back-end:
- C#: Linguagem de programação robusta e amplamente utilizada para o desenvolvimento do lado do servidor.
- ASP.NET: Framework para construção de aplicações web e APIs em C#, que facilita o desenvolvimento e a configuração do back-end, permitindo criar serviços eficientes e escaláveis.

Banco de Dados:
- MongoDB: Banco de dados NoSQL, que armazena dados em documentos flexíveis, tornando-o ideal para aplicações que precisam de escalabilidade e flexibilidade nos modelos de dados.

IDE:
- Visual Studio Code: IDE leve e versátil, ideal para desenvolvimento com Angular, TypeScript, e Ionic.
- Visual Studio: IDE robusta para desenvolvimento em C#.

Fluxo de Interação do Usuário com o Sistema
- O usuário interage com a aplicação através de um dispositivo móvel (app Ionic) ou navegador (app Angular).

- A interação gera uma requisição HTTP que é enviada ao back-end, onde o ASP.NET processa a lógica de negócio.

- O backend acessa o MongoDB para armazenar ou recuperar dados conforme a necessidade da requisição.

- A resposta processada pelo back-end é enviada de volta para o front-end (ou app), onde é apresentada ao usuário de forma amigável e responsiva.


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Para nortear o desenvolvimento do projeto AdoPet em termos de qualidade, utilizando a ISO/IEC 25010 como referência, algumas subcaracterísticas podem ser identificadas como fundamentais. Estas subcaracterísticas estão relacionadas com os objetivos e necessidades do projeto, e cada uma delas pode ser avaliada por meio de métricas específicas. A seguir são detalhadas as subcaracterísticas aplicáveis ao projeto AdoPet e justificadas suas escolhas.

### 1. Funcionalidade: Adequação Funcional
O principal objetivo do AdoPet é permitir que usuários e organizações interajam de maneira eficiente para a adoção de animais. A adequação funcional garante que o sistema seja capaz de realizar as funções esperadas pelos usuários, como visualizar animais, aplicar filtros, e gerenciar solicitações.

**Métricas:**
- Cobertura funcional (percentual de funcionalidades entregues em relação ao escopo planejado).
- Taxa de sucesso de tarefas realizadas pelos usuários (usabilidade).

### 2. Confiabilidade: Disponibilidade
A aplicação AdoPet deve ser confiável, garantindo alta disponibilidade para que os usuários possam acessá-la a qualquer momento, seja pela web ou por dispositivos móveis. Interrupções de serviço podem comprometer o processo de adoção.

**Métricas:**
- Percentual de uptime (tempo que o sistema está disponível).
- Número de falhas por período de tempo.

### 3. Usabilidade: Operacionalidade e Acessibilidade
A experiência do usuário é fundamental, especialmente por envolver um público diverso. A operacionalidade garante que o sistema seja intuitivo e fácil de usar, enquanto a acessibilidade assegura que pessoas com necessidades especiais também possam utilizar a plataforma.

**Métricas:**
- Tempo médio para completar uma ação (ex. solicitação de adoção).
- Índice de acessibilidade web (usabilidade por pessoas com deficiência, de acordo com WCAG).

### 4. Eficiência de Desempenho: Tempo de Resposta
O desempenho da aplicação, especialmente o tempo de resposta ao buscar dados no MongoDB, é crucial para a experiência do usuário. Um tempo de resposta elevado pode frustrar o usuário e comprometer o uso da plataforma.

**Métricas:**
- Tempo médio de resposta (em milissegundos).
- Latência média de requisições ao banco de dados.

### 5. Manutenibilidade: Modularidade
Como o projeto utilizará múltiplas tecnologias (C#, MongoDB, Angular, React Native), é fundamental que a aplicação seja modular para facilitar futuras manutenções, integrações e atualizações.

**Métricas:**
- Número de módulos independentes.
- Complexidade ciclomática (métrica de complexidade do código).

### 6. Portabilidade: Adaptabilidade
A aplicação deve ser facilmente acessível em múltiplos dispositivos (computadores, smartphones, tablets), sem perda de funcionalidade ou de experiência de usuário.

**Métricas:**
- Número de dispositivos/sistemas operacionais suportados.
- Percentual de funcionalidade mantida entre diferentes plataformas (web e mobile).

### 7. Segurança: Confidencialidade e Autenticidade
O sistema deve proteger as informações dos usuários e garantir que apenas indivíduos autorizados possam acessar certas funcionalidades, como dados pessoais de adotantes ou animais.

**Métricas:**
- Número de falhas de segurança identificadas.
- Percentual de transações autenticadas e seguras.

### Resumo das Métricas Chave
- **Cobertura funcional:** Avaliar se o sistema entrega as funcionalidades esperadas.
- **Uptime do sistema:** Garantir a alta disponibilidade.
- **Tempo de resposta:** Avaliar a eficiência em termos de desempenho.
- **Acessibilidade e usabilidade:** Medir a experiência dos usuários.
- **Complexidade ciclomática:** Medir a manutenibilidade do código.
- **Compatibilidade entre dispositivos:** Avaliar a portabilidade e adaptabilidade.

Essas subcaracterísticas e métricas formam uma base sólida para avaliar e guiar o desenvolvimento do AdoPet, assegurando que o produto final atenda às expectativas dos usuários e das organizações envolvidas.

