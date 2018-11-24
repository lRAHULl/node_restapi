const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('./public'))

app.use(morgan("combined"))

app.listen(3000, () => {
    console.log('Port started and running at 3000...')
})

app.get('/', (req, res) => {
    console.log('Root Route')
    res.send('Hello World at port 3000..........')
})

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Rahul@16roman',
        database: 'node_mysql'
    })
}

app.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const queryString = "SELECT * FROM users WHERE id = ?"
    const userId = req.params.id
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to Query: " + err)
            res.sendStatus(500)
            return
        }
        console.log('Fetched Successfully')

        const users = rows.map((row) => {
            return { firstName: row.first_name, lastName: row.last_name }
        })

        res.json(users)
    })

    // res.end()
})

app.get('/users', (req, res) => {
    console.log("Fetching users")

    const connection = getConnection()

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
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")

    console.log("First name: " + req.body.create_first_name)

    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if(err){
            console.log("Failed to query: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user...")
        res.send("Registration Successfull....")
    })
})