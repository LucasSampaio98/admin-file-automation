# Admin File Automation

Aplicação web para administração de arquivos de clientes. O painel permite autenticação, consulta de clientes e pastas, seleção de formatos e envio de arquivos para uma ou mais pastas.

## Requisitos

- Node.js e npm

## Configuração e execução

Na raiz deste projeto:

```bash
npm ci
npm start
```

O servidor de desenvolvimento do Angular fica disponível em `http://localhost:4200/`.

Configure `apiUrl` nos arquivos `src/environments/environment.ts` e `src/environments/environment.prod.ts` para apontar à URL base da API (sem barra final). Os valores estão vazios no repositório, então as chamadas HTTP não funcionarão até essa configuração ser feita.

## Funcionalidades do painel

- Login e armazenamento local do token JWT recebido da API.
- Listagem de clientes e consulta de pastas e formatos associados.
- Visualização de arquivos por pasta.
- Envio de arquivos para pastas selecionadas ou criação de pastas por formato, conforme os fluxos existentes na interface.

## Desenvolvimento

```bash
npm test
npm run build
```

`npm test` executa os testes unitários com Karma. `npm run build` gera a versão de produção em `dist/`. Para uma compilação de desenvolvimento, use `npm run build:dev`.
