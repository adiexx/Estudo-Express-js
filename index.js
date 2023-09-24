const express = require('express');
//instalar express: npm install express
const app = express();
const port = 3000
const professor = require('./DAO/professor');
//instalar o mysql2 
//na pasta principal: npm install mysql2
const bodyParser = require('body-parser');
//instalar na pasta raiz npm install body-parser
app.use(bodyParser.urlencoded({extended: false})) ;
app.use(bodyParser.json()) ;

app.get('/', (req, res) => {
 
  res.send(`
  <h1>Página principal</h1>
  <h3>Cadastro Professor</h3>
  <ul>
  <li><a href="/inserir">Inserir</a></li>
  <li><a href="/apagar">Apagar</a></li>
  <li><a href="/listar">Listar</a></li>
  <li><a href="/atualizar">Atualizar</a></li>

  </ul>
  `);
})

app.get('/sucesso', (req, res) => {
  res.send(`<h1 style="color:green;"> Operação executada com sucesso ;)</h1>
  <a href="/">Voltar</a>`)
})

app.get('/erro', (req, res) => {
  res.send(`<h1 style="color:red;"> Ops...aconteceu algum problema</h1>
  <a href="/">Voltar</a>`)
  
})

app.get('/inserir', (req, res) => {
    res.send(`
    <ul>
    <li><a href="/">Principal</a></li>
    <li><a href="/apagar">Apagar</a></li>
    <li><a href="/atualizar">Atualizar</a></li>
    <li><a href="/listar">Listar</a></li>
    </ul>
    <h1>Inserir Professor</h1>
    <form action="/inserirprof" method="post"> 
      <label>CPF: </label>
      <input type="text" name="cpf" required><br><br>
      <label>Nome: </label>
      <input type="text" name="nome" required><br><br>
      <label>Titulação: </label>
      <input type="text" name="titulacao" required><br><br>
      <input type="submit" value="Inserir">
    </form>    
    `);
  })

app.post('/inserirprof', (req, res) => {
   
  const nome = req.body.nome;
  const CPF = req.body.cpf;
  const titulacao = req.body.titulacao;
 
  professor.inserir(CPF, nome, titulacao, (error, rows) => {
    if (error) {
        console.error(error);
        res.redirect('/erro');
    } else {
        if (rows > 0) {
            res.redirect('/listar');
        } else {
            res.redirect('/erro');
        }
    }
 });
});

app.get('/atualizar', (req, res) => {
    professor.ListarTodos((err, professor) => {
      if (err) {
        console.error(err);
        res.redirect('/erro');
      } else {
        res.send(`
          <ul>
            <li><a href="/">Principal</a></li>
            <li><a href="/inserir">Inserir</a></li>
            <li><a href="/apagar">Apagar</a></li>
            <li><a href="/listar">Listar</a></li>
          </ul>
          <h1>Atualizar Professor</h1>
          <form action="/atualizarprofessor" method="post">
            <label>Escolha um Professor:</label>
            <select name="id" required>
              ${professor.map((professor) => `<option value="${professor.ID}">${professor.Nome}</option>`).join('')}
            </select><br><br>
            <label>Novo Nome:</label>
            <input type="text" name="nome" required><br><br>
            <b>Titulações:</b> Doutor, Mestre, Especialista e Graduado<br>
            <label>Nova Titulação:</label>
            <input type="text" name="titulacao"><br><br>
            <input type="submit" value="Atualizar">
          </form>
        `);
      }
    });
  });

app.post('/atualizarprofessor', (req, res) => {
   
  const nome = req.body.nome;
  const ID = req.body.id;
  const titulacao = req.body.titulacao;
 
  professor.atualizar(ID, nome, titulacao, (error, rows) => {
    if (error) {
        console.error(error);
        res.redirect('/erro');
    } else {
        if (rows > 0) {
            res.redirect('/listar');
        } else {
            res.redirect('/sucesso');
        }
    }
 });
});

  app.get('/listar', (req, res) => {
    professor.ListarTodos((error,results)=>
    {  console.log(results);
      
      res.send(`
        <h1>Menu</h1>
         <ul>
           <li><a href="/">Principal</a></li>
           <li><a href="/inserir">Adicionar Professor</a></li>
           <li><a href="/apagar">Apagar Professor</a></li>
         </ul>
         <br>
          <table>
            <tr>
              <th>ID</th>
              <th>CPF</th>
              <th>Nome</th>
              <th>Titulação</th>
            </tr>
            ${results.map(professor => `<tr><td>${professor.ID}</td><td>${professor.CPF}</td><td>${professor.Nome}</td><td>${professor.titulacao}</td></tr>`).join('')}
          </table>
        `);
    });
  });


  // Rota para a página de apagar aluno
app.get('/apagar', (req, res) => {
  res.send(`
    <ul>
      <li><a href="/">Principal</a></li>
      <li><a href="/inserir">Inserir</a></li>
      <li><a href="/listar">Listar</a></li>
    </ul>
    <h1>Apagar professor</h1>
    <form action="/apagarprofessor" method="post">
      <label>ID do Professor:</label>
      <input type="number" name="id" required><br><br>
      <input type="submit" value="Apagar">
    </form>
  `);
});

// Rota para a função de apagar o aluno
app.post('/apagarprofessor', (req, res) => {
  const ID = req.body.id;
  
  professor.apagar(ID, (error, result) => {
    if (error) {
      console.error(error);
      res.redirect('/erro');
    } else {
      if (result.affectedRows > 0) {
        res.redirect('/sucesso');
      } else {
        res.redirect('/erro');
      }
    }
  });
});
 

app.listen('3000', () => {
  console.log('Server started on port 3000');
});

 