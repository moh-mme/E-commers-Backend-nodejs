require('dotenv').config()
const express = require('express')
const app = express()
const {userRouter} = require('./router/Users.router')
const {prodectsRouter} = require('./router/Prodects.router')
const {categoriesRouter} = require('./router/Categories.router')
const {orderRouter} = require('./router/orders.router')
const { loginRouter } = require('./router/login.router')
const { registerRouter } = require('./router/register.router')
const {connectDB} = require('./data/connectionDB')

app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/prodects',prodectsRouter)
app.use('/api/categories',categoriesRouter)
app.use('/api/order',orderRouter)
app.use('/api/login',loginRouter)
app.use('/api/register',registerRouter)

console.log(connectDB());


app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`);
})