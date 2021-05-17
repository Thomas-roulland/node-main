const connection = require('../config/db.js')
let connction = require ('../config/db.js')

class Message {

    static create (content, cb) {
        connection.query('INSERT INTO message SET content = ?, created_ate= ?', [content, new Date()], (err, resul) => {
            if (err) throw err
            cb(result)
        })
    }
}