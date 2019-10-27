const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/values", { useNewUrlParser: true });

const Value = require("./models/Value");

const connect = mongoose.connection;

connect.on("error", () => {
  console.log("Erro na conexão!");
});

connect.once("open", () => {
  console.log("Conectado!");
});

getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

handleDocuments = async () => {
  console.time("Tempo ao inserir 1 milhão de documentos");

  for (let i = 0; i < 10; i++) {
    var values = [];

    for (let j = 0; j < 100000; j++) {
      var value = {
        val1: getRandom(0, 100),
        val2: getRandom(0, 100)
      };

      values.push(value);
    }

    await Value.insertMany(values);
  }

  console.timeEnd("Tempo ao inserir 1 milhão de documentos");
};

findValues = async () => {
  console.time("Tempo ao consultar valores de val1 entre 0 e 10");

  const value = await Value.find({ val1: { $gte: 0, $lte: 10 } });

  console.timeEnd("Tempo ao consultar valores de val1 entre 0 e 10");

  //console.log(value)
};

findValuesWithProjection = async () => {
  console.time("Tempo ao consultar valores de val1 entre 0 e 10");

  const value = await Value.find(
    { val1: { $gte: 0, $lte: 10 } },
    { _id: 0, val1: 1 }
  );

  console.timeEnd("Tempo ao consultar valores de val1 entre 0 e 10");

  //console.log(value);
};

// Gere e insira pelo menos 1 milhão de documentos (meça o tempo de inserção total):
// handleDocuments();

// Realize uma consulta por valores em val1 entre 0 e 10 e meça o tempo:
// findValues();

/* 
  Crie um indice pelo campo val1:
  Para criar um índice, acesse o bash do MongoDB em sua máquina e execute o seguinte comando: db.values.createIndex({ val1: 1 })
*/

// Repita a consulta anterior medindo o tempo. O que ocorre?
// findValues();

// Agora repita a consulta anterior retornando apenas o campo val1 (utilize projeção para remover o _id e val2). O que ocorre?
// findValuesWithProjection();

// Insira mais 1 milhão de registros e meça o tempo de inserção comparando com o valor obtido antes do índice:
// handleDocuments();
