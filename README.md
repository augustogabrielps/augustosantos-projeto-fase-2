# Fase 2 – Aplicativo em React Native

## O que é este projeto

Este é o projeto principal da **Fase 2** da disciplina *Desenvolvimento de Sistemas Mobile* (PUCRS).

O projeto foi feito com **React Native** usando **Expo**. O app carrega dados da API pública **JSONPlaceholder** e de um JSON Server de apoio.

## O que o app faz

- Mostra a lista de usuários
- Permite filtrar / buscar usuários
- Entra nos álbuns de um usuário
- Entra nas fotos de um álbum
- Mostra detalhes de cada foto
- Navegação simples entre telas

## Tecnologias usadas

- React Native
- Expo
- TypeScript
- Axios
- React Navigation

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto (Expo):

```bash
npm start
```

Depois de iniciar, pressione `w` para abrir no navegador (web).

## Estrutura do projeto

```
src/
  screens/
  components/
  navigation/
  services/
```

## Observações para o professor

- O projeto segue o protótipo da Fase 1.
- Todos os dados vêm do **JSONPlaceholder** (e de um JSON Server de apoio para fotos estendidas).
- Todas as telas pedidas no enunciado da atividade foram implementadas: lista de usuários, álbuns, fotos e detalhe da foto.

