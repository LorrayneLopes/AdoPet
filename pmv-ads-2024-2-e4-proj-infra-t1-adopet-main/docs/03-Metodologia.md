
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Descreva aqui a metodologia de trabalho do grupo para atacar o problema. Definições sobre os ambiente de trabalho utilizados pela  equipe para desenvolver o projeto. Abrange a relação de ambientes utilizados, a estrutura para gestão do código fonte, além da definição do processo e ferramenta através dos quais a equipe se organiza (Gestão de Times).

## Relação de Ambientes de Trabalho

Os ambientes de trabalho do projeto AdoPet foram estruturados para garantir uma colaboração eficiente entre a equipe e a organização clara das atividades. O repositório de código-fonte será hospedado no GitHub, permitindo o controle de versão e a integração contínua entre os desenvolvedores, com branches dedicadas para diferentes fases de desenvolvimento. A interface e os wireframes do projeto serão projetados no Figma, uma ferramenta de design colaborativa que possibilita a criação e compartilhamento de protótipos de alta fidelidade. Para o gerenciamento das tarefas e sprints, será utilizado o GitHub Projects, facilitando o acompanhamento do progresso e a distribuição das responsabilidades dentro da equipe. Essas plataformas oferecem um ambiente integrado e eficiente para o desenvolvimento do AdoPet, garantindo alinhamento e produtividade ao longo do ciclo de desenvolvimento.

## Controle de Versão

<p align="justify">
O projeto AdoPet utiliza Git como ferramenta de controle de versão e GitHub para hospedagem do repositório. As branches seguem uma convenção pré-definida:
</p>

- `main`: versão estável e testada do software.
- `unstable`: versão testada, porém ainda instável.
- `testing`: versão em fase de testes.
- `dev`: branch de desenvolvimento, onde novas funcionalidades são criadas.

### Gerência de Branches e Merges

<p align="justify">
Cada nova funcionalidade ou correção é desenvolvida em branches específicas, criadas a partir da branch <strong>dev</strong>. O processo de merge ocorre através de pull requests (PRs) para as branches principais, com revisões realizadas por outros membros da equipe antes da integração. A branch <strong>main</strong> só recebe código após ter sido testado e validado nas branches intermediárias.
</p>

- As novas funcionalidades são desenvolvidas em branches específicas.
- O merge é realizado por meio de pull requests (PRs).
- Revisões de código são feitas por outros membros da equipe antes da integração.
- A branch <strong>main</strong> só recebe código validado nas branches intermediárias.

### Commits e Tags

<p align="justify">
As seguintes regras devem ser seguidas para <strong>commits</strong> e <strong>tags</strong>:
</p>

- **Commits**
  - Devem ser atômicos, contendo mudanças isoladas.
  - As mensagens dos commits devem ser claras e descritivas, documentando bem as alterações.
- **Tags**
  - Devem ser usadas para marcar releases importantes.
  - Facilitam o rastreamento de versões estáveis do software.

### Gerência de Issues

<p align="justify">
As issues são gerenciadas no GitHub, categorizadas por etiquetas, seguindo a seguinte convenção:
</p>

- `documentation`: melhorias ou acréscimos na documentação.
- `bug`: indica que uma funcionalidade apresenta problemas.
- `enhancement`: quando uma funcionalidade existente precisa ser aprimorada.
- `feature`: usada para sinalizar a criação de uma nova funcionalidade.

<p align="justify">
Cada issue está vinculada a uma branch ou tarefa específica, facilitando o acompanhamento e priorização no ciclo de desenvolvimento. Essa estrutura assegura um fluxo de desenvolvimento organizado e rastreável, mantendo a qualidade do código e facilitando a integração contínua.
</p>


## Gerenciamento de Projeto

### Divisão de Papéis

O projeto AdoPet adota uma metodologia de trabalho centrada em um ambiente de desenvolvimento colaborativo, organizado de forma ágil com **Scrum**. A equipe está estruturada da seguinte maneira:

### Scrum Master
**Responsável:** Lorrayne Lopes  
Facilita as cerimônias Scrum e remove impedimentos.

### Product Owner
**Responsável:** Ana Clara  
Prioriza o backlog e garante que as funcionalidades atendam às necessidades dos usuários.

### Equipe de Desenvolvimento Backend
**Responsável:** Matheus Rocha  
Desenvolve a API em C# no Visual Studio, integrando com o MongoDB.

### Equipe de Desenvolvimento Frontend
**Responsável:** Lucas Verri  
Implementa a interface web com Angular e o aplicativo móvel com Ionic.

### Equipe de Controle de Versão (DevOps)
**Responsável:** Vitor Costa  
Gerencia o controle de versão no GitHub, estruturando as branches de desenvolvimento, homologação e produção.


### Processo

Como forma de organizar e desenvolver o projeto optamos por utilizar o Github Projects que é uma ferramenta adaptável e flexível para planejar e acompanhar o trabalho no GitHub. Pode ser acessado através do link:https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/1523/views/1

![Backlog de Sprint](https://github.com/user-attachments/assets/9c7a58ab-fefd-4075-b4b7-630e03d8a71b)

# Ferramentas

As ferramentas empregadas no desenvolvimento do projeto AdoPet foram selecionadas para garantir um fluxo de trabalho eficiente e integrado entre os membros da equipe. Abaixo estão as ferramentas utilizadas e as razões para sua escolha:

## Editor de Código:
- **Visual Studio** (para o back-end em C#) e **Visual Studio Code** (para o front-end em Angular e Ionic):  
  Ambos os editores oferecem excelente integração com o Git, permitindo o controle de versão diretamente do ambiente de desenvolvimento. Eles também suportam extensões para depuração e linting, aumentando a eficiência no desenvolvimento de código.

## Ferramentas de Comunicação:
- **WhatsApp** e **Discord**:  
  Essas ferramentas foram escolhidas por sua simplicidade e acessibilidade, facilitando a comunicação rápida entre os membros da equipe. O Discord também oferece canais organizados para discussões técnicas, chamadas de voz e compartilhamento de arquivos, enquanto o WhatsApp é utilizado para comunicações mais ágeis e informais, mantendo todos os membros sincronizados.

## Ferramentas de Desenho de Tela (Wireframing):
- **Figma**:  
  O Figma foi escolhido por sua capacidade de criar protótipos e wireframes colaborativos em tempo real, permitindo que o design da interface reflita de forma precisa as necessidades da solução. A ferramenta também facilita o compartilhamento e revisão de designs, proporcionando um feedback rápido e eficiente.

Essas ferramentas, além de integrarem bem os processos de desenvolvimento, proporcionam uma colaboração efetiva e ágil entre os membros da equipe do AdoPet.

 
> **Possíveis Ferramentas que auxiliarão no gerenciamento**: 
> - [Slack](https://slack.com/)
> - [Github](https://github.com/)
