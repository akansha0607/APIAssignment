require('dotenv').config()



const mongoose =  require('mongoose')
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const swaggerDocs = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

// express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

//connect to db
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
    console.log('Connected to db & listening on port', process.env.PORT)
  })
 })
 .catch((error) => {
    console.log(error)
 })



