const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan("combined"))

app.listen(3000, () =>  {
    console.log('Port started and running at 3000...')
})

app.get('/', (req, res) => {
    console.log('Root Route')
    res.send('Hello World at port 3000..........')
})

app.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Rahul@16roman',
        database: 'node_mysql'
    })

    const queryString = "SELECT * FROM users WHERE id = ?"
    const userId = req.params.id
    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err) {
            console.log("Failed to Query: " + err)
            res.sendStatus(500)
            return
        }
        console.log('Fetched Successfully')

        const users = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name}
        })

        res.json(users)
    })

    // res.end()
})

app.get('/users', (req, res) => {
    console.log("Fetching users")

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Rahul@16roman',
        database: 'node_mysql'
    })

    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to Query: " + err)
            res.sendStatus(500)
            return
        }
        console.log('Fetched Successfully')


        res.json(rows)
})
})

app.post('/register', (req, res) => {
    console.log('Registering the new user..')
    res.send('Creating...')
})