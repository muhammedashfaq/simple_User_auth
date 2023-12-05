const mongoose = require('mongoose')

const dbConnect = async () => {
    try {

        const mongo = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully on', mongo.connection.name)

    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}
module.exports = dbConnect