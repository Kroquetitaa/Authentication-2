const express = require('express');
const { connectDB } = require('./helpers/db');
const PORT = process.env.PORT || 8000;
const userRoutes = require('./api/user/user.routes');
connectDB();

const app = express();

app.use(cors({
    origin:(_origin, callback) => {
        callback(null, true);
    },
    credentials: true
}))

app.listen(PORT, ()=> {
    console.log(`Server on Air in: ${PORT}`)
})