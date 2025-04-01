# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Atualmente, muitas organizações de adoção de animais enfrentam dificuldades para conectar animais disponíveis para adoção com potenciais adotantes de forma eficiente. A falta de um sistema centralizado e acessível para gerenciar esse processo resulta em baixo índice de adoção, dificultando o encontro entre animais que precisam de um lar e pessoas dispostas a adotá-los.
Diante do problema exposto, visamos desenvolver uma aplicação distribuída que permita aos usuários visualizar animais disponíveis para adoção, filtrar por características específicas (como espécie, idade, tamanho, etc.), e solicitar a adoção diretamente pela plataforma. A aplicação deve ser acessível tanto via web quanto por dispositivos móveis, oferecendo uma experiência integrada e eficiente. Além disso, deve permitir que as organizações de adoção gerenciem o catálogo de animais, acompanhem solicitações de adoção e interajam com os adotantes potenciais.

## Personas


### Persona 1: Maria Silva - Designer Gráfico
![Designer Gráfico](https://github.com/user-attachments/assets/46d06429-bd3d-492e-89a5-1854f6f8f4f1)



---

### Persona 2: João Pereira - Voluntário
![Voluntário](https://github.com/user-attachments/assets/9429d1d6-6625-4da8-b397-0631d9841dec)


---

### Persona 3: Ana Costa - Desenvolvedora de Software
![Desenvolvedora de Software](https://github.com/user-attachments/assets/4d6267da-0df0-4a6b-a110-afd2d00d839a)


---

### Persona 4: Carlos Mendes - Professor
![Professor universitário](https://github.com/user-attachments/assets/62ecac6b-0dd6-41e1-9bf4-a0ae19617377)



## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`                       | QUERO/PRECISO ... `FUNCIONALIDADE`                                        | PARA ... `MOTIVO/VALOR`                                      |
|--------------------------------------------|--------------------------------------------------------------------------|--------------------------------------------------------------|
| Maria Silva - Mãe ocupada                  | Usar um aplicativo móvel para encontrar e adotar um cachorro amigável com crianças | Adicionar um novo membro à minha família sem complicações      |
| João Pereira - Voluntário de abrigo        | Uma interface web fácil de usar para cadastrar e gerenciar perfis de animais | Mais pessoas poderem vê-los e se candidatar à adoção          |
| Ana Costa - Desenvolvedora que ama gatos   | Um aplicativo móvel intuitivo que permita salvar gatos adultos favoritos e acompanhar o status da adoção | Adotar um companheiro de forma prática e rápida               |
| Carlos Mendes - Filho preocupado           | Utilizar a versão web da plataforma para encontrar um pet adequado para minha mãe idosa | Garantir que o animal seja fácil de cuidar e ofereça companhia |


## Requisitos

Os requisitos de um sistema de adoção de pets foram definidos para garantir que o sistema atenda tanto às necessidades dos usuários finais quanto às expectativas de performance, escalabilidade e usabilidade. Esses requisitos foram divididos em funcionais e não funcionais. Requisitos funcionais descrevem as funcionalidades essenciais que o sistema deve oferecer, como cadastro de usuários e busca por pets. Já os requisitos não funcionais garantem aspectos de qualidade do sistema, como desempenho, disponibilidade e compatibilidade com diferentes plataformas.

Para organizar e priorizar os requisitos, foi utilizada a técnica de priorização por nível de importância, dividindo-os em três categorias:
- **Alta**: Funcionalidades essenciais e críticas para o funcionamento e sucesso do sistema.
- **Média**: Funcionalidades importantes, mas que podem ser implementadas em uma fase posterior, sem prejudicar a usabilidade inicial.
- **Baixa**: Funcionalidades desejáveis, mas que não são prioritárias para o funcionamento básico do sistema.

A seguir, os requisitos foram organizados em tabelas, com suas respectivas prioridades.

### Requisitos Funcionais

| ID    | Descrição do Requisito                                                                 | Prioridade |
|----------|----------------------------------------------------------------------------------------|------------|
| RF-01 | O sistema deve permitir que novos usuários se cadastrem fornecendo informações pessoais, como nome, e-mail, e senha, para criar uma conta e acessar todas as funcionalidades disponíveis | ALTA       |
| RF-02 | O sistema deve permitir que usuários cadastrados façam login utilizando seu e-mail e senha. | ALTA       |
| RF-03 | O sistema deve permitir que usuários cadastrados editem suas informações pessoais, como nome, e-mail e senha, e excluam sua conta se desejarem | MÉDIA      |
| RF-04 | O sistema deve permitir que os usuários cadastrados anunciem pets disponíveis para adoção, fornecendo informações detalhadas sobre o animal, como tipo, raça, idade, localização, temperamento, e histórico de saúde | ALTA      |
| RF-05 | O sistema deve permitir que os usuários cadastrados editem e excluam os anúncios de pets que eles publicaram | MÉDIA      |
| RF-06 | Para facilitar a busca por um pet específico, o sistema deve oferecer filtros de pesquisa que permitam os usuários refinar os resultados com base em diferentes critérios, como tipo de animal (cachorro, gato, etc.), idade, raça e localização | ALTA      |
| RF-07 | Cada pet deve ter uma página de detalhes que funcione como um perfil, onde são apresentadas informações mais completas sobre o animal, como descrição, histórico de saúde, temperamento, e qualquer outro detalhe relevante que ajude os usuários a tomar uma decisão informada sobre a adoção | ALTA      |
| RF-08 | O sistema deve permitir que usuários cadastrados entrem em contato com quem fez o anúncio de um pet, por meio de mensagens diretas ou outro meio de comunicação, para solicitar mais informações ou manifestar interesse | MÉDIA      |
| RF-09 | O sistema deve permitir que os usuários visualizem uma lista de todos os pets cadastrados, com a possibilidade de paginar os resultados | BAIXA      |

### Requisitos Não Funcionais

| ID     | Descrição do Requisito                                                                          | Prioridade |
|------------|-------------------------------------------------------------------------------------------------|------------|
| RNF-01 | A interface de usuário deve ser intuitiva e fácil de usar, com uma curva de aprendizado mínima   | ALTA       |
| RNF-02 | O sistema deve ser escalável, permitindo fácil adição de novos recursos ou suporte a um número crescente de usuários e pets sem necessidade de reestruturação significativa | MÉDIA      |
| RNF-03 | O sistema deve ter uma disponibilidade de 99,9%, garantindo que esteja acessível a qualquer momento, exceto durante manutenções programadas | ALTA       |
| RNF-04 | O sistema deve ser compatível com os principais navegadores da web (Chrome, Firefox, Safari, Edge) e ser responsivo, adaptando-se a diferentes tamanhos de tela, como desktops, tablets e smartphones | ALTA       |
| RNF-05 | O sistema deve facilitar correções de bugs, adições de novas funcionalidades e adaptações a mudanças nos requisitos | MÉDIA      |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de caso de uso apresentado descreve as principais funcionalidades do sistema **AdoPet**, que facilita o processo de adoção de animais de estimação. O sistema permite tanto o cadastro de novos pets por parte de voluntários e abrigos quanto a pesquisa e busca de animais disponíveis para adoção pelos usuários interessados.

![Screenshot 2024-09-06 214645](https://github.com/user-attachments/assets/39bda4b6-7e64-4fc6-b358-8f1f9ab23657)

### Atores Envolvidos

No sistema AdoPet, identificam-se dois principais atores:
- **Usuário cadastrando novos pets**: Geralmente um voluntário ou administrador de um abrigo, responsável por cadastrar e gerenciar o perfil dos animais no sistema.
- **Usuário em busca de um pet para adoção**: Este ator representa o público geral que acessa a plataforma para encontrar um animal para adoção.

### Principais Casos de Uso

1. **Login**:
   - O primeiro passo para utilizar o sistema é o processo de login. O usuário fornece suas credenciais (nome de usuário e senha) para acessar a plataforma.
   - O caso de uso **Verifica Login** é incluído como parte desse processo, validando as credenciais fornecidas.
   - Caso as credenciais estejam incorretas, o sistema exibe uma mensagem de erro através do caso de uso **Exibir alerta de login ou senha incorretos**.

2. **Realizar cadastro**:
   - Caso o usuário não possua uma conta, ele tem a opção de se cadastrar na plataforma, fornecendo informações pessoais, como nome, e-mail e senha, para criar um perfil e acessar as funcionalidades disponíveis.

3. **Cadastrar animais para adoção**:
   - Este caso de uso é destinado aos usuários responsáveis por adicionar novos pets ao sistema. Aqui, eles podem preencher informações detalhadas sobre os animais, como nome, idade, raça, temperamento e outras informações relevantes para a adoção.

4. **Pesquisar e filtrar animais**:
   - O usuário que deseja adotar um animal pode utilizar esta funcionalidade para buscar animais disponíveis na plataforma. O sistema permite o uso de filtros, como tipo de animal, idade, raça e localização, facilitando a busca por um pet que atenda às preferências do usuário.

### Relacionamentos

- **Include (<<include>>)**: O relacionamento de inclusão é utilizado para mostrar que uma ação ou processo depende de outro para ser concluído. No caso do login, o processo de verificação das credenciais é parte integrante da operação, sendo obrigatoriamente realizado para garantir a segurança do sistema. Se as informações forem incorretas, o sistema automaticamente exibirá uma mensagem de alerta.

Esse diagrama ajuda a visualizar a interação dos diferentes atores com o sistema e como as funcionalidades estão interligadas, garantindo uma melhor experiência para quem busca adotar um pet e também para quem gerencia o cadastro dos animais.


# Gerenciamento de Projeto

O gerenciamento de projeto é uma metodologia essencial que ajuda a planejar, organizar e controlar atividades para alcançar objetivos definidos dentro de prazos e orçamentos específicos. Em um projeto acadêmico, essa prática permite uma melhor divisão de tarefas, o acompanhamento de progresso e o cumprimento de metas de forma eficiente. Ao aplicar o gerenciamento de projetos, os membros de uma equipe podem definir cronogramas, alocar responsabilidades e antecipar desafios, assegurando que todas as etapas do trabalho sejam concluídas com sucesso. Além disso, uma boa gestão facilita a comunicação e promove a colaboração eficaz entre os participantes.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Gerenciamento de tempo](https://github.com/user-attachments/assets/b3a23f0c-1afb-4b73-be88-7fbb0e7d39a9)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](https://github.com/user-attachments/assets/59d1f46a-ebc3-4813-ab78-b229e61b3fd5)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![image](https://github.com/user-attachments/assets/dec7f357-3520-49d2-812f-826b90305897)

