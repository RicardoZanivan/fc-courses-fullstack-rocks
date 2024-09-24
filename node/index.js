const mysql = require('mysql2');
const express = require('express');
const app = express();

const port = 4200;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const connection = mysql.createConnection(config);

const createTableSql = `
    CREATE TABLE IF NOT EXISTS people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );
`;

connection.query(createTableSql, (err, result) => {
    if (err) {
        console.error('Erro ao criar a tabela:', err);
        return;
    }

    const insertSql = `INSERT INTO people(name) VALUES('Ricardo')`;
    connection.query(insertSql, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return;
        }
        console.log('Registro inserido com sucesso!');
    });

    connection.end();
});

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1>');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
