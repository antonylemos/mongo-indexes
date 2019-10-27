# Mongo Indexes

Aplicação desenvolvida com o fim de testar a manipulação de dados no MongoDB em determinadas situações. 

## Instalação

Use o [yarn](https://yarnpkg.com/) para iniciar a instalação.

```bash
git clone 
cd api-music-mongo
yarn install
```

ou, caso deseje utilizar o npm

```bash
git clone 
cd api-music-mongo
npm install
```

## Iniciar

Para executar:

```bash
yarn dev
```

ou, caso esteja usando o npm

```bash
npm dev
```

## Visão geral

Os testes propostos foram divididos em momentos sem e com a aplicação dos índices.

### Testes

1. Gere e insira pelo menos 1 milhão de documentos (meça o tempo de inserção total):
   ```
   handleDocuments();
   ```
2. Realize uma consulta por valores em val1 entre 0 e 10 e meça o tempo:
   ```
   findValues();
   ```
3. Crie um indice pelo campo val1:
   ```bash
   db.values.createIndex({ val1: 1 });
   ```
4. Repita a consulta anterior medindo o tempo. O que ocorre?
   ```
   findValues();
   ```
5. Agora repita a consulta anterior retornando apenas o campo val1 (utilize projeção para remover o _id e val2). O que ocorre?
   ```
   findValuesWithProjection();
   ```
6. Insira mais 1 milhão de registros e meça o tempo de inserção comparando com o valor obtido antes do índice:
   ```
   handleDocuments();
   ```

#### Resultados

Os valores obtidos podem variar de acordo com as configurações da máquina usada.

1. 125899.834ms
2. 4834.625ms
3. OK!
4. 4445.462ms
5. 2928.244ms
6. 173306.037ms