const express = require('express')
const mongoose = require("mongoose")
const router = require('./routes/router')

const app = express()
const port = "3001"

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        // Ajout de l'objet de configuration pour mongoose.connect: useNewUrlParser: true et useUnifiedTopology: true. 
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // Ces options sont souvent nécessaires pour éviter les avertissements dépréciés et garantir une connexion appropriée à MongoDB.
        console.log('Connected to the database')
    } catch (error) {
        console.error('Error connecting to the database:', error)
        process.exit(1)
    }
}

connectDB()

app.use(express.json());

app.use('/', router); 

app.listen(port, () => 
    console.log(`App running on port ${port}`)
)
