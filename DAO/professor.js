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

//criando funções para serem excutadas no banco de dados

function inserir(CPF, nome, titulacao, callback)
{
    connection.query(`INSERT INTO professor (CPF, nome, titulacao) VALUES (?, ?, ?)`,
    [CPF, nome, titulacao],
    function(err, results){
        if(err)
        {
            callback(err, null );
            // Chama o callback com erro
        }
        else
        {
            callback(null,results.affectedRows);
            // Chama o callback com o número de linhas afetadas
        }
    }
    );
}