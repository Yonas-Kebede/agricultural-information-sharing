

import dotev from 'dotenv'
import mongoose from 'mongoose'
dotev.config()

export const CONNECTDB = async() => {
    try {
        const url = process.env.MONGO_URI
        const conn  = await mongoose.connect(url)
        console.log('Mongodb Connected !!!')
    } catch (error) {
        
        console.log(error)
        process.exit(1)
    }
}

export default CONNECTDB;

