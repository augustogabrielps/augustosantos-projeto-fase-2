# Fase 2 – PhotosScreen em Flutter

## O que é este projeto

O app principal desta atividade foi feito em **React Native**. Como parte da Fase 2, foi pedido demonstrar conhecimento em uma segunda tecnologia móvel — por isso criei uma tela em **Flutter**.

Esta pasta contém apenas a tela `PhotosScreen` feita em Flutter. Ela usa dados mock (dados locais), isso é permitido pelo enunciado da disciplina.

## O que esta tela faz

- Mostra uma lista / grade de fotos (mock)
- Ao tocar em uma foto, abre um bottom sheet com mais detalhes
- Os dados usados são mock e estão salvos localmente no projeto

## Tecnologias usadas

- Flutter
- Dart
- Componentes Material (Material UI)

## Como rodar (instruções simples)

1. Instale dependências:

```bash
flutter pub get
```

2. Rode no servidor web (exemplo):

```bash
flutter run -d web-server
```

Observação: no Linux o Chrome pode não abrir automaticamente; se isso acontecer, copie a URL exibida pelo comando e cole no navegador.

## Estrutura do projeto (simples)

```
lib/
  main.dart
  photos_screen.dart
  photos_mock.dart
```

## Observações

- O trabalho principal foi desenvolvido em React Native (conforme pedido na disciplina).
- A tela em Flutter foi criada apenas para mostrar conhecimento de outra tecnologia, conforme exigido.
- A lista de fotos usa dados mock armazenados localmente no arquivo `photos_mock.dart`.
- A interface segue o protótipo da Fase 1 na proposta da disciplina.

---

