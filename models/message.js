const connection = require('../config/db.js')
let moment = require('moment')

class Message {


    constructor (row){
         this.row = row
    }

    get content () {
        return this.row.content
    }

    get create_at () {
        return moment(this.row.create_at)
    }

    static create (content, cb) {
        connection.query('INSERT INTO message SET content = ?, create_at= ?', [content, new Date()], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static all (cb){
        connection.query('SELECT * FROM message', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Message(row)))
        })
    }
} 

module.exports = Message