const server = require('express')()
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config()

var connection = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB}`
})
connection.connect()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.get('/', (req,res) => {
  res.send('Server')
})

server.get('/setup', (req,res) => {
  connection.query('CREATE TABLE Users (id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(255), last_name VARCHAR(255))', (err, result) => {
    if (err) {
      console.log(err);
      res.send('Setup Gagal')
    } else {
      connection.query(`INSERT INTO Users (first_name, last_name) VALUES ('Budi', 'Akbar')`, (err, result) => {
        if (err) {
          console.log(err);
          res.send('Setup Gagal')
        } else {
          res.send('Setup Sukses')
        }
      })
    }
  })
})

server.get('/listUser', (req,res) => {
  connection.query('SELECT * FROM Users', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        response: 'success',
        result: result
      })
    }
  })
})

server.post('/listUser', (req,res) => {
  connection.query(`INSERT INTO Users(first_name, last_name) VALUES('${req.body.first_name}', '${req.body.last_name}')`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        response: 'success',
        result: result
      })
    }
  })
})

server.put('/listUser/:id', (req,res) => {
  connection.query(`UPDATE Users SET first_name='${req.body.first_name}', last_name='${req.body.last_name}' WHERE id='${req.params.id}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        response: 'success',
        result: result
      })
    }
  })
})

server.delete('/listUser/:id', (req,res) => {
  connection.query(`DELETE FROM Users WHERE id='${req.params.id}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        response: 'success',
        result: result
      })
    }
  })
})

server.listen(process.env.PORT || 3000, () => {
  console.log('Listen from port 3000')
})
