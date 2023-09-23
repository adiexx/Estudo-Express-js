const mysql = require('mysql');
//pacote mysql

let connection;
//variavel de conexao

try
{
connection = mysql.createConnection({
host: 'localhost', user: 'root', database: 'escola'
});
//criando conexao com o banco de dados
}

catch(error)
{
    error.stack=""; // limpar terminal
    console.error(error.message);
//caso tenha algum erro na conexao, ele sera exibido no terminal
}
