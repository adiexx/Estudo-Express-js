const mysql = require('mysql2');
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
    
        try{

            const validarCpf = require('validar-cpf');
            if (validarCpf(CPF) === false){
                console.clear();
                console.log('')
                throw new Error('CPF Inválido')
              }
            
            if (titulacao == "Doutor" || titulacao == "Mestre" || titulacao == "Especialista" || titulacao == "Graduado"){
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
                })
             }
            
            else{
                console.clear();
                console.log('')
                throw new Error('titulacao Inválido')
            }

            
    }

        catch(error){
            console.clear();
            console.log(error.message);
            callback(err, null );
        }
       
    };
    

function apagar(ID, callback)
{
    connection.query(`DELETE FROM professor WHERE ID = ?`,
    [ID],
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

function atualizar(ID, Nome, callback)
{
  connection.query("UPDATE aluno SET nome=?"+
  " where aluno.id=?",
  [Nome,ID],
   function(err,results)
   {
    if (err) {
      console.error('Erro ao atualizar aluno:', err);
      callback(err, null);
    } else {
      console.log('Resultado da operação de atualizar aluno:', results);
      callback(null, results);
    } 
  } 
  );
}

function ListarTodos(callback)
{
  connection.query(
    "SELECT * FROM professor",
    function(err,results)
    {
      if (err) {
        callback(err, null); // Chama o callback com erro
       } else {
        callback(null, results);
      } // Chama o callback com o resultado
    }
    );  
}

module.exports = { inserir, apagar, atualizar, ListarTodos };