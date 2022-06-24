import app from './app.js'
import {PORT} from './config/env.config.js'
import {connectDB} from './db.js'

connectDB()

app.listen(PORT,()=>{
    console.log('server on port',PORT)
})