# To-do List em React Native, Expo e geração de PWA

**Desafio**

Desenvolver um sistema de To-do List com banco relacional, onde o usuário tenha as seguintes característica:

- Não precisa ter cadastro no sistema
- Tem acesso a lista de tarefas pendentes
- Tem acesso a lista de tarefas já concluídas.
- Pode incluir uma nova tarefa informando os dados:
  - Nome do responsável
  - Email do responsável (deve ser validado conforme descrito abaixo)
  - Descrição da tarefa
- Pode alterar as tarefas de “pendente” para “concluída”.
- Pode alterar as tarefa de “concluída” para “pendente”, este procedimento só pode ser realizado duas vezes por tarefa, e precisa informar a senha do supervisor (a senha é fixa e está na variável de ambiente SUPERVISOR_PASSWORD).
- Pode incluir 3 tarefas randômicas através da opção “**Estou sem tarefas**”

**Validação do email**
Deverá ser utilizada a API do MailboxLayer (https://mailboxlayer.com/documentation - API KEY será definida na variável de ambiente MAILBOXLAYER_KEY). Será considerado um e-mail correto aquele que tem formato válido e que tenha os registros MX de acordo também. Se o e-mail for inválido deverá sugerir ao usuário o endereço indicado pela API (atributo did_you_mean).

**Opção "Estou sem tarefas"**
Incluir 3 tarefas automaticamente ao usuário de nome “Eu”, email “[eu@me.com](mailto:eu@me.com)”. As descrição das tarefas devem conter fatos randômicos sobre Cachorros, consultados na API (https://alexwohlbruck.github.io/cat-facts/).

## Backend em NestJS com PostgreSQL

O aplicativo espera foi desenvolvido para consumir [**To-Do List Server**](https://github.com/allistertr/to-do-list-challenge-server/), na seguinte url [http://localhost:3000/](http://localhost:3000/).

## Instalação

Instale as dependências do projeto através do comando:

```bash
$ npm install
```

## Executando o projeto

:iphone: Utilizaremos um aplicativo chamado [Expo Go](https://expo.io/tools) disponivel nas lojas da Apple e na Play Store. Este aplicativo permite emular o código diretamente em múltiplos dispositivos simultaneamente, seja através da rede lan, ou via tunelamento na rede de internet.

- [Vídeo explicativo sobre o Expo](https://www.youtube.com/watch?v=uxZe6TGsVJk)
- [Instalar Expo Go (disponível na Store)](https://expo.io/tools)

Você pode inicializar o projeto através dos seguintes comandos:

```bash
# Executando versão Web via Expo
$ npm run web

# Executando via Expo
$ npm run start

# Executando no Android
$ npm run android

# Executando no IOS
$ npm run ios
```
