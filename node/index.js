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

    connection.end();
});

function doGenerateHtmlTable(title, peoples) {
    let responseHtml = `
        <h1>${title}</h1>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 50%; margin-top: 20px;">
            <thead>
                <tr>
                    <th style="text-align: right;">#</th>
                    <th style="text-align: left;">Nome</th>
                </tr>
            </thead>
            <tbody>`;

    if (peoples.length > 0) {
        peoples.forEach((person, index) => {
            responseHtml += `<tr>
                                <td style="text-align: right;">${index + 1}</td>
                                <td style="text-align: left;">${person.name}</td>
                             </tr>`;
        });
    } else {
        responseHtml += `<tr>
                            <td colspan="2" style="text-align: center;">Nenhuma pessoa encontrada.</td>
                         </tr>`;
    }

    responseHtml += `
            </tbody>
        </table>
    `;

    return responseHtml;
}


app.get('/', async (req, res) => {
    let connection;
    try {
        connection = mysql.createConnection(config).promise();

        const insertSql = `INSERT INTO people(name) VALUES('Ricardo')`;
        await connection.query(insertSql);

        const query = `SELECT * FROM people ORDER BY name`;
        const [peoples] = await connection.query(query);

        const htmlContent = doGenerateHtmlTable('Full Cycle Rocks!', peoples);

        res.send(htmlContent);
    } catch (err) {
        res.status(500).send('Erro ao buscar pessoas');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
