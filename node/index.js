const express = require('express');
const app = express();

const port = 4200;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql2');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Ricardo')`
connection.query(sql)
connection.end()

// Rota padrão para testar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1>');
});

// Inicia o servidor na porta 4200
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
