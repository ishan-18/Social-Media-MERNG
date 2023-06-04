const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)

    mongoose.connection.on('connected', () => {
        console.log(`Database connected!`)
    })

    mongoose.connection.on('error', e => {
        console.log(`Error => ${e.stack.message}`)
    })
}

module.exports = connectDB