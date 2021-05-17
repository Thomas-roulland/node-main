const express = require('express')
const app = express()
const port = 8080;
let bodyParser = require('body-parser')
let session = require('express-session')
const { localsName } = require('ejs')




//Moteur de template
app.set('view engine', 'ejs')

//Middleware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'azertyuiop',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(require('./middlewares/flash.js'))

//Routes
app.get('/', (request, response) =>{
    console.log(request.session)
    response.render('pages/index')
  })

  app.get('/test.ejs', (request, response) =>{
    console.log(request.session)
    response.render('pages/test')
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/test.ejs', (request, response) => {

    if(request.body.messsage === undefined || request.body.messsage === ''){
        request.flash('error', "vous n'avez pas posté de message")
        response.redirect('/test.ejs')
    }else {
        let Message = require('./models/message')
        Message.create(request.body.message, function (){
            request.flash('succes', "Merci")
        })
    }
})