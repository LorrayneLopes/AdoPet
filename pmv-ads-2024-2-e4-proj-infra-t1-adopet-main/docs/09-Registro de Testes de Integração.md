# Testes de Integração no Backend


## Objetivo
Os testes de integração foram realizados para garantir o correto funcionamento entre o Backend do projeto AdoPet e o microsserviço responsável pela manipulação dos dados dos pets. Esses testes validam a interação e a troca de informações entre os sistemas, assegurando que as funcionalidades principais operem conforme esperado.

## Framework Utilizado
Os testes foram implementados utilizando o **NUnit**, um framework robusto e amplamente utilizado em projetos .NET para criação de testes unitários e de integração.

## Casos de Teste Realizados
Um total de **7 testes de integração** foi conduzido, cobrindo as principais operações relacionadas ao gerenciamento de pets:

### **GetPetsByFilter_ShouldReturnAListOfDogs_WhenSpecieIsSpecified**  
   Verifica se a aplicação retorna corretamente uma lista de cães quando o filtro de espécie é especificado.

### **GetAllPets_ShouldReturnAListOfPets_WhenValidTokenProvided**  
   Garante que todos os pets sejam retornados ao fornecer um token válido.

### **GetPetById_ShouldReturnASinglePet_WhenValidTokenAndIdProvided**  
   Testa se a busca por um pet específico retorna o registro correto ao fornecer um token e um ID válidos.

### **GetPetsByUserEmail_ShouldReturnAListOfPets_WhenValidTokenAndEmailProvided**  
   Valida se os pets associados a um usuário específico são retornados corretamente com base no e-mail e um token válidos.

### **CreatePet_ShouldReturnPet_WhenValidTokenAndPetProvided**  
   Testa a criação de um novo pet, verificando se os dados enviados resultam na criação bem-sucedida de um registro.

### **EditPet_ShouldEditAPet_WhenValidTokenAndPetProvided**  
   Verifica se é possível editar os dados de um pet com um token e informações válidas.

### **DeletePet_ShouldDeleteAPet_WhenValidTokenAndPetIdProvided**  
   Assegura que um pet possa ser excluído corretamente ao fornecer um token e um ID válidos.

## Resultados
Todos os testes foram executados com sucesso, confirmando a integração estável entre os sistemas e o correto comportamento das funcionalidades implementadas.

## Evidências dos Testes

![WhatsApp Image 2024-11-18 at 20 51 55](https://github.com/user-attachments/assets/002f9e4d-9718-4cfb-9f8b-9ffe67b6adad)

![WhatsApp Image 2024-11-18 at 20 51 57](https://github.com/user-attachments/assets/3bea350f-4e9b-4b34-a1a4-bee5eb12aa43)

![WhatsApp Image 2024-11-18 at 20 52 00](https://github.com/user-attachments/assets/d1f31b63-170b-4670-b42b-737a030c6b9a)

![WhatsApp Image 2024-11-18 at 20 52 03](https://github.com/user-attachments/assets/abc4423b-1d5f-44b7-ab17-e69c3a9053e0)

![WhatsApp Image 2024-11-18 at 20 52 05](https://github.com/user-attachments/assets/f762189e-3ca1-440f-9428-bba62c0c4518)

![WhatsApp Image 2024-11-18 at 20 52 10](https://github.com/user-attachments/assets/23611d4f-a0eb-4633-9915-1f6aa4a3eb21)

![WhatsApp Image 2024-11-18 at 20 52 13](https://github.com/user-attachments/assets/6bdc040f-bb65-47f1-b044-ceefeae26c16)

---

Com esses testes de integração, o projeto AdoPet avança na garantia de qualidade do sistema, promovendo uma experiência confiável e segura para seus usuários.

